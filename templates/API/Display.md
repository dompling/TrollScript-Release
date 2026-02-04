# Display 显示控制

Display 模块提供了显示相关的控制功能，包括屏幕亮度调节、屏幕信息获取、低电量模式控制、自动亮度设置等。

> **守护进程支持**: 有限支持。亮度设置和 keepAwake 后台可能不生效，openSettings 需要 UI 交互。

---

## 目录

- [快速开始](#快速开始)
- [API 参考](#api-参考)
  - [亮度控制](#亮度控制)
    - [display.getBrightness()](#displaygetbrightness)
    - [display.setBrightness()](#displaysetbrightness)
    - [display.increaseBrightness()](#displayincreasebrightness)
    - [display.decreaseBrightness()](#displaydecreasebrightness)
  - [屏幕信息](#屏幕信息)
    - [display.getScreenInfo()](#displaygetscreeninfo)
    - [display.getOrientation()](#displaygetorientation)
  - [电源管理](#电源管理)
    - [display.isLowPowerModeEnabled()](#displayislowpowermodeenabled)
    - [display.setLowPowerMode()](#displaysetlowpowermode)
    - [display.keepAwake()](#displaykeepawake)
  - [自动亮度](#自动亮度)
    - [display.isAutoBrightnessEnabled()](#displayisautobrightnessenabl)
    - [display.setAutoBrightness()](#displaysetautobrightness)
  - [其他](#其他)
    - [display.openSettings()](#displayopensettings)
- [完整示例](#完整示例)
- [最佳实践](#最佳实践)

---

## 快速开始

使用 Display 模块控制屏幕非常简单：

```javascript
// 获取当前亮度
const brightness = display.getBrightness();
console.log('当前亮度:', Math.round(brightness * 100) + '%');

// 设置亮度
display.setBrightness(0.8);  // 设置为 80%

// 增加亮度
display.increaseBrightness(0.1);  // 增加 10%

// 获取屏幕信息
const screen = display.getScreenInfo();
console.log(`屏幕: ${screen.width}x${screen.height} @${screen.scale}x`);

// 开启低电量模式
display.setLowPowerMode(true);
```

---

## API 参考

### 亮度控制

#### `display.getBrightness()`

获取当前屏幕亮度。

**返回:** `number` — 亮度值（0.0 - 1.0）

```javascript
const brightness = display.getBrightness();
console.log('当前亮度:', Math.round(brightness * 100) + '%');
// 输出: 当前亮度: 75%
```

**注意:**
- 优先使用 BackBoardServices 私有 API，在 Daemon 模式下也能正常工作
- 如果私有 API 不可用，会降级使用 UIScreen.main.brightness

---

#### `display.setBrightness(value)`

设置屏幕亮度。

**参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `value` | `number` | 是 | 亮度值（0.0 - 1.0） |

**返回:** `boolean` — 设置是否成功

```javascript
// 设置为 50% 亮度
display.setBrightness(0.5);

// 设置为最大亮度
display.setBrightness(1.0);

// 设置为最小亮度
display.setBrightness(0.0);
```

**注意:**
- 值会自动限制在 0.0 - 1.0 范围内
- 优先使用 BackBoardServices 私有 API
- 在 Daemon 模式下也能正常工作

---

#### `display.increaseBrightness(amount?)`

增加屏幕亮度。

**参数:**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `amount` | `number` | 否 | `0.1` | 增加的亮度值（0.0 - 1.0） |

**返回:** `boolean` — 设置是否成功

```javascript
// 增加 10% 亮度（默认）
display.increaseBrightness();

// 增加 20% 亮度
display.increaseBrightness(0.2);

// 增加 5% 亮度
display.increaseBrightness(0.05);
```

**注意:** 亮度不会超过 1.0（100%）

---

#### `display.decreaseBrightness(amount?)`

降低屏幕亮度。

**参数:**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `amount` | `number` | 否 | `0.1` | 降低的亮度值（0.0 - 1.0） |

**返回:** `boolean` — 设置是否成功

```javascript
// 降低 10% 亮度（默认）
display.decreaseBrightness();

// 降低 20% 亮度
display.decreaseBrightness(0.2);

// 降低 5% 亮度
display.decreaseBrightness(0.05);
```

**注意:** 亮度不会低于 0.0（0%）

---

### 屏幕信息

#### `display.getScreenInfo()`

获取屏幕信息。

**返回:** `object` — 屏幕信息对象

| 字段 | 类型 | 说明 |
|------|------|------|
| `width` | `number` | 屏幕宽度（逻辑像素） |
| `height` | `number` | 屏幕高度（逻辑像素） |
| `scale` | `number` | 屏幕缩放比例（如 2.0、3.0） |
| `nativeWidth` | `number` | 原生宽度（物理像素） |
| `nativeHeight` | `number` | 原生高度（物理像素） |

```javascript
const screen = display.getScreenInfo();
console.log(`逻辑分辨率: ${screen.width}x${screen.height}`);
console.log(`物理分辨率: ${screen.nativeWidth}x${screen.nativeHeight}`);
console.log(`缩放比例: @${screen.scale}x`);

// 输出:
// 逻辑分辨率: 393x852
// 物理分辨率: 1179x2556
// 缩放比例: @3x
```

---

#### `display.getOrientation()`

获取屏幕方向。

**返回:** `string` — 屏幕方向: `'portrait'` | `'landscape'`

```javascript
const orientation = display.getOrientation();
console.log('屏幕方向:', orientation);

if (orientation === 'portrait') {
  console.log('竖屏模式');
} else if (orientation === 'landscape') {
  console.log('横屏模式');
}
```

---

### 电源管理

#### `display.isLowPowerModeEnabled()`

检查低电量模式是否开启。

**返回:** `boolean` — 如果开启返回 `true`，否则返回 `false`

```javascript
const isLowPower = display.isLowPowerModeEnabled();
console.log('低电量模式:', isLowPower ? '开启' : '关闭');
```

---

#### `display.setLowPowerMode(enabled)`

设置低电量模式。

**参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `enabled` | `boolean` | 是 | `true` 开启，`false` 关闭 |

**返回:** `boolean` — 设置是否成功

```javascript
// 开启低电量模式
const success = display.setLowPowerMode(true);
if (success) {
  console.log('低电量模式已开启');
}

// 关闭低电量模式
display.setLowPowerMode(false);
```

**注意:** 需要使用私有 API，可能在某些系统版本上不可用

---

#### `display.keepAwake(enabled)`

设置屏幕保持常亮（禁用自动锁屏）。

**参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `enabled` | `boolean` | 是 | `true` 保持常亮，`false` 恢复自动锁屏 |

**返回:** `boolean` — 设置是否成功

```javascript
// 保持屏幕常亮
display.keepAwake(true);
console.log('屏幕将保持常亮');

// 恢复自动锁屏
display.keepAwake(false);
console.log('屏幕将自动锁定');
```

**注意:**
- 在 Daemon 模式下不可用，会返回 `false`
- 仅在主应用运行时有效

---

### 自动亮度

#### `display.isAutoBrightnessEnabled()`

检查自动亮度是否开启。

**返回:** `boolean` — 如果开启返回 `true`，否则返回 `false`

```javascript
const isAuto = display.isAutoBrightnessEnabled();
console.log('自动亮度:', isAuto ? '开启' : '关闭');
```

---

#### `display.setAutoBrightness(enabled)`

设置自动亮度。

**参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `enabled` | `boolean` | 是 | `true` 开启，`false` 关闭 |

**返回:** `boolean` — 设置是否成功

```javascript
// 开启自动亮度
const success = display.setAutoBrightness(true);
if (success) {
  console.log('自动亮度已开启');
}

// 关闭自动亮度
display.setAutoBrightness(false);
```

**注意:** 需要使用私有 API，可能在某些系统版本上不可用

---

### 其他

#### `display.openSettings()`

打开显示设置页面。

**返回:** `boolean` — 是否成功打开

```javascript
const success = display.openSettings();
if (success) {
  console.log('已打开显示设置');
} else {
  console.log('无法打开设置');
}
```

**注意:**
- 在 Daemon 模式下不可用，会返回 `false`
- 会尝试打开显示设置，如果失败则打开应用设置

---

## 完整示例

### 示例 1: 智能亮度调节

```javascript
// 根据时间自动调节亮度
function autoAdjustBrightness() {
  const hour = new Date().getHours();

  let targetBrightness;
  if (hour >= 6 && hour < 8) {
    // 早晨：逐渐增加亮度
    targetBrightness = 0.5;
  } else if (hour >= 8 && hour < 18) {
    // 白天：较高亮度
    targetBrightness = 0.8;
  } else if (hour >= 18 && hour < 22) {
    // 傍晚：中等亮度
    targetBrightness = 0.6;
  } else {
    // 夜间：低亮度
    targetBrightness = 0.3;
  }

  const current = display.getBrightness();
  console.log(`当前亮度: ${Math.round(current * 100)}%`);
  console.log(`目标亮度: ${Math.round(targetBrightness * 100)}%`);

  display.setBrightness(targetBrightness);
  haptic.light();

  notification.send('亮度已调节', `已设置为 ${Math.round(targetBrightness * 100)}%`);
}

autoAdjustBrightness();
```

---

### 示例 2: 阅读模式

```javascript
// 开启阅读模式：降低亮度，关闭自动亮度
function enableReadingMode() {
  console.log('开启阅读模式...');

  // 保存当前设置
  const currentBrightness = display.getBrightness();
  const currentAutoBrightness = display.isAutoBrightnessEnabled();

  storage.set('reading_mode_backup', {
    brightness: currentBrightness,
    autoBrightness: currentAutoBrightness
  });

  // 设置阅读模式
  display.setAutoBrightness(false);
  display.setBrightness(0.4);  // 40% 亮度

  haptic.success();
  notification.send('阅读模式', '已开启，亮度已调低');
}

// 关闭阅读模式：恢复之前的设置
function disableReadingMode() {
  console.log('关闭阅读模式...');

  const backup = storage.get('reading_mode_backup');
  if (backup) {
    display.setBrightness(backup.brightness);
    display.setAutoBrightness(backup.autoBrightness);
    storage.remove('reading_mode_backup');
  }

  haptic.success();
  notification.send('阅读模式', '已关闭，设置已恢复');
}

// 使用
enableReadingMode();

// 30分钟后自动关闭
setTimeout(() => {
  disableReadingMode();
}, 30 * 60 * 1000);
```

---

### 示例 3: 省电模式

```javascript
// 开启省电模式
function enablePowerSavingMode() {
  console.log('开启省电模式...');

  // 降低亮度
  const current = display.getBrightness();
  if (current > 0.3) {
    display.setBrightness(0.3);
    console.log('亮度已降低至 30%');
  }

  // 开启低电量模式
  const success = display.setLowPowerMode(true);
  if (success) {
    console.log('低电量模式已开启');
  }

  // 关闭自动亮度
  display.setAutoBrightness(false);

  notification.send('省电模式', '已开启，亮度已降低');
}

// 检查电量并自动开启省电模式
function checkBatteryAndSave() {
  const battery = device.battery();
  const level = Math.round(battery.level * 100);

  console.log(`当前电量: ${level}%`);

  if (level < 20 && battery.state === 'unplugged') {
    console.log('电量不足，开启省电模式');
    enablePowerSavingMode();
  }
}

checkBatteryAndSave();
```

---

### 示例 4: 屏幕信息显示

```javascript
// 显示详细的屏幕信息
function showScreenInfo() {
  const screen = display.getScreenInfo();
  const orientation = display.getOrientation();
  const brightness = display.getBrightness();
  const isAuto = display.isAutoBrightnessEnabled();
  const isLowPower = display.isLowPowerModeEnabled();

  console.log('=== 屏幕信息 ===');
  console.log(`逻辑分辨率: ${screen.width}x${screen.height}`);
  console.log(`物理分辨率: ${screen.nativeWidth}x${screen.nativeHeight}`);
  console.log(`缩放比例: @${screen.scale}x`);
  console.log(`屏幕方向: ${orientation}`);
  console.log(`当前亮度: ${Math.round(brightness * 100)}%`);
  console.log(`自动亮度: ${isAuto ? '开启' : '关闭'}`);
  console.log(`低电量模式: ${isLowPower ? '开启' : '关闭'}`);

  // 计算 PPI
  const diagonal = Math.sqrt(
    Math.pow(screen.nativeWidth, 2) + Math.pow(screen.nativeHeight, 2)
  );
  const screenSize = 6.1;  // 假设屏幕尺寸
  const ppi = Math.round(diagonal / screenSize);
  console.log(`估算 PPI: ${ppi}`);
}

showScreenInfo();
```

---

### 示例 5: 亮度快捷调节

```javascript
// 创建亮度快捷调节菜单
function showBrightnessMenu() {
  const current = display.getBrightness();
  const currentPercent = Math.round(current * 100);

  console.log(`当前亮度: ${currentPercent}%`);
  console.log('选择亮度:');
  console.log('1. 最低 (10%)');
  console.log('2. 较低 (30%)');
  console.log('3. 中等 (50%)');
  console.log('4. 较高 (70%)');
  console.log('5. 最高 (100%)');

  // 这里可以配合 HUD 创建交互式菜单
  const win = hud.createWindow({
    width: 200,
    height: 200,
    draggable: true
  });

  win.addText({ text: `当前: ${currentPercent}%` });

  const levels = [
    { label: '最低 10%', value: 0.1 },
    { label: '较低 30%', value: 0.3 },
    { label: '中等 50%', value: 0.5 },
    { label: '较高 70%', value: 0.7 },
    { label: '最高 100%', value: 1.0 }
  ];

  levels.forEach(level => {
    win.addButton({
      title: level.label,
      onClick: () => {
        display.setBrightness(level.value);
        haptic.light();
        win.dismiss();
      }
    });
  });

  win.show();
}

showBrightnessMenu();
```

---

### 示例 6: 自适应亮度

```javascript
// 根据环境光自适应调节亮度（模拟）
function adaptiveBrightness() {
  // 注意：iOS 不提供环境光传感器 API
  // 这里使用时间和电量作为参考

  const hour = new Date().getHours();
  const battery = device.battery();
  const isCharging = battery.state === 'charging';
  const level = battery.level;

  let brightness;

  if (isCharging) {
    // 充电时可以使用较高亮度
    if (hour >= 6 && hour < 22) {
      brightness = 0.8;
    } else {
      brightness = 0.5;
    }
  } else {
    // 未充电时根据电量调节
    if (level < 0.2) {
      brightness = 0.3;  // 低电量时降低亮度
    } else if (level < 0.5) {
      brightness = 0.5;
    } else {
      brightness = 0.7;
    }

    // 夜间进一步降低
    if (hour < 6 || hour >= 22) {
      brightness *= 0.6;
    }
  }

  console.log(`自适应亮度: ${Math.round(brightness * 100)}%`);
  display.setBrightness(brightness);
}

// 每5分钟调整一次
setInterval(adaptiveBrightness, 5 * 60 * 1000);
adaptiveBrightness();  // 立即执行一次
```

---

### 示例 7: 屏幕方向监控

```javascript
// 监控屏幕方向变化
let lastOrientation = display.getOrientation();

function checkOrientationChange() {
  const current = display.getOrientation();

  if (current !== lastOrientation) {
    console.log(`屏幕方向变化: ${lastOrientation} -> ${current}`);

    // 根据方向调整布局
    if (current === 'landscape') {
      console.log('切换到横屏布局');
      // 调整 HUD 窗口位置
    } else if (current === 'portrait') {
      console.log('切换到竖屏布局');
      // 调整 HUD 窗口位置
    }

    lastOrientation = current;
    haptic.selection();
  }
}

// 每秒检查一次
setInterval(checkOrientationChange, 1000);
```

---

## 最佳实践

### 1. 保存用户设置

在修改亮度前保存原始设置：

```javascript
// ✅ 正确 - 保存原始设置
const originalBrightness = display.getBrightness();
display.setBrightness(0.5);

// 稍后恢复
display.setBrightness(originalBrightness);

// ❌ 错误 - 没有保存原始设置
display.setBrightness(0.5);
// 无法恢复到原始亮度
```

### 2. 渐进式调节亮度

避免突然改变亮度，使用渐进式调节：

```javascript
// ✅ 正确 - 渐进式调节
function smoothSetBrightness(target, steps = 10, delay = 50) {
  const current = display.getBrightness();
  const step = (target - current) / steps;

  for (let i = 0; i < steps; i++) {
    setTimeout(() => {
      const newBrightness = current + step * (i + 1);
      display.setBrightness(newBrightness);
    }, delay * i);
  }
}

smoothSetBrightness(0.8);

// ❌ 错误 - 突然改变
display.setBrightness(0.8);  // 可能刺眼
```

### 3. 检查操作结果

检查设置操作是否成功：

```javascript
// ✅ 正确
const success = display.setLowPowerMode(true);
if (success) {
  console.log('低电量模式已开启');
} else {
  console.error('无法开启低电量模式');
}

// ❌ 错误 - 不检查结果
display.setLowPowerMode(true);
// 不知道是否成功
```

### 4. 考虑用户偏好

尊重用户的亮度设置：

```javascript
// ✅ 正确 - 提供选项
const autoAdjust = storage.get('auto_adjust_brightness') !== false;
if (autoAdjust) {
  adjustBrightness();
}

// ❌ 错误 - 强制调节
adjustBrightness();  // 没有考虑用户偏好
```

### 5. 避免频繁调节

不要过于频繁地调节亮度：

```javascript
// ✅ 正确 - 限制调节频率
let lastAdjustTime = 0;
const MIN_INTERVAL = 5000;  // 5秒

function adjustBrightnessIfNeeded() {
  const now = Date.now();
  if (now - lastAdjustTime < MIN_INTERVAL) {
    return;
  }

  display.setBrightness(0.7);
  lastAdjustTime = now;
}

// ❌ 错误 - 频繁调节
setInterval(() => {
  display.setBrightness(0.7);
}, 100);  // 每100ms调节一次，太频繁
```

### 6. 处理 Daemon 模式限制

检查是否在 Daemon 模式下：

```javascript
// ✅ 正确 - 检查环境
const success = display.keepAwake(true);
if (!success) {
  console.log('keepAwake 在 Daemon 模式下不可用');
}

// ❌ 错误 - 不检查环境
display.keepAwake(true);
// 在 Daemon 模式下会失败
```

---

## 注意事项

1. **私有 API**: 部分功能使用 BackBoardServices 私有 API，在某些系统版本上可能不可用
2. **Daemon 模式**: `keepAwake` 和 `openSettings` 在 Daemon 模式下不可用
3. **权限要求**: 控制亮度和低电量模式需要 TrollStore 提供的特殊权限
4. **用户体验**: 突然改变亮度可能影响用户体验，建议渐进式调节
5. **电量消耗**: 高亮度会增加电量消耗
6. **自动亮度**: 关闭自动亮度后，系统不会根据环境光自动调节
7. **线程安全**: 亮度控制使用 MainThreadHelper 确保线程安全
8. **系统限制**: 某些设置（如低电量模式）可能受系统限制
