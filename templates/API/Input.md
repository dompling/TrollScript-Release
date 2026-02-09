# Input 输入模拟

Input 模块提供了 HID (Human Interface Device) 输入模拟功能，可以模拟触摸手势、键盘输入和物理按键。基于 IOKit 私有 API 实现，需要 TrollStore 权限。

> **守护进程支持**: 完全支持。所有 API 均可在 Daemon 模式下使用。
>
> **权限要求**: `com.apple.private.hid.client.event-dispatch` 权限（TrollStore 签名自带）。

---

## 目录

- [快速开始](#快速开始)
- [API 参考](#api-参考)
  - [状态检查](#状态检查)
  - [触摸模拟](#触摸模拟)
  - [键盘输入](#键盘输入)
  - [物理按键](#物理按键)
- [按键名称速查表](#按键名称速查表)
- [完整示例](#完整示例)
- [最佳实践](#最佳实践)
- [注意事项](#注意事项)

---

## 快速开始

```javascript
// 检查是否可用
if (!input.isAvailable()) {
  console.error("HID 输入不可用");
  return;
}

// 获取屏幕尺寸
const screen = input.getScreenSize();
const cx = screen.width / 2;
const cy = screen.height / 2;

// 点击屏幕中心
input.tap(cx, cy);

// 从下往上滑动
input.swipe(cx, screen.height * 0.8, cx, screen.height * 0.2, 0.3);

// 输入文本
input.typeText("hello world");
```

---

## API 参考

### 状态检查

#### `input.isAvailable()`

检查 HID 输入模拟是否可用。**返回:** `boolean`

```javascript
if (input.isAvailable()) {
  console.log("HID 输入可用");
} else {
  console.log("HID 输入不可用，请检查权限");
}
```

> 首次调用时会初始化 IOHIDEventSystemClient。如果设备不支持或权限不足，返回 `false`。

#### `input.getScreenSize()`

获取当前屏幕尺寸和缩放比例。**返回:** `object`

```javascript
const screen = input.getScreenSize();
console.log(screen);
// { width: 393, height: 852, scale: 3 }  // iPhone 14 Pro
```

返回对象结构：

```javascript
{
  width: 393,    // 屏幕宽度（UIKit points）
  height: 852,   // 屏幕高度（UIKit points）
  scale: 3       // 缩放比例（Retina 倍数）
}
```

> 坐标系与 UIKit 一致：左上角为原点 (0, 0)，X 轴向右，Y 轴向下。

---

### 触摸模拟

所有触摸坐标使用 **UIKit points**（逻辑坐标），与屏幕显示一致。

#### `input.tap(x, y)`

在指定坐标处模拟单击。**返回:** `boolean`

```javascript
// 点击坐标 (200, 400)
input.tap(200, 400);

// 点击屏幕中心
const s = input.getScreenSize();
input.tap(s.width / 2, s.height / 2);
```

#### `input.doubleTap(x, y)`

在指定坐标处模拟双击。**返回:** `boolean`

```javascript
// 双击缩放
input.doubleTap(200, 400);
```

#### `input.longPress(x, y, duration)`

在指定坐标处模拟长按。**参数:**

| 参数 | 类型 | 说明 |
|------|------|------|
| `x` | number | X 坐标 |
| `y` | number | Y 坐标 |
| `duration` | number | 持续时间（秒），范围 0.1 ~ 30.0，默认 1.0 |

**返回:** `boolean`

```javascript
// 长按 1.5 秒弹出菜单
input.longPress(200, 400, 1.5);
```

> ⚠️ 此方法会阻塞脚本执行直到长按结束。

#### `input.swipe(fromX, fromY, toX, toY, duration?)`

从起点滑动到终点。**参数:**

| 参数 | 类型 | 说明 |
|------|------|------|
| `fromX` | number | 起点 X |
| `fromY` | number | 起点 Y |
| `toX` | number | 终点 X |
| `toY` | number | 终点 Y |
| `duration` | number? | 持续时间（秒），范围 0.05 ~ 10.0，默认 0.3 |

**返回:** `boolean`

```javascript
const s = input.getScreenSize();

// 向上滑动（下拉刷新反向）
input.swipe(s.width / 2, s.height * 0.7, s.width / 2, s.height * 0.3, 0.3);

// 向左滑动
input.swipe(s.width * 0.8, 400, s.width * 0.2, 400, 0.25);

// 快速滑动
input.swipe(200, 600, 200, 200, 0.1);
```

> 内部以 60fps（16ms 间隔）生成连续触摸点，确保手势流畅。

#### `input.drag(fromX, fromY, toX, toY, duration?)`

从起点拖拽到终点（先按住 100ms 再移动）。**参数:** 同 `swipe`。**返回:** `boolean`

```javascript
// 拖拽排序列表项
input.drag(200, 300, 200, 500, 0.5);
```

> `drag` 与 `swipe` 的区别：`drag` 在起点会先按住 100ms 再开始移动，模拟真实的拖拽操作。

---

### 键盘输入

#### `input.pressKey(keyName)`

模拟按下键盘按键（key down + key up）。**参数:** `keyName` (string) **返回:** `boolean | object`

```javascript
input.pressKey("return");   // 回车
input.pressKey("space");    // 空格
input.pressKey("delete");   // 删除
input.pressKey("a");        // 字母 a
input.pressKey("up");       // 方向上

// 未知按键返回错误
const result = input.pressKey("unknown");
// { error: "Unknown key: unknown" }
```

#### `input.typeText(text, delay?)`

模拟键盘逐字输入文本。**参数:**

| 参数 | 类型 | 说明 |
|------|------|------|
| `text` | string | 要输入的文本 |
| `delay` | number? | 每字符间隔（秒），默认 0.05，最小 0.01 |

**返回:** `boolean`

```javascript
// 正常速度输入
input.typeText("hello world");

// 快速输入
input.typeText("hello", 0.02);

// 慢速输入（模拟真人）
input.typeText("hello", 0.15);
```

> ⚠️ 仅支持 ASCII 字符（a-z, 0-9, 空格, 常见符号）。中文、Emoji 等非 ASCII 字符会被静默跳过。如需输入中文/Emoji，请使用 `pasteText()`。

#### `input.pasteText(text)`

通过剪贴板粘贴文本，**支持中文、Emoji 等所有 Unicode 字符**。**参数:**

| 参数 | 类型 | 说明 |
|------|------|------|
| `text` | string | 要粘贴的文本（支持任意 Unicode 字符） |

**返回:** `boolean`

```javascript
// 粘贴中文
input.pasteText("你好世界");

// 粘贴 Emoji
input.pasteText("Hello 🌍🎉");

// 粘贴混合文本
input.pasteText("用户名：张三 ID:12345");
```

> 原理：将文本写入系统剪贴板 → 模拟 Cmd+V 硬件键盘粘贴快捷键。
>
> ⚠️ 此方法会覆盖当前剪贴板内容。需要目标输入框处于焦点状态。

---

### 物理按键

#### `input.pressButton(buttonName)`

模拟按下物理设备按键。**参数:** `buttonName` (string) **返回:** `boolean | object`

```javascript
input.pressButton("volumeUp");     // 音量+
input.pressButton("volumeDown");   // 音量-
input.pressButton("mute");         // 静音
input.pressButton("power");        // 电源键
input.pressButton("play");         // 播放/暂停
```

#### `input.pressButtons(buttonNames)`

同时按下多个物理按键（组合键）。**参数:**

| 参数 | 类型 | 说明 |
|------|------|------|
| `buttonNames` | string[] | 按键名称数组 |

**返回:** `boolean | object`

```javascript
// 模拟截屏（电源键 + 音量上同时按下）
input.pressButtons(["power", "volumeUp"]);

// 也可以组合其他按键
input.pressButtons(["volumeUp", "volumeDown"]);
```

> 内部实现：按序发送所有 key down 事件 → 保持 150ms → 反序发送所有 key up 事件。

---

## 按键名称速查表

### 键盘按键

| keyName | 说明 | HID Usage |
|---------|------|-----------|
| `a` - `z` | 字母键 | 0x04 - 0x1D |
| `0` - `9` | 数字键 | 0x1E - 0x27 |
| `return` / `enter` | 回车键 | 0x28 |
| `escape` / `esc` | ESC 键 | 0x29 |
| `delete` / `backspace` | 删除键 | 0x2A |
| `tab` | Tab 键 | 0x2B |
| `space` | 空格键 | 0x2C |
| `minus` / `-` | 减号 | 0x2D |
| `equal` / `=` | 等号 | 0x2E |
| `up` | 方向上 | 0x52 |
| `down` | 方向下 | 0x51 |
| `left` | 方向左 | 0x50 |
| `right` | 方向右 | 0x4F |

### 媒体/物理按键

| buttonName | 说明 | HID Usage Page |
|------------|------|----------------|
| `volumeUp` | 音量+ | Consumer (0x0C) |
| `volumeDown` | 音量- | Consumer (0x0C) |
| `mute` | 静音 | Consumer (0x0C) |
| `play` / `playpause` | 播放/暂停 | Consumer (0x0C) |
| `next` | 下一曲 | Consumer (0x0C) |
| `previous` / `prev` | 上一曲 | Consumer (0x0C) |
| `power` / `lock` | 电源/锁屏 | Consumer (0x0C) |

---

## 完整示例

### 示例 1: 自动化 App 操作

```javascript
// 打开 Safari → 输入网址 → 访问
app.launch("com.apple.mobilesafari");
util.sleep(2000);

// 点击地址栏（大约位置）
const s = input.getScreenSize();
input.tap(s.width / 2, 50);
util.sleep(500);

// 输入网址
input.typeText("example.com", 0.03);
util.sleep(300);

// 按回车访问
input.pressKey("return");
```

### 示例 2: 滑动浏览内容

```javascript
const s = input.getScreenSize();
const cx = s.width / 2;

// 连续向上滑动 5 次
for (let i = 0; i < 5; i++) {
  input.swipe(cx, s.height * 0.7, cx, s.height * 0.3, 0.4);
  util.sleep(1000); // 等待加载
}
```

### 示例 3: 自动调节音量

```javascript
// 音量调到最低
for (let i = 0; i < 16; i++) {
  input.pressButton("volumeDown");
  util.sleep(100);
}

// 再调高 5 格
for (let i = 0; i < 5; i++) {
  input.pressButton("volumeUp");
  util.sleep(100);
}
```

### 示例 4: 手势录制回放

```javascript
// 预定义手势序列
const gesture = [
  { x: 200, y: 600, phase: "began" },
  { x: 200, y: 550, phase: "moved" },
  { x: 200, y: 500, phase: "moved" },
  { x: 210, y: 450, phase: "moved" },
  { x: 220, y: 400, phase: "moved" },
  { x: 220, y: 400, phase: "ended" }
];

// 简单回放（使用 swipe 代替逐帧控制）
const first = gesture[0];
const last = gesture[gesture.length - 2]; // ended 前一帧
input.swipe(first.x, first.y, last.x, last.y, 0.3);
```

### 示例 5: 配合 HUD 的自动点击器

```javascript
if (!input.isAvailable()) {
  notification.send("错误", "HID 输入不可用");
  return;
}

const s = input.getScreenSize();
let running = true;
let count = 0;

// 在屏幕中心自动点击
while (running && count < 100) {
  input.tap(s.width / 2, s.height / 2);
  count++;
  util.sleep(500);
}

notification.send("完成", `共点击 ${count} 次`);
```

---

## 最佳实践

### 1. 始终检查可用性

```javascript
// ✅ 正确
if (input.isAvailable()) {
  input.tap(200, 400);
}

// ❌ 错误 - 直接调用可能失败
input.tap(200, 400);
```

### 2. 使用相对坐标

```javascript
// ✅ 正确 - 适配不同屏幕尺寸
const s = input.getScreenSize();
input.tap(s.width / 2, s.height * 0.1); // 屏幕顶部 10%

// ❌ 错误 - 硬编码坐标不通用
input.tap(196, 85);
```

### 3. 操作间加入延迟

```javascript
// ✅ 正确 - 等待 UI 响应
input.tap(200, 400);
util.sleep(300);  // 等待动画完成
input.tap(200, 500);

// ❌ 错误 - 连续操作太快可能丢失
input.tap(200, 400);
input.tap(200, 500);
```

### 4. 限制循环次数

```javascript
// ✅ 正确 - 有上限的循环
let maxTaps = 50;
for (let i = 0; i < maxTaps; i++) {
  input.tap(200, 400);
  util.sleep(200);
}

// ❌ 错误 - 无限循环会阻塞
while (true) {
  input.tap(200, 400);
}
```

---

## 注意事项

1. **权限要求**: 需要 `com.apple.private.hid.client.event-dispatch` 权限，仅 TrollStore 签名可用
2. **坐标系**: 使用 UIKit points（逻辑坐标），左上角为原点。通过 `getScreenSize()` 获取屏幕尺寸
3. **阻塞行为**: `longPress`、`swipe`、`drag` 会阻塞脚本执行直到手势完成
4. **字符限制**: `typeText` 仅支持 ASCII 字符，中文/Emoji 请使用 `pasteText`
5. **剪贴板**: `pasteText` 会覆盖当前剪贴板内容
6. **设备兼容**: `IOHIDEventSystemClientCreate` 在某些设备上可能返回 NULL，请始终用 `isAvailable()` 检查
7. **线程安全**: HID 事件通过 IOKit 系统级管道派发，不需要主线程
8. **系统限制**: 模拟触摸无法绕过 Face ID / Touch ID 等生物识别
9. **性能**: swipe/drag 以 60fps 生成触摸点，高频操作时注意 CPU 消耗
