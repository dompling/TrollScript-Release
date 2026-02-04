# HUD 浮窗系统

HUD（Heads-Up Display）模块提供了创建系统级悬浮窗口的能力。你可以使用它来构建自定义浮窗界面，包括文本显示、按钮交互、图片展示等丰富的 UI 元素。

> **守护进程支持**: 完全支持。在触发器模式下可正常运行，能够创建系统级悬浮窗口。

---

## 目录

- [快速开始](#快速开始)
- [API 参考](#api-参考)
  - [hud 模块方法](#hud-模块方法)
  - [Window 窗口对象](#window-窗口对象)
  - [Stack 堆栈容器](#stack-堆栈容器)
  - [Text 文本元素](#text-文本元素)
  - [Button 按钮元素](#button-按钮元素)
  - [Image 图片元素](#image-图片元素)
  - [Spacer 间距元素](#spacer-间距元素)
  - [Loading 加载指示器](#loading-加载指示器)
  - [ScrollView 滚动视图](#scrollview-滚动视图)
  - [List 列表视图](#list-列表视图)
- [样式配置](#样式配置)
- [完整示例](#完整示例)
- [最佳实践](#最佳实践)

---

## 快速开始

创建一个简单的 HUD 浮窗只需要三步：

```javascript
// 1. 创建窗口
const win = hud.createWindow({
  width: 200,
  height: 80,
  draggable: true,
  style: { backgroundColor: '#000000CC', cornerRadius: 12 }
});

// 2. 添加内容
win.addText({ text: 'Hello HUD!', style: { textColor: '#FFFFFF', fontSize: 16 } });

// 3. 显示窗口
win.show();
```

---

## API 参考

### hud 模块方法

#### `hud.createWindow(config)`

创建一个 HUD 窗口。

**参数:**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `config` | `object` | 是 | 窗口配置对象 |

**config 配置项:**

| 字段            | 类型        | 默认值   | 说明                    |
|---------------|-----------|-------|-----------------------|
| `id`          | `string`  | -     | 窗口ID                   |
| `width`       | `number`  | 200   | 窗口宽度                  |
| `height`      | `number`  | 100   | 窗口高度                  |
| `x`           | `number`  | 居中    | 窗口 X 坐标               |
| `y`           | `number`  | 居中    | 窗口 Y 坐标               |
| `draggable`   | `boolean` | false | 是否可拖拽                 |
| `dismissible` | `boolean` | true  | 是否可通过手势关闭             |
| `autoClear`   | `number`  | -     | 自动关闭时间（秒），不设置则不自动关闭   |
| `style`       | `object`  | -     | 窗口样式，详见 [样式配置](#样式配置) |

**返回:** `Window` — 窗口对象

```javascript
const win = hud.createWindow({
  width: 280,
  height: 120,
  x: 50,
  y: 100,
  draggable: true,
  dismissible: true,
  autoClear: 5,
  style: {
    backgroundColor: '#1C1C1EF0',
    cornerRadius: 16,
    shadow: true
  }
});
```

---


#### `hud.getWindow(id)`

获取窗口是否被创建。


```javascript
const existingWin = hud.getWindow('win9');
if (existingWin) {
  console.log('Window already exists!');
  return
}
```

#### `hud.getScreenSize()`

获取当前设备的屏幕尺寸信息。

**返回:** `{ width: number, height: number, scale: number }`

| 字段 | 类型 | 说明 |
|------|------|------|
| `width` | `number` | 屏幕宽度（逻辑像素） |
| `height` | `number` | 屏幕高度（逻辑像素） |
| `scale` | `number` | 屏幕缩放比例（如 2x、3x） |

```javascript
const screen = hud.getScreenSize();
console.log(`屏幕: ${screen.width}x${screen.height} @${screen.scale}x`);
```

---

#### `hud.clearAll()`

清除所有已创建的 HUD 窗口。

```javascript
hud.clearAll();
```

---

#### `hud.getAllWindows()`

获取所有已创建窗口的 ID 列表。

**返回:** `[string]` — 窗口 ID 数组

```javascript
const windowIds = hud.getAllWindows();
console.log('当前窗口数量:', windowIds.length);
```

---

### Window 窗口对象

`Window` 对象由 `hud.createWindow()` 返回，用于管理窗口内容和状态。

#### `win.addText(config)`

向窗口添加文本元素。

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `config.text` | `string` | 是 | 文本内容 |
| `config.style` | `object` | 否 | 文本样式，详见 [样式配置](#样式配置) |

**返回:** `Text` — 文本元素对象

```javascript
const label = win.addText({
  text: '当前温度: 26°C',
  style: { textColor: '#00FF00', fontSize: 18, fontWeight: 'bold' }
});
```

---

#### `win.addButton(config)`

向窗口添加按钮元素。

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `config.title` | `string` | 是 | 按钮标题 |
| `config.style` | `object` | 否 | 按钮样式 |
| `config.onClick` | `function` | 否 | 点击回调函数 |

**返回:** `Button` — 按钮元素对象

```javascript
const btn = win.addButton({
  title: '点击我',
  style: { backgroundColor: '#007AFF', textColor: '#FFFFFF', cornerRadius: 8 },
  onClick: () => {
    console.log('按钮被点击了！');
  }
});
```

---

#### `win.addImage(config)`

向窗口添加图片元素。支持两种图片来源，选择其中一种即可。

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `config.path` | `string` | 二选一 | 本地图片文件路径 |
| `config.systemName` | `string` | 二选一 | SF Symbol 图标名称 |
| `config.width` | `number` | 否 | 图片宽度 |
| `config.height` | `number` | 否 | 图片高度 |

**返回:** `Image` — 图片元素对象

```javascript
// SF Symbol 图标
win.addImage({ systemName: 'checkmark.circle.fill', width: 32, height: 32 });

// 本地文件
win.addImage({ path: '/var/mobile/Documents/photo.png', width: 100, height: 100 });
```

---

#### `win.addStack(config?)`

向窗口添加堆栈容器。堆栈容器可以包含多个子元素，支持水平和垂直排列。

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `config.axis` | `string` | `'vertical'` | 排列方向: `'horizontal'` \| `'vertical'` |
| `config.spacing` | `number` | 8 | 子元素间距 |
| `config.alignment` | `string` | `'center'` | 对齐方式: `'leading'` \| `'center'` \| `'trailing'` \| `'fill'` |
| `config.style` | `object` | - | 堆栈样式 |

**返回:** `Stack` — 堆栈容器对象

```javascript
// 水平排列的按钮组
const buttonRow = win.addStack({ axis: 'horizontal', spacing: 12 });
buttonRow.addButton({ title: '取消', style: { backgroundColor: '#3A3A3C' } });
buttonRow.addButton({ title: '确认', style: { backgroundColor: '#007AFF' } });
```

---

#### `win.addSpacer(config?)`

向窗口添加间距元素，用于调整元素之间的间隔。

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `config.height` | `number` | 8 | 间距高度 |

**返回:** `Spacer` — 间距元素对象

```javascript
win.addText({ text: '标题' });
win.addSpacer({ height: 20 });
win.addText({ text: '内容' });
```

---

#### `win.show()`

显示窗口，带有淡入动画效果。

```javascript
win.show();
```

---

#### `win.hide()`

隐藏窗口，带有淡出动画效果。窗口不会被销毁，可以通过 `show()` 重新显示。

```javascript
win.hide();
```

---

#### `win.dismiss()`

关闭并销毁窗口。窗口被销毁后不可再使用。

```javascript
win.dismiss();
```

---

#### `win.refresh()`

刷新窗口布局。在动态修改元素后调用此方法可重新计算布局。

```javascript
label.setText('新的文本内容');
win.refresh();
```

---

#### `win.setPosition(x, y)`

设置窗口在屏幕上的位置。

| 参数 | 类型 | 说明 |
|------|------|------|
| `x` | `number` | X 坐标 |
| `y` | `number` | Y 坐标 |

```javascript
win.setPosition(100, 200);
```

---

#### `win.setSize(width, height)`

设置窗口大小。

| 参数 | 类型 | 说明 |
|------|------|------|
| `width` | `number` | 宽度 |
| `height` | `number` | 高度 |

```javascript
win.setSize(300, 150);
```

---

#### `win.setStyle(style)`

更新窗口样式，详见 [样式配置](#样式配置)。

```javascript
win.setStyle({
  backgroundColor: '#FF0000AA',
  cornerRadius: 20,
  shadow: true
});
```

---

#### `win.getBounds()`

获取窗口的当前位置和大小。

**返回:** `{ x: number, y: number, width: number, height: number }`

```javascript
const bounds = win.getBounds();
console.log(`窗口位置: (${bounds.x}, ${bounds.y}), 大小: ${bounds.width}x${bounds.height}`);
```

---

#### `win.isVisible()`

检查窗口是否当前可见。

**返回:** `boolean`

```javascript
if (win.isVisible()) {
  console.log('窗口正在显示');
}
```

---

### Stack 堆栈容器

`Stack` 对象由 `win.addStack()` 或其他堆栈的 `addStack()` 返回。堆栈容器类似于 iOS WidgetStack，可以包含文本、按钮、图片等子元素。

#### `stack.addText(config)`

向堆栈添加文本元素。参数同 `win.addText()`。

**返回:** `Text`

---

#### `stack.addButton(config)`

向堆栈添加按钮元素。参数同 `win.addButton()`。

**返回:** `Button`

---

#### `stack.addImage(config)`

向堆栈添加图片元素。参数同 `win.addImage()`。

**返回:** `Image`

---

#### `stack.addSpacer(config?)`

向堆栈添加间距元素。参数同 `win.addSpacer()`。

**返回:** `Spacer`

---

#### `stack.setStyle(style)`

更新堆栈样式。

| 字段 | 类型 | 说明 |
|------|------|------|
| `backgroundColor` | `string` | 背景颜色（十六进制） |
| `cornerRadius` | `number` | 圆角半径 |
| `padding` | `number` | 内边距 |
| `opacity` | `number` | 不透明度 (0-1) |

---

#### `stack.setSpacing(spacing)`

设置堆栈内子元素的间距。

| 参数 | 类型 | 说明 |
|------|------|------|
| `spacing` | `number` | 间距值 |

---

#### `stack.setAlignment(alignment)`

设置堆栈内子元素的对齐方式。

| 参数 | 类型 | 说明 |
|------|------|------|
| `alignment` | `string` | 对齐方式: `'leading'` \| `'center'` \| `'trailing'` \| `'fill'` |

---

#### `stack.remove()`

从父容器中移除该堆栈。

---

### Text 文本元素

`Text` 对象由 `addText()` 返回，用于显示和控制文本内容。

#### `text.setText(text)`

设置文本内容。

| 参数 | 类型 | 说明 |
|------|------|------|
| `text` | `string` | 文本内容 |

```javascript
label.setText('更新后的文本');
```

---

#### `text.setStyle(style)`

更新文本样式。

| 字段 | 类型 | 说明 |
|------|------|------|
| `textColor` | `string` | 文字颜色（十六进制） |
| `fontSize` | `number` | 字体大小 |
| `fontWeight` | `string` | 字体粗细（如 `'bold'`、`'medium'`） |
| `backgroundColor` | `string` | 背景颜色 |
| `cornerRadius` | `number` | 圆角半径 |
| `padding` | `number` | 内边距 |

---

#### `text.update(config)`

同时更新文本内容和样式。

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `config.text` | `string` | 否 | 新的文本内容 |
| `config.style` | `object` | 否 | 新的样式配置 |

```javascript
label.update({
  text: '状态: 在线',
  style: { textColor: '#00FF00' }
});
```

---

#### `text.remove()`

从父容器中移除该文本元素。

---

### Button 按钮元素

`Button` 对象由 `addButton()` 返回，提供交互式按钮功能。

#### `btn.setTitle(title)`

设置按钮标题。

| 参数 | 类型 | 说明 |
|------|------|------|
| `title` | `string` | 按钮标题 |

---

#### `btn.setStyle(style)`

更新按钮样式。

| 字段 | 类型 | 说明 |
|------|------|------|
| `backgroundColor` | `string` | 背景颜色 |
| `textColor` | `string` | 文字颜色 |
| `fontSize` | `number` | 字体大小 |
| `cornerRadius` | `number` | 圆角半径 |
| `padding` | `number` | 内边距 |

---

#### `btn.onClick(callback)`

设置或更新按钮的点击回调函数。

| 参数 | 类型 | 说明 |
|------|------|------|
| `callback` | `function` | 点击回调函数 |

```javascript
btn.onClick(() => {
  console.log('按钮被点击');
  win.dismiss();
});
```

---

#### `btn.update(config)`

同时更新按钮标题和样式。

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `config.title` | `string` | 否 | 新的标题 |
| `config.style` | `object` | 否 | 新的样式配置 |

---

#### `btn.remove()`

从父容器中移除该按钮元素。

---

### Image 图片元素

`Image` 对象由 `addImage()` 返回，用于展示图片内容。

#### `img.setPath(path)`

从本地文件路径加载图片。

| 参数 | 类型 | 说明 |
|------|------|------|
| `path` | `string` | 图片文件路径 |

---

#### `img.setSize(width, height)`

设置图片显示尺寸。

| 参数 | 类型 | 说明 |
|------|------|------|
| `width` | `number` | 宽度 |
| `height` | `number` | 高度 |

---

#### `img.update(config)`

更新图片配置。

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `config.path` | `string` | 否 | 新的图片路径 |
| `config.width` | `number` | 否 | 新的宽度 |
| `config.height` | `number` | 否 | 新的高度 |

```javascript
img.update({ path: '/new/path.png', width: 64, height: 64 });
```

---

#### `img.remove()`

从父容器中移除该图片元素。

---

### Spacer 间距元素

`Spacer` 对象由 `addSpacer()` 返回，用于在元素之间创建空白间隔。

#### `spacer.setHeight(height)`

设置间距高度。

| 参数 | 类型 | 说明 |
|------|------|------|
| `height` | `number` | 高度值 |

---

#### `spacer.remove()`

从父容器中移除该间距元素。

---

### Loading 加载指示器

`Loading` 对象由 `addLoading()` 返回，用于显示加载动画。

#### `win.addLoading(config?)`

向窗口添加加载指示器。

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `config.style` | `string` | `'medium'` | 样式: `'large'` \| `'medium'` \| `'small'` |
| `config.color` | `string` | `'#FFFFFF'` | 指示器颜色 |
| `config.hidesWhenStopped` | `boolean` | `true` | 停止时是否隐藏 |
| `config.isAnimating` | `boolean` | `true` | 是否自动开始动画 |

**返回:** `Loading` — 加载指示器对象

```javascript
const loading = win.addLoading({
  style: 'large',
  color: '#007AFF'
});
```

---

#### `loading.start()`

开始加载动画。

```javascript
loading.start();
```

---

#### `loading.stop()`

停止加载动画。

```javascript
loading.stop();
```

---

#### `loading.isAnimating()`

检查是否正在动画。

**返回:** `boolean`

```javascript
if (loading.isAnimating()) {
  console.log('正在加载...');
}
```

---

#### `loading.setStyle(styleName)`

设置加载指示器样式。

| 参数 | 类型 | 说明 |
|------|------|------|
| `styleName` | `string` | 样式名: `'large'` \| `'medium'` \| `'small'` |

---

#### `loading.setColor(color)`

设置加载指示器颜色。

| 参数 | 类型 | 说明 |
|------|------|------|
| `color` | `string` | 颜色值（十六进制） |

---

#### `loading.remove()`

从父容器中移除该加载指示器。

---

### ScrollView 滚动视图

`ScrollView` 对象由 `addScrollView()` 返回，用于创建可滚动的内容区域。

#### `win.addScrollView(config?)`

向窗口添加滚动视图。

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `config.direction` | `string` | `'vertical'` | 滚动方向: `'vertical'` \| `'horizontal'` \| `'both'` |
| `config.width` | `number` | - | 视图宽度 |
| `config.height` | `number` | - | 视图高度 |
| `config.spacing` | `number` | `8` | 内容元素间距 |
| `config.showsHorizontalIndicator` | `boolean` | `true` | 显示水平滚动条 |
| `config.showsVerticalIndicator` | `boolean` | `true` | 显示垂直滚动条 |
| `config.isPagingEnabled` | `boolean` | `false` | 启用分页滚动 |
| `config.bounces` | `boolean` | `true` | 启用弹性效果 |

**返回:** `ScrollView` — 滚动视图对象

```javascript
const scroll = win.addScrollView({
  direction: 'vertical',
  height: 200,
  spacing: 10
});

// 添加内容
scroll.addText({ text: 'Item 1' });
scroll.addText({ text: 'Item 2' });
scroll.addText({ text: 'Item 3' });
```

---

#### `scroll.addText(config)` / `scroll.addButton(config)` / `scroll.addImage(config)`

向滚动视图添加元素。参数同 Window 的对应方法。

---

#### `scroll.addStack(config?)` / `scroll.addSpacer(config?)` / `scroll.addLoading(config?)`

向滚动视图添加容器和辅助元素。

---

#### `scroll.setDirection(direction)`

设置滚动方向。

| 参数 | 类型 | 说明 |
|------|------|------|
| `direction` | `string` | 方向: `'vertical'` \| `'horizontal'` \| `'both'` |

---

#### `scroll.setSpacing(spacing)`

设置内容元素间距。

| 参数 | 类型 | 说明 |
|------|------|------|
| `spacing` | `number` | 间距值 |

---

#### `scroll.scrollTo(x, y)`

滚动到指定位置。

| 参数 | 类型 | 说明 |
|------|------|------|
| `x` | `number` | X 偏移量 |
| `y` | `number` | Y 偏移量 |

---

#### `scroll.scrollToTop()` / `scroll.scrollToBottom()`

滚动到顶部或底部。

```javascript
scroll.scrollToTop();
// 或
scroll.scrollToBottom();
```

---

#### `scroll.getOffset()`

获取当前滚动偏移量。

**返回:** `{ x: number, y: number }`

```javascript
const offset = scroll.getOffset();
console.log(`当前滚动位置: (${offset.x}, ${offset.y})`);
```

---

#### `scroll.getContentSize()`

获取内容区域大小。

**返回:** `{ width: number, height: number }`

---

#### `scroll.onScroll(callback)`

设置滚动事件回调。

| 参数 | 类型 | 说明 |
|------|------|------|
| `callback` | `function` | 回调函数，参数为 `{ x, y }` 偏移量 |

```javascript
scroll.onScroll((offset) => {
  console.log('滚动到:', offset.x, offset.y);
});
```

---

#### `scroll.remove()`

从父容器中移除该滚动视图。

---

### List 列表视图

`List` 对象由 `addList()` 返回，用于显示数据列表或网格。基于 UICollectionView 实现，支持列表和网格两种布局。

#### `win.addList(config?)`

向窗口添加列表视图。

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `config.layout` | `string` | `'list'` | 布局模式: `'list'` \| `'grid'` |
| `config.width` | `number` | - | 视图宽度 |
| `config.height` | `number` | - | 视图高度 |
| `config.itemHeight` | `number` | `44` | 列表项高度 |
| `config.columns` | `number` | `2` | 网格列数（仅 grid 模式） |
| `config.separatorStyle` | `string` | `'line'` | 分隔线样式: `'none'` \| `'line'` |
| `config.items` | `array` | `[]` | 初始数据项 |

**返回:** `List` — 列表视图对象

**数据项格式:**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | `string` | 是 | 唯一标识符 |
| `title` | `string` | 否 | 标题文本 |
| `subtitle` | `string` | 否 | 副标题文本 |
| `icon` | `string` | 否 | 图标路径 |
| `systemIcon` | `string` | 否 | SF Symbol 图标名 |
| `accessory` | `string` | 否 | 右侧附件: `'none'` \| `'disclosure'` \| `'checkmark'` |

```javascript
const list = win.addList({
  layout: 'list',
  height: 300,
  itemHeight: 50,
  items: [
    { id: '1', title: '设置', systemIcon: 'gear', accessory: 'disclosure' },
    { id: '2', title: '通知', systemIcon: 'bell', subtitle: '已开启' },
    { id: '3', title: '关于', systemIcon: 'info.circle' }
  ]
});

list.onSelect((item, index) => {
  console.log('选中:', item.title);
});
```

---

#### `list.setItems(items)`

设置列表数据。

| 参数 | 类型 | 说明 |
|------|------|------|
| `items` | `array` | 数据项数组 |

```javascript
list.setItems([
  { id: '1', title: 'Apple' },
  { id: '2', title: 'Banana' },
  { id: '3', title: 'Cherry' }
]);
```

---

#### `list.addItem(item)`

添加单个数据项到末尾。

| 参数 | 类型 | 说明 |
|------|------|------|
| `item` | `object` | 数据项 |

---

#### `list.insertItem(item, index)`

在指定位置插入数据项。

| 参数 | 类型 | 说明 |
|------|------|------|
| `item` | `object` | 数据项 |
| `index` | `number` | 插入位置 |

---

#### `list.removeItem(index)`

移除指定位置的数据项。

| 参数 | 类型 | 说明 |
|------|------|------|
| `index` | `number` | 数据项索引 |

---

#### `list.removeAllItems()`

移除所有数据项。

---

#### `list.getItem(index)`

获取指定位置的数据项。

| 参数 | 类型 | 说明 |
|------|------|------|
| `index` | `number` | 数据项索引 |

**返回:** `object | null` — 数据项或 null

---

#### `list.getItemCount()`

获取数据项数量。

**返回:** `number`

---

#### `list.scrollToItem(index)`

滚动到指定数据项。

| 参数 | 类型 | 说明 |
|------|------|------|
| `index` | `number` | 数据项索引 |

---

#### `list.setLayout(layout)`

设置布局模式。

| 参数 | 类型 | 说明 |
|------|------|------|
| `layout` | `string` | 布局: `'list'` \| `'grid'` |

---

#### `list.setColumns(columns)`

设置网格列数（仅 grid 模式）。

| 参数 | 类型 | 说明 |
|------|------|------|
| `columns` | `number` | 列数 |

---

#### `list.setItemHeight(height)`

设置列表项高度。

| 参数 | 类型 | 说明 |
|------|------|------|
| `height` | `number` | 高度值 |

---

#### `list.setSeparatorStyle(style)`

设置分隔线样式。

| 参数 | 类型 | 说明 |
|------|------|------|
| `style` | `string` | 样式: `'none'` \| `'line'` |

---

#### `list.onSelect(callback)`

设置选中事件回调。

| 参数 | 类型 | 说明 |
|------|------|------|
| `callback` | `function` | 回调函数，参数为 `(item, index)` |

```javascript
list.onSelect((item, index) => {
  console.log(`选中第 ${index} 项: ${item.title}`);
});
```

---

#### `list.remove()`

从父容器中移除该列表视图。

---

## 样式配置

### 窗口样式 (Window Style)

在 `createWindow` 的 `style` 参数或 `setStyle()` 中使用：

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `backgroundColor` | `string` | 背景颜色，支持 RGBA 十六进制 | `'#000000CC'` |
| `textColor` | `string` | 默认文字颜色 | `'#FFFFFF'` |
| `fontSize` | `number` | 默认字体大小 | `14` |
| `fontWeight` | `string` | 默认字体粗细 | `'bold'` |
| `cornerRadius` | `number` | 圆角半径 | `12` |
| `padding` | `number` | 内边距 | `16` |
| `opacity` | `number` | 不透明度 (0-1) | `0.9` |
| `shadow` | `boolean` | 是否显示阴影 | `true` |

### 颜色格式

支持以下十六进制颜色格式：
- `#RGB` — 3 位简写，如 `#FFF`
- `#RRGGBB` — 6 位标准，如 `#FF5733`
- `#RRGGBBAA` — 8 位含透明度，如 `#000000CC`（CC = 80% 不透明）

### 常用透明度参考

| Alpha 值 | 不透明度 |
|-----------|----------|
| `FF` | 100% 完全不透明 |
| `F0` | 94% |
| `DD` | 87% |
| `CC` | 80% |
| `AA` | 67% |
| `88` | 53% |
| `66` | 40% |
| `44` | 27% |
| `22` | 13% |
| `00` | 0% 完全透明 |

---

## 完整示例

### 示例 1: 简单通知

创建一个自动消失的通知窗口：

```javascript
const win = hud.createWindow({
  width: 250,
  height: 60,
  autoClear: 3,
  style: {
    backgroundColor: '#000000DD',
    cornerRadius: 12
  }
});

win.addText({
  text: '操作成功！',
  style: { textColor: '#FFFFFF', fontSize: 16 }
});

win.show();
```

---

### 示例 2: 带按钮的交互窗口

创建一个带有确认和取消按钮的对话框：

```javascript
const win = hud.createWindow({
  width: 280,
  height: 120,
  draggable: true,
  style: {
    backgroundColor: '#1C1C1EF0',
    cornerRadius: 16
  }
});

win.addText({
  text: '确认删除？',
  style: { textColor: '#FFFFFF', fontSize: 18 }
});
win.addSpacer({ height: 16 });

const buttonStack = win.addStack({ axis: 'horizontal', spacing: 12 });

buttonStack.addButton({
  title: '取消',
  style: { backgroundColor: '#3A3A3C' },
  onClick: () => win.dismiss()
});

buttonStack.addButton({
  title: '删除',
  style: { backgroundColor: '#FF3B30' },
  onClick: () => {
    console.log('已删除');
    win.dismiss();
  }
});

win.show();
```

---

### 示例 3: 状态监控面板

创建一个可拖拽的实时状态监控面板：

```javascript
const screen = hud.getScreenSize();
const win = hud.createWindow({
  width: 180,
  height: 100,
  x: screen.width - 190,
  y: 50,
  draggable: true,
  style: {
    backgroundColor: '#000000CC',
    cornerRadius: 10
  }
});

const cpuText = win.addText({
  text: 'CPU: --',
  style: { textColor: '#00FF00', fontSize: 14 }
});
const memText = win.addText({
  text: 'MEM: --',
  style: { textColor: '#00FF00', fontSize: 14 }
});
const timeText = win.addText({
  text: 'TIME: --',
  style: { textColor: '#888888', fontSize: 12 }
});

win.show();

// 定时更新数据
setInterval(() => {
  const now = new Date();
  timeText.setText('TIME: ' + now.toLocaleTimeString());
  cpuText.setText('CPU: ' + Math.floor(Math.random() * 100) + '%');
  memText.setText('MEM: ' + Math.floor(Math.random() * 8000) + 'MB');
}, 1000);
```

---

### 示例 4: 带图标的信息卡片

使用堆栈布局和 SF Symbol 图标创建信息卡片：

```javascript
const win = hud.createWindow({
  width: 260,
  height: 80,
  draggable: true,
  style: {
    backgroundColor: '#1C1C1EF0',
    cornerRadius: 14
  }
});

const row = win.addStack({ axis: 'horizontal', spacing: 12, alignment: 'center' });

// 图标
row.addImage({ systemName: 'wifi', width: 28, height: 28 });

// 文字信息
const infoStack = row.addStack({ axis: 'vertical', spacing: 4 });
infoStack.addText({
  text: 'Wi-Fi 已连接',
  style: { textColor: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
});
infoStack.addText({
  text: 'MyNetwork-5G',
  style: { textColor: '#8E8E93', fontSize: 13 }
});

win.show();
```

---

### 示例 5: 多窗口管理

创建和管理多个窗口：

```javascript
// 创建多个窗口
const toast1 = hud.createWindow({
  width: 200, height: 50,
  x: 20, y: 100,
  autoClear: 5,
  style: { backgroundColor: '#34C759DD', cornerRadius: 10 }
});
toast1.addText({ text: '下载完成', style: { textColor: '#FFF' } });
toast1.show();

const toast2 = hud.createWindow({
  width: 200, height: 50,
  x: 20, y: 160,
  autoClear: 5,
  style: { backgroundColor: '#007AFFDD', cornerRadius: 10 }
});
toast2.addText({ text: '同步成功', style: { textColor: '#FFF' } });
toast2.show();

// 查看所有窗口
const allWindows = hud.getAllWindows();
console.log('当前窗口数量:', allWindows.length);

// 一键清除所有窗口
// hud.clearAll();
```

---

## 最佳实践

### 1. 合理设置 autoClear

对于通知类窗口，建议设置 `autoClear` 让窗口自动消失，避免长时间遮挡屏幕：

```javascript
const win = hud.createWindow({
  autoClear: 3, // 3 秒后自动消失
  // ...
});
```

### 2. 使用半透明背景

推荐使用带透明度的背景色，使浮窗不会完全遮挡下方内容：

```javascript
style: {
  backgroundColor: '#000000CC' // 80% 不透明的黑色
}
```

### 3. 使用 draggable 提升体验

对于需要长时间显示的面板（如监控面板），启用拖拽功能让用户可以自由移动：

```javascript
const win = hud.createWindow({
  draggable: true,
  // ...
});
```

### 4. 及时清理窗口

当窗口不再需要时，调用 `remove()` 销毁窗口，避免内存泄漏：

```javascript
// 单个窗口
win.remove();

// 清除所有窗口
hud.clearAll();
```

### 5. 屏幕适配

使用 `getScreenSize()` 获取屏幕信息，动态计算窗口位置，确保在不同设备上显示正确：

```javascript
const screen = hud.getScreenSize();
const win = hud.createWindow({
  width: 200,
  height: 80,
  x: (screen.width - 200) / 2,  // 水平居中
  y: screen.height - 150,        // 底部偏上
  // ...
});
```

### 6. 动态更新内容

保存元素引用以便后续更新，避免重复创建窗口：

```javascript
const statusText = win.addText({ text: '加载中...' });

// 后续更新
statusText.setText('加载完成！');
statusText.setStyle({ textColor: '#34C759' });
```
