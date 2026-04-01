# Widget 小组件

Widget 模块提供了 Scriptable 兼容的小组件构建能力。你可以使用 JavaScript 构建 iOS 主屏幕小组件的界面，支持文本、图片、日期、堆栈布局、渐变背景等丰富的 UI 元素。

> **Scriptable 兼容**: API 与 Scriptable 保持一致，已有的 Scriptable Widget 脚本可直接运行。
>
> **守护进程支持**: 完全支持。脚本构建的 Widget 树会序列化并保存到 App Group，由 Widget Extension 渲染。

---

## 目录

- [快速开始](#快速开始)
- [工作原理](#工作原理)
- [API 参考](#api-参考)
  - [ListWidget 根容器](#listwidget-根容器)
  - [WidgetStack 堆栈容器](#widgetstack-堆栈容器)
  - [WidgetText 文本元素](#widgettext-文本元素)
  - [WidgetImage 图片元素](#widgetimage-图片元素)
  - [WidgetDate 日期元素](#widgetdate-日期元素)
  - [WidgetSpacer 间距元素](#widgetspacer-间距元素)
  - [Script 脚本工具](#script-脚本工具)
- [样式类](#样式类)
  - [Color 颜色](#color-颜色)
  - [Font 字体](#font-字体)
  - [LinearGradient 渐变](#lineargradient-渐变)
  - [Size 尺寸](#size-尺寸)
  - [Point 坐标](#point-坐标)
  - [SFSymbol 系统图标](#sfsymbol-系统图标)
- [完整示例](#完整示例)
- [最佳实践](#最佳实践)
- [注意事项](#注意事项)

---

## 快速开始

创建一个简单的 Widget 只需要三步：

```javascript
// 1. 创建 Widget
const widget = new ListWidget();
widget.backgroundColor = Color.blue();

// 2. 添加内容
const title = widget.addText('Hello Widget!');
title.textColor = Color.white();
title.font = Font.boldSystemFont(20);

// 3. 设置为小组件
Script.setWidget(widget);
```

---

## 工作原理

```
JS 脚本 → new ListWidget() → 构建节点树 → Script.setWidget()
→ 序列化为 JSON → 保存到 App Group → Widget Extension 读取并渲染
```

1. JS 脚本通过 `new ListWidget()` 创建根节点
2. 通过 `addText()`、`addImage()`、`addStack()` 等方法构建节点树
3. 调用 `Script.setWidget(widget)` 将节点树序列化并保存
4. iOS Widget Extension 从 App Group 读取数据并用 SwiftUI 渲染

#### `Widget.preview(widget, family?)`

在 MiniApp / App 调试界面中预览 Widget，而不是直接保存到 Widget 槽位。`family` 支持 `small`、`medium`、`large`。

```javascript
const widget = new ListWidget();
widget.addText('Preview');
Widget.preview(widget, 'medium');
```

---

## API 参考

### ListWidget 根容器

#### `new ListWidget()`

创建一个 Widget 根容器。所有小组件都以 `ListWidget` 作为根节点。

```javascript
const widget = new ListWidget();
```

**属性:**

| 属性 | 类型 | 说明 |
|------|------|------|
| `backgroundColor` | `Color` | 背景颜色 |
| `backgroundImagePath` | `string` | 背景图片路径（本地文件路径） |
| `backgroundGradient` | `LinearGradient` | 背景渐变 |
| `spacing` | `number` | 子元素间距（points） |
| `url` | `string` | 点击 Widget 时打开的 URL |
| `refreshAfterDate` | `number` | 下次刷新时间戳（Unix timestamp，秒） |

```javascript
const widget = new ListWidget();
widget.backgroundColor = Color.black();
widget.spacing = 8;
widget.url = 'https://example.com';

// 30 分钟后刷新
widget.refreshAfterDate = Date.now() / 1000 + 1800;
```

**方法:**

| 方法 | 返回 | 说明 |
|------|------|------|
| `addText(text)` | `WidgetText` | 添加文本 |
| `addImage(img)` | `WidgetImage` | 添加图片 |
| `addDate(date)` | `WidgetDate` | 添加日期 |
| `addSpacer(length?)` | `WidgetSpacer` | 添加间距 |
| `addStack()` | `WidgetStack` | 添加堆栈容器 |
| `setPadding(top, leading, bottom, trailing)` | - | 设置内边距 |
| `useDefaultPadding()` | - | 恢复默认内边距 |

---

### WidgetStack 堆栈容器

堆栈容器用于组织子元素的布局方向（水平或垂直）。

```javascript
const stack = widget.addStack();
stack.layoutHorizontally();
stack.spacing = 8;
```

**属性:**

| 属性 | 类型 | 说明 |
|------|------|------|
| `backgroundColor` | `Color` | 背景颜色 |
| `backgroundImagePath` | `string` | 背景图片路径 |
| `backgroundGradient` | `LinearGradient` | 背景渐变 |
| `spacing` | `number` | 子元素间距 |
| `size` | `Size` | 堆栈尺寸 |
| `opacity` | `number` | 透明度（0.0 ~ 1.0） |
| `cornerRadius` | `number` | 圆角半径 |
| `borderWidth` | `number` | 边框宽度 |
| `borderColor` | `Color` | 边框颜色 |
| `shadowColor` | `Color` | 阴影颜色 |
| `shadowRadius` | `number` | 阴影半径 |
| `shadowOffset` | `Point` | 阴影偏移 |
| `url` | `string` | 点击时打开的 URL |

**布局方法:**

| 方法 | 说明 |
|------|------|
| `layoutHorizontally()` | 水平排列子元素 |
| `layoutVertically()` | 垂直排列子元素（默认） |
| `topAlignContent()` | 子元素顶部对齐 |
| `centerAlignContent()` | 子元素居中对齐 |
| `bottomAlignContent()` | 子元素底部对齐 |

**子元素方法:** 同 ListWidget（`addText`、`addImage`、`addDate`、`addSpacer`、`addStack`、`setPadding`、`useDefaultPadding`）。

```javascript
// 水平布局示例
const row = widget.addStack();
row.layoutHorizontally();
row.centerAlignContent();
row.spacing = 12;

row.addImage(SFSymbol.named('sun.max.fill'));
row.addText('晴天');
row.addSpacer();
row.addText('28°C');
```

---

### WidgetText 文本元素

由 `addText()` 返回的文本元素对象。

```javascript
const text = widget.addText('Hello');
text.textColor = Color.white();
text.font = Font.boldSystemFont(18);
```

**属性:**

| 属性 | 类型 | 说明 |
|------|------|------|
| `text` | `string` | 文本内容 |
| `textColor` | `Color` | 文本颜色 |
| `font` | `Font` | 字体 |
| `textOpacity` | `number` | 透明度（0.0 ~ 1.0） |
| `lineLimit` | `number` | 最大行数（0 = 不限） |
| `minimumScaleFactor` | `number` | 最小缩放比例（0.0 ~ 1.0） |
| `shadowColor` | `Color` | 阴影颜色 |
| `shadowRadius` | `number` | 阴影半径 |
| `shadowOffset` | `Point` | 阴影偏移 |
| `url` | `string` | 点击时打开的 URL |

**对齐方法:**

| 方法 | 说明 |
|------|------|
| `leftAlignText()` | 左对齐 |
| `centerAlignText()` | 居中对齐 |
| `rightAlignText()` | 右对齐 |

---

### WidgetImage 图片元素

由 `addImage()` 返回的图片元素对象。

```javascript
// SF Symbol 图标
const icon = widget.addImage(SFSymbol.named('star.fill'));
icon.tintColor = Color.yellow();
icon.imageSize = new Size(24, 24);

// 本地文件
const photo = widget.addImage({ path: '/path/to/image.png' });

// Base64
const avatar = widget.addImage({ base64: 'iVBORw0KGgo...' });
```

**`addImage` 参数:**

| 参数类型 | 说明 |
|----------|------|
| `string` | SF Symbol 名称 |
| `SFSymbol` | SF Symbol 对象 |
| `{ path }` | 本地文件路径 |
| `{ base64 }` | Base64 编码图片 |
| `{ sfSymbolName }` | SF Symbol 名称 |

**属性:**

| 属性 | 类型 | 说明 |
|------|------|------|
| `image` | `object` | 图片数据 |
| `resizable` | `boolean` | 是否可缩放 |
| `imageSize` | `Size` | 图片尺寸 |
| `imageOpacity` | `number` | 透明度（0.0 ~ 1.0） |
| `cornerRadius` | `number` | 圆角半径 |
| `borderWidth` | `number` | 边框宽度 |
| `borderColor` | `Color` | 边框颜色 |
| `shadowColor` | `Color` | 阴影颜色 |
| `shadowRadius` | `number` | 阴影半径 |
| `shadowOffset` | `Point` | 阴影偏移 |
| `containerRelativeShape` | `boolean` | 是否跟随容器形状 |
| `tintColor` | `Color` | 着色（适用于 SF Symbol） |
| `url` | `string` | 点击时打开的 URL |

**方法:**

| 方法 | 说明 |
|------|------|
| `leftAlignImage()` | 左对齐 |
| `centerAlignImage()` | 居中对齐 |
| `rightAlignImage()` | 右对齐 |
| `applyFittingContentMode()` | 适应模式（保持比例） |
| `applyFillingContentMode()` | 填充模式 |

---

### WidgetDate 日期元素

显示日期/时间，支持多种格式样式。由 `addDate()` 返回。

```javascript
const dateEl = widget.addDate(new Date());
dateEl.applyTimeStyle();
dateEl.font = Font.mediumSystemFont(14);
```

**属性:** 同 WidgetText（`textColor`、`font`、`textOpacity`、`lineLimit`、`minimumScaleFactor`、`shadowColor`、`shadowRadius`、`shadowOffset`、`url`）。

**日期样式方法:**

| 方法 | 显示效果示例 |
|------|-------------|
| `applyTimeStyle()` | `3:45 PM` |
| `applyDateStyle()` | `March 10, 2026` |
| `applyRelativeStyle()` | `2 hours ago` |
| `applyOffsetStyle()` | `+2 hours` |
| `applyTimerStyle()` | `2:30:00`（倒计时） |

**对齐方法:** `leftAlignText()`、`centerAlignText()`、`rightAlignText()`

---

### WidgetSpacer 间距元素

在容器中添加弹性或固定间距。由 `addSpacer()` 返回。

```javascript
// 弹性间距（自动填充剩余空间）
widget.addSpacer();

// 固定间距
widget.addSpacer(20);
```

**属性:**

| 属性 | 类型 | 说明 |
|------|------|------|
| `length` | `number` | 间距长度（不设则为弹性间距） |

---

### Script 脚本工具

#### `Script.setWidget(widget)`

将构建好的 Widget 树保存为小组件数据。

```javascript
const widget = new ListWidget();
widget.addText('Done!');
Script.setWidget(widget);
```

> 调用后 Widget 节点树被序列化为 JSON 并保存到 App Group，Widget Extension 会在下次刷新时读取并渲染。

#### `Script.complete()`

通知脚本执行完毕（兼容 Scriptable，在 TrollScript 中为空操作）。

```javascript
Script.setWidget(widget);
Script.complete();
```

---

## 样式类

### Color 颜色

#### `new Color(hex, alpha)`

创建自定义颜色。

| 参数 | 类型 | 说明 |
|------|------|------|
| `hex` | `string` | 颜色值（如 `'#FF0000'`、`'FF0000'`、`'F00'`） |
| `alpha` | `number` | 透明度 0.0 ~ 1.0，默认 1.0 |

```javascript
const red = new Color('#FF0000');
const semiBlue = new Color('#0000FF', 0.5);
```

**只读属性:** `hex`、`red`、`green`、`blue`、`alpha`

**静态方法（预设颜色）:**

| 方法 | 颜色 |
|------|------|
| `Color.black()` | 黑色 |
| `Color.white()` | 白色 |
| `Color.red()` | 红色 |
| `Color.green()` | 绿色 |
| `Color.blue()` | 蓝色 |
| `Color.yellow()` | 黄色 |
| `Color.orange()` | 橙色 |
| `Color.purple()` | 紫色 |
| `Color.cyan()` | 青色 |
| `Color.magenta()` | 洋红 |
| `Color.brown()` | 棕色 |
| `Color.gray()` | 灰色 |
| `Color.darkGray()` | 深灰 |
| `Color.lightGray()` | 浅灰 |
| `Color.clear()` | 透明 |

```javascript
// 动态颜色（浅色/深色模式）
const textColor = Color.dynamic(Color.black(), Color.white());
```

---

### Font 字体

**语义字体（自动适配系统设置）:**

| 方法 | 说明 |
|------|------|
| `Font.largeTitle()` | 大标题 |
| `Font.title1()` | 标题 1 |
| `Font.title2()` | 标题 2 |
| `Font.title3()` | 标题 3 |
| `Font.headline()` | 标题行 |
| `Font.subheadline()` | 副标题行 |
| `Font.body()` | 正文 |
| `Font.callout()` | 标注 |
| `Font.footnote()` | 脚注 |
| `Font.caption1()` | 说明 1 |
| `Font.caption2()` | 说明 2 |

**系统字体（指定大小和粗细）:**

```javascript
Font.regularSystemFont(16)    // 常规
Font.mediumSystemFont(16)     // 中等
Font.semiboldSystemFont(16)   // 半粗
Font.boldSystemFont(16)       // 粗体
Font.heavySystemFont(16)      // 重型
Font.blackSystemFont(16)      // 极粗
Font.lightSystemFont(16)      // 轻型
Font.thinSystemFont(16)       // 纤细
Font.ultraLightSystemFont(16) // 极细
Font.italicSystemFont(16)     // 斜体
```

**圆角系统字体:** 将 `SystemFont` 替换为 `RoundedSystemFont`

```javascript
Font.boldRoundedSystemFont(20) // 粗体圆角
```

**等宽系统字体:** 将 `SystemFont` 替换为 `MonospacedSystemFont`

```javascript
Font.regularMonospacedSystemFont(14) // 等宽常规
```

**自定义字体:**

```javascript
const customFont = new Font('Helvetica-Bold', 18);
```

---

### LinearGradient 渐变

```javascript
const gradient = new LinearGradient();
gradient.colors = [Color.blue(), Color.purple()];
gradient.locations = [0, 1];
gradient.startPoint = new Point(0, 0);  // 左上
gradient.endPoint = new Point(1, 1);    // 右下

widget.backgroundGradient = gradient;
```

**属性:**

| 属性 | 类型 | 说明 |
|------|------|------|
| `colors` | `Color[]` | 渐变颜色数组 |
| `locations` | `number[]` | 每个颜色的位置（0.0 ~ 1.0） |
| `startPoint` | `Point` | 渐变起点 |
| `endPoint` | `Point` | 渐变终点 |

---

### Size 尺寸

```javascript
const size = new Size(100, 50);
image.imageSize = size;
```

**属性:** `width`、`height`

---

### Point 坐标

```javascript
const point = new Point(0.5, 0.5);
text.shadowOffset = point;
```

**属性:** `x`、`y`

---

### SFSymbol 系统图标

```javascript
const symbol = SFSymbol.named('heart.fill');
const img = widget.addImage(symbol);
img.tintColor = Color.red();
```

#### `SFSymbol.named(name)`

创建系统图标引用。`name` 为 SF Symbols 图标名称。

> 图标名称参考：[SF Symbols](https://developer.apple.com/sf-symbols/)

---

## 完整示例

### 示例 1: 天气小组件

```javascript
const widget = new ListWidget();

// 渐变背景
const gradient = new LinearGradient();
gradient.colors = [new Color('#4A90D9'), new Color('#357ABD')];
gradient.locations = [0, 1];
widget.backgroundGradient = gradient;

// 城市
const city = widget.addText('北京');
city.textColor = Color.white();
city.font = Font.mediumSystemFont(14);

widget.addSpacer();

// 温度
const temp = widget.addText('28°');
temp.textColor = Color.white();
temp.font = Font.lightSystemFont(42);

// 天气描述
const desc = widget.addText('晴 · 体感温度 30°');
desc.textColor = new Color('#FFFFFF', 0.8);
desc.font = Font.regularSystemFont(13);

Script.setWidget(widget);
```

### 示例 2: 待办事项

```javascript
const widget = new ListWidget();
widget.backgroundColor = Color.white();
widget.setPadding(16, 16, 16, 16);

// 标题行
const header = widget.addStack();
header.layoutHorizontally();
header.centerAlignContent();

const icon = header.addImage(SFSymbol.named('checklist'));
icon.tintColor = Color.blue();
icon.imageSize = new Size(16, 16);
header.addSpacer(6);
const title = header.addText('今日待办');
title.font = Font.boldSystemFont(15);
title.textColor = Color.blue();
header.addSpacer();
header.addText('3');

widget.addSpacer(8);

// 待办列表
const todos = ['完成项目报告', '回复邮件', '预约会议'];
todos.forEach(function(item) {
  const row = widget.addStack();
  row.layoutHorizontally();
  row.centerAlignContent();
  row.spacing = 6;

  const dot = row.addImage(SFSymbol.named('circle'));
  dot.tintColor = Color.gray();
  dot.imageSize = new Size(12, 12);
  const label = row.addText(item);
  label.font = Font.regularSystemFont(13);
  label.lineLimit = 1;
});

widget.addSpacer();

Script.setWidget(widget);
```

### 示例 3: 倒计时

```javascript
const widget = new ListWidget();
widget.backgroundColor = new Color('#1C1C1E');

const label = widget.addText('距离新年');
label.textColor = Color.lightGray();
label.font = Font.caption1();

widget.addSpacer(4);

// 目标日期
const target = new Date('2027-01-01T00:00:00');
const dateEl = widget.addDate(target);
dateEl.applyTimerStyle();
dateEl.textColor = Color.orange();
dateEl.font = Font.boldSystemFont(28);

widget.addSpacer();

const footer = widget.addText('2027');
footer.textColor = Color.gray();
footer.font = Font.footnote();
footer.rightAlignText();

// 每小时刷新
widget.refreshAfterDate = Date.now() / 1000 + 3600;

Script.setWidget(widget);
```

### 示例 4: 数据卡片

```javascript
const widget = new ListWidget();
widget.setPadding(12, 16, 12, 16);

// 渐变背景
const bg = new LinearGradient();
bg.colors = [new Color('#667eea'), new Color('#764ba2')];
bg.locations = [0, 1];
widget.backgroundGradient = bg;

const title = widget.addText('步数统计');
title.textColor = Color.white();
title.font = Font.caption1();

widget.addSpacer();

const count = widget.addText('12,580');
count.textColor = Color.white();
count.font = Font.boldSystemFont(28);

const unit = widget.addText('步 · 目标 85%');
unit.textColor = new Color('#FFFFFF', 0.7);
unit.font = Font.regularSystemFont(12);

widget.addSpacer(4);

// 进度条（用 Stack 模拟）
const barBg = widget.addStack();
barBg.layoutHorizontally();
barBg.backgroundColor = new Color('#FFFFFF', 0.3);
barBg.cornerRadius = 3;
barBg.size = new Size(0, 6);

const barFill = barBg.addStack();
barFill.backgroundColor = Color.white();
barFill.cornerRadius = 3;
barFill.size = new Size(120, 6);

Script.setWidget(widget);
```

### 示例 5: 网络数据 Widget

```javascript
// 从 API 获取数据
const resp = http.get('https://api.example.com/quote');
const data = JSON.parse(resp.body);

const widget = new ListWidget();
widget.backgroundColor = new Color('#FAFAFA');
widget.setPadding(16, 16, 16, 16);

const quoteIcon = widget.addImage(SFSymbol.named('quote.opening'));
quoteIcon.tintColor = Color.gray();
quoteIcon.imageSize = new Size(20, 16);

widget.addSpacer(8);

const quote = widget.addText(data.content || '生活就是不断前行');
quote.font = Font.regularSystemFont(15);
quote.textColor = new Color('#333333');

widget.addSpacer();

const author = widget.addText('— ' + (data.author || '佚名'));
author.font = Font.italicSystemFont(13);
author.textColor = Color.gray();
author.rightAlignText();

// 每 6 小时刷新
widget.refreshAfterDate = Date.now() / 1000 + 21600;

Script.setWidget(widget);
```

### 示例 6: 圆角 + 透明 + 阴影卡片

```javascript
const widget = new ListWidget();
widget.backgroundColor = new Color('#101014');

const card = widget.addStack();
card.setPadding(12, 12, 12, 12);
card.backgroundColor = new Color('#1C1C1E');
card.opacity = 0.92;
card.cornerRadius = 12;
card.shadowColor = new Color('#000000', 0.35);
card.shadowRadius = 8;
card.shadowOffset = new Point(0, 3);

const icon = card.addImage(SFSymbol.named('star.fill'));
icon.imageSize = new Size(32, 32);
icon.tintColor = new Color('#FFD60A');
icon.cornerRadius = 8;
icon.shadowColor = new Color('#000000', 0.35);
icon.shadowRadius = 6;
icon.shadowOffset = new Point(0, 2);

card.addSpacer(8);
const title = card.addText('Hello Widget');
title.textColor = Color.white();

Script.setWidget(widget);
```

---

## 最佳实践

### 1. 始终调用 Script.setWidget

```javascript
// 正确 - 保存 Widget 数据
const widget = new ListWidget();
widget.addText('Hello');
Script.setWidget(widget);

// 错误 - Widget 不会显示
const widget2 = new ListWidget();
widget2.addText('Hello');
// 忘记调用 Script.setWidget
```

### 2. 使用弹性 Spacer 布局

```javascript
// 推荐 - 自适应布局
widget.addText('顶部');
widget.addSpacer();  // 弹性空间
widget.addText('底部');

// 不推荐 - 固定间距在不同尺寸 Widget 上可能溢出
widget.addText('顶部');
widget.addSpacer(200);
widget.addText('底部');
```

### 3. 限制文本行数

```javascript
// 推荐 - 避免文本过长导致布局溢出
const text = widget.addText(longContent);
text.lineLimit = 2;
text.minimumScaleFactor = 0.8;
```

### 4. 设置合理的刷新时间

```javascript
// 推荐 - 根据数据更新频率设置
widget.refreshAfterDate = Date.now() / 1000 + 1800; // 30 分钟

// 不推荐 - 过于频繁会消耗电量
widget.refreshAfterDate = Date.now() / 1000 + 60; // 1 分钟（iOS 可能会忽略）
```

### 5. 使用语义字体

```javascript
// 推荐 - 自动适配用户的字体大小偏好
title.font = Font.headline();
body.font = Font.body();

// 也可以 - 需要精确控制大小时
title.font = Font.boldSystemFont(20);
```

---

## 注意事项

1. **Widget 尺寸**: iOS 提供 Small、Medium、Large 三种尺寸，你的布局需要适配所有尺寸
2. **刷新限制**: iOS 限制 Widget 刷新频率，`refreshAfterDate` 只是建议值，系统可能延迟刷新
3. **无交互**: Widget 不支持按钮等交互，`url` 属性用于打开链接（整个 Widget 或单个元素）
4. **图片限制**: 建议使用 SF Symbol 或小尺寸本地图片，网络图片需要先下载到本地
5. **深色模式**: 使用 `Color.dynamic(lightColor, darkColor)` 适配深色模式
6. **内存限制**: Widget Extension 内存有限（约 30MB），避免加载大量图片
7. **序列化**: Widget 树通过 JSON 序列化传递，不支持函数/闭包属性
8. **Scriptable 兼容**: API 与 Scriptable 保持一致，`presentSmall()` 等预览方法为兼容保留
9. **脚本元数据**: `Script._widgetSlot`、`Script._widgetScriptName`、`Script._widgetScriptId` 由系统自动注入
10. **App Group**: Widget 数据存储在 App Group 共享容器中，确保 App 和 Extension 使用相同的 Group ID
