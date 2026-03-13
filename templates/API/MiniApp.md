# MiniApp 迷你应用

MiniApp 模块提供了创建全屏交互式应用的能力。基于现有 HUD 元素系统，你可以使用它来构建多页面应用，支持导航、文本输入、生命周期钩子等完整的应用体验。

> **守护进程支持**: 完全支持。MiniApp 在脚本运行期间以 fullScreenCover 方式呈现，JS 引擎通过 ActiveBridgeManager 保持存活。

---

## 目录

- [快速开始](#快速开始)
- [API 参考](#api-参考)
  - [MiniApp 应用对象](#miniapp-应用对象)
  - [MiniAppPage 页面对象](#miniapppage-页面对象)
  - [页面元素方法](#页面元素方法)
  - [生命周期钩子](#生命周期钩子)
  - [提示与对话框](#提示与对话框)
- [元素类型](#元素类型)
- [完整示例](#完整示例)
- [最佳实践](#最佳实践)
- [注意事项](#注意事项)

---

## 快速开始

创建一个简单的 MiniApp 只需要四步：

```javascript
// 1. 创建应用（自动包含根页面）
const app = new MiniApp({ title: '我的应用' });

// 2. 在根页面上添加内容
app.rootPage.addText({
  text: 'Hello MiniApp!',
  style: { fontSize: 24, textColor: '#333333', textAlign: 'center' }
});

app.rootPage.addButton({
  text: '点击我',
  style: { backgroundColor: '#007AFF', textColor: '#FFFFFF', cornerRadius: 8 },
  onClick: function() {
    console.log('按钮被点击了！');
  }
});

// 3. 注册生命周期
app.onReady(function() {
  console.log('MiniApp 已就绪');
});

// 4. 呈现应用
app.present();
```

---

## API 参考

### MiniApp 应用对象

#### `new MiniApp(config)`

创建一个 MiniApp 实例。自动创建根页面并初始化导航栈。

**参数:**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `config` | `object` | 否 | 应用配置对象 |

**config 配置项:**

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | `''` | 根页面导航栏标题 |
| `backgroundColor` | `string` | 系统默认 | 根页面背景色（hex 格式） |

**返回:** `MiniApp` 实例

```javascript
// 基础创建
const app = new MiniApp();

// 带配置创建
const app = new MiniApp({
  title: '设置',
  backgroundColor: '#F2F2F7'
});

// 根页面可直接使用
app.rootPage.addText({ text: '欢迎' });
```

**实例属性:**

| 属性 | 类型 | 说明 |
|------|------|------|
| `rootPage` | `MiniAppPage` | 根页面对象，创建时自动生成 |

---

#### `app.present()`

呈现 MiniApp（以 fullScreenCover 方式覆盖当前界面）。

```javascript
const app = new MiniApp({ title: '我的应用' });
// ... 添加内容 ...
app.present();
```

> 调用 `present()` 后 MiniApp 会以全屏覆盖方式显示。用户可通过根页面左上角的关闭按钮退出。

---

#### `app.pushPage(page)`

将新页面推入导航栈（带动画）。

**参数:**

| 参数 | 类型 | 说明 |
|------|------|------|
| `page` | `MiniAppPage` | 要推入的页面实例 |

```javascript
const detailPage = new MiniAppPage('详情');
detailPage.addText({ text: '这是详情页' });
app.pushPage(detailPage);
```

> 推入的子页面自动显示返回按钮（标准 iOS 导航样式）。

---

#### `app.popPage()`

弹出当前页面，返回上一页。

```javascript
app.popPage();
```

> 如果当前已经是根页面，则不会执行任何操作。弹出的页面资源会被自动清理。

---

#### `app.popToRoot()`

弹出所有子页面，返回根页面。

```javascript
app.popToRoot();
```

---

#### `app.close()`

关闭并销毁 MiniApp。触发 `onDestroy` 回调后清理所有资源。

```javascript
app.close();
```

> 关闭后所有页面元素、回调、注册表记录均被清理。JS 引擎在无活跃 MiniApp 时也会被释放。

---

### 生命周期钩子

MiniApp 提供四个生命周期钩子，回调通过 JSCallbackManager 在 JSExecutionQueue 上安全执行。

#### `app.onReady(callback)`

MiniApp 首次显示时触发（仅触发一次）。

```javascript
app.onReady(function() {
  console.log('应用已准备就绪');
  // 适合做初始数据加载
});
```

---

#### `app.onShow(callback)`

MiniApp 每次变为可见时触发（包括首次显示）。

```javascript
app.onShow(function() {
  console.log('应用进入前台');
  // 适合刷新数据
});
```

---

#### `app.onHide(callback)`

MiniApp 每次被隐藏时触发。

```javascript
app.onHide(function() {
  console.log('应用进入后台');
  // 适合暂停定时器等
});
```

---

#### `app.onDestroy(callback)`

MiniApp 关闭时触发（在资源清理之前）。

```javascript
app.onDestroy(function() {
  console.log('应用即将销毁');
  // 适合保存数据、释放资源
});
```

---

### 提示与对话框

MiniApp 内置了提示/确认/Toast，便于在页面内直接反馈。

#### `app.alert(title, message, onOk?)`

显示提示对话框（单按钮）。

```javascript
app.alert('提示', '操作完成', function() {
  console.log('用户点击了确定');
});
// 也可省略 title: app.alert('操作完成', callback)
```

---

#### `app.confirm(title, message, onConfirm?, onCancel?)`

显示确认对话框（确认/取消）。

```javascript
app.confirm('删除', '确认删除该条记录？', function() {
  console.log('已确认');
}, function() {
  console.log('已取消');
});
```

---

#### `app.dialog(title, message, onConfirm?, onCancel?)`

`confirm` 的别名，便于语义化调用。

---

#### `app.toast(message, duration?)`

显示 Toast 提示。

```javascript
app.toast('保存成功');
app.toast('网络较慢，请稍候…', 3);
```

---

### MiniAppPage 页面对象

#### `new MiniAppPage(title)`

创建一个新的页面实例。页面创建后需通过 `app.pushPage()` 添加到导航栈。

**参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | `string` | 否 | 页面导航栏标题 |

```javascript
const page = new MiniAppPage('设置页');
```

> 页面在被 `pushPage` 之前处于未挂载状态，此时调用 `addXxx` 方法不会生效。

---

#### `page.setTitle(title)`

动态设置页面标题。

```javascript
page.setTitle('新标题');
```

---

#### `page.setBackgroundColor(color)`

设置页面背景颜色。

**参数:**

| 参数 | 类型 | 说明 |
|------|------|------|
| `color` | `string` | hex 颜色字符串（如 `'#F2F2F7'`、`'#FF0000CC'`） |

```javascript
page.setBackgroundColor('#F2F2F7');
```

---

### 页面元素方法

MiniApp 页面复用 HUD 元素系统。所有 `addXxx` 方法返回对应的 HUD 元素对象，可直接调用 HUD 元素的方法（如 `setText`、`setColor`、`onClick` 等）。

#### `page.addText(config)`

添加文本元素。**返回:** HUD Text 元素对象

```javascript
const label = page.addText({
  text: '标题文字',
  style: {
    fontSize: 20,
    textColor: '#000000',
    textAlign: 'center',
    padding: { top: 16, bottom: 8, left: 16, right: 16 }
  }
});

// 后续可修改
label.setText('新文字');
label.setColor('#FF0000');
```

---

#### `page.addButton(config)`

添加按钮元素。**返回:** HUD Button 元素对象

```javascript
const btn = page.addButton({
  text: '提交',
  style: {
    backgroundColor: '#007AFF',
    textColor: '#FFFFFF',
    fontSize: 17,
    cornerRadius: 10,
    height: 50,
    margin: { top: 16, left: 16, right: 16 }
  },
  onClick: function() {
    console.log('按钮点击');
  }
});

// 后续修改
btn.setText('已提交');
btn.setEnabled(false);
```

---

#### `page.addTextField(config)`

添加文本输入框。**返回:** HUD TextField 元素对象

**config 配置项:**

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `placeholder` | `string` | `''` | 占位符文本 |
| `text` | `string` | `''` | 初始文本 |
| `keyboardType` | `string` | `'default'` | 键盘类型: `default` / `numberPad` / `emailAddress` / `URL` / `phonePad` |
| `isSecure` | `boolean` | `false` | 是否密码输入（显示圆点） |
| `returnKeyType` | `string` | `'done'` | 回车键类型: `done` / `search` / `next` / `go` |

```javascript
const nameField = page.addTextField({
  placeholder: '请输入用户名',
  keyboardType: 'default',
  returnKeyType: 'next'
});

// 监听文本变化
nameField.onChange(function(text) {
  console.log('输入: ' + text);
});

// 监听回车
nameField.onSubmit(function(text) {
  console.log('提交: ' + text);
});

// 获取/设置文本
const value = nameField.getText();
nameField.setText('预填文字');
```

---

#### `page.addImage(config)`

添加图片元素。**返回:** HUD Image 元素对象

```javascript
const img = page.addImage({
  url: 'https://example.com/avatar.png',
  style: {
    width: 80,
    height: 80,
    cornerRadius: 40
  }
});
```

---

#### `page.addStack(config)`

添加堆栈容器（可嵌套其他元素）。**返回:** HUD Stack 元素对象

**config 配置项:**

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `axis` | `string` | `'vertical'` | 排列方向: `vertical` / `horizontal` |
| `spacing` | `number` | `0` | 子元素间距 |
| `alignment` | `string` | `'fill'` | 对齐方式: `fill` / `leading` / `center` / `trailing` |

```javascript
// 创建水平布局
const row = page.addStack({
  axis: 'horizontal',
  spacing: 12,
  style: {
    padding: { top: 16, left: 16, right: 16 }
  }
});

// 在容器内添加子元素
row.addText({ text: '标签:', style: { fontSize: 16 } });
row.addText({ text: '值', style: { fontSize: 16, textColor: '#888888' } });
```

> 容器元素（Stack、ScrollView、List）的 `addXxx` 方法会将子元素添加到容器内部，而非页面根层级。

---

#### `page.addSpacer(config)`

添加间距元素。**返回:** HUD Spacer 元素对象

```javascript
page.addSpacer({ style: { height: 20 } });
```

---

#### `page.addScrollView(config)`

添加滚动视图容器。**返回:** HUD ScrollView 元素对象

```javascript
const scroll = page.addScrollView({
  style: { height: 300 }
});

// 在滚动视图内添加大量内容
for (let i = 0; i < 20; i++) {
  scroll.addText({ text: '第 ' + (i + 1) + ' 行' });
}
```

---

#### `page.addList(config)`

添加列表容器。**返回:** HUD List 元素对象

```javascript
const list = page.addList();
list.addText({ text: '列表项 1' });
list.addText({ text: '列表项 2' });
list.addText({ text: '列表项 3' });
```

---

## 元素类型

MiniApp 支持以下元素类型（与 HUD 系统完全一致）：

| 方法 | 元素类型 | 说明 |
|------|----------|------|
| `addText` | Text | 文本标签 |
| `addButton` | Button | 可点击按钮 |
| `addTextField` | TextField | 文本输入框 |
| `addImage` | Image | 图片 |
| `addStack` | Stack | 堆栈容器（可嵌套） |
| `addSpacer` | Spacer | 间距 |
| `addScrollView` | ScrollView | 滚动视图容器（可嵌套） |
| `addList` | List | 列表容器（可嵌套） |
| `addLoading` | Loading | 加载指示器 |
| `addWebView` | WebView | 内嵌网页视图 |

> 所有元素返回的对象均继承对应 HUD 元素的原型方法。详细方法列表请参考 [HUD 文档](./HUD.md)。

---

## 完整示例

### 示例 1: 登录表单

```javascript
const app = new MiniApp({ title: '登录' });
const page = app.rootPage;

page.setBackgroundColor('#F2F2F7');

// 标题
page.addSpacer({ style: { height: 60 } });
page.addText({
  text: 'TrollScript',
  style: { fontSize: 32, textColor: '#007AFF', textAlign: 'center' }
});
page.addSpacer({ style: { height: 40 } });

// 输入框容器
const formStack = page.addStack({
  axis: 'vertical',
  spacing: 12,
  style: {
    backgroundColor: '#FFFFFF',
    cornerRadius: 12,
    margin: { left: 20, right: 20 },
    padding: { top: 4, bottom: 4, left: 16, right: 16 }
  }
});

const usernameField = formStack.addTextField({
  placeholder: '用户名',
  returnKeyType: 'next'
});

formStack.addSpacer({ style: { height: 1, backgroundColor: '#E5E5EA' } });

const passwordField = formStack.addTextField({
  placeholder: '密码',
  isSecure: true,
  returnKeyType: 'done'
});

page.addSpacer({ style: { height: 24 } });

// 登录按钮
page.addButton({
  text: '登录',
  style: {
    backgroundColor: '#007AFF',
    textColor: '#FFFFFF',
    fontSize: 17,
    cornerRadius: 12,
    height: 50,
    margin: { left: 20, right: 20 }
  },
  onClick: function() {
    const username = usernameField.getText();
    const password = passwordField.getText();
    app.confirm('登录确认', '确认登录用户 ' + username + ' ?', function() {
      app.toast('正在登录...', 1.5);
      console.log('登录: ' + username + ' / ' + (password ? '***' : ''));
      app.alert('已提交', '请稍候');
    }, function() {
      app.toast('已取消', 1.2);
    });
  }
});

app.present();
```

### 示例 2: 对话框与 Toast

```javascript
const app = new MiniApp({ title: '提示演示' });
const page = app.rootPage;

page.addText({
  text: '点击按钮体验提示',
  style: { fontSize: 18, textAlign: 'center', padding: { top: 24 } }
});

page.addButton({
  text: '显示 Alert',
  style: { height: 44, margin: { top: 16, left: 20, right: 20 } },
  onClick: function() {
    app.alert('提示', '操作完成');
  }
});

page.addButton({
  text: '显示 Confirm',
  style: { height: 44, margin: { top: 12, left: 20, right: 20 } },
  onClick: function() {
    app.confirm('删除', '确认删除该条记录？', function() {
      app.toast('已删除', 1.5);
    }, function() {
      app.toast('已取消', 1.2);
    });
  }
});

page.addButton({
  text: '显示 Toast',
  style: { height: 44, margin: { top: 12, left: 20, right: 20 } },
  onClick: function() {
    app.toast('保存成功');
  }
});

app.present();
```

### 示例 3: 多页面导航

```javascript
const app = new MiniApp({ title: '设置' });

// 根页面 - 设置列表
const rootPage = app.rootPage;
rootPage.setBackgroundColor('#F2F2F7');

function addSettingRow(parentPage, label, detail, onTap) {
  const row = parentPage.addStack({
    axis: 'horizontal',
    style: {
      backgroundColor: '#FFFFFF',
      height: 50,
      padding: { left: 16, right: 16 }
    },
    onClick: onTap
  });
  row.addText({ text: label, style: { fontSize: 17 } });
  row.addSpacer({});
  row.addText({ text: detail, style: { fontSize: 17, textColor: '#8E8E93' } });
}

addSettingRow(rootPage, '通知', '已开启', function() {
  // 推入通知设置页
  const notifPage = new MiniAppPage('通知设置');
  notifPage.addText({ text: '通知偏好设置', style: { fontSize: 20, padding: { top: 20, left: 16 } } });
  notifPage.addText({ text: '在这里管理通知', style: { fontSize: 15, textColor: '#888', padding: { left: 16 } } });
  app.pushPage(notifPage);
});

addSettingRow(rootPage, '主题', '跟随系统', function() {
  var themePage = new MiniAppPage('主题设置');
  themePage.addButton({
    text: '浅色模式',
    style: { height: 50, margin: { top: 20, left: 16, right: 16 } },
    onClick: function() { console.log('选择浅色'); }
  });
  themePage.addButton({
    text: '深色模式',
    style: { height: 50, margin: { top: 8, left: 16, right: 16 } },
    onClick: function() { console.log('选择深色'); }
  });
  app.pushPage(themePage);
});

addSettingRow(rootPage, '关于', 'v1.0.0', function() {
  var aboutPage = new MiniAppPage('关于');
  aboutPage.addText({
    text: 'TrollScript MiniApp\nVersion 1.0.0',
    style: { fontSize: 16, textColor: '#666666', textAlign: 'center', padding: { top: 40 } }
  });
  app.pushPage(aboutPage);
});

app.present();
```

### 示例 3: 生命周期管理

```javascript
const app = new MiniApp({ title: '生命周期演示' });
const statusLabel = app.rootPage.addText({
  text: '等待中...',
  style: { fontSize: 18, textAlign: 'center', padding: { top: 40 } }
});

let showCount = 0;

app.onReady(function() {
  statusLabel.setText('应用已就绪');
  console.log('[Lifecycle] onReady');
});

app.onShow(function() {
  showCount++;
  statusLabel.setText('显示次数: ' + showCount);
  console.log('[Lifecycle] onShow #' + showCount);
});

app.onHide(function() {
  console.log('[Lifecycle] onHide');
});

app.onDestroy(function() {
  console.log('[Lifecycle] onDestroy - 清理资源');
});

app.rootPage.addButton({
  text: '关闭应用',
  style: {
    backgroundColor: '#FF3B30',
    textColor: '#FFFFFF',
    cornerRadius: 8,
    height: 44,
    margin: { top: 20, left: 20, right: 20 }
  },
  onClick: function() {
    app.close();
  }
});

app.present();
```

### 示例 4: 嵌套容器布局

```javascript
const app = new MiniApp({ title: '布局演示' });
const page = app.rootPage;

// 卡片容器
const card = page.addStack({
  axis: 'vertical',
  spacing: 8,
  style: {
    backgroundColor: '#FFFFFF',
    cornerRadius: 16,
    margin: { top: 20, left: 16, right: 16 },
    padding: { top: 16, bottom: 16, left: 16, right: 16 }
  }
});

// 头部行（水平布局）
const header = card.addStack({
  axis: 'horizontal',
  spacing: 12
});
header.addImage({
  url: 'https://example.com/avatar.png',
  style: { width: 48, height: 48, cornerRadius: 24 }
});
const headerText = header.addStack({ axis: 'vertical', spacing: 2 });
headerText.addText({ text: '用户名', style: { fontSize: 17 } });
headerText.addText({ text: '这是一段简介', style: { fontSize: 14, textColor: '#8E8E93' } });

// 分割线
card.addSpacer({ style: { height: 1, backgroundColor: '#E5E5EA' } });

// 内容
card.addText({
  text: '这是一个使用嵌套 Stack 构建的卡片布局示例。Stack 可以嵌套使用，通过 horizontal 和 vertical 方向组合实现复杂布局。',
  style: { fontSize: 15, textColor: '#333333' }
});

app.present();
```

### 示例 5: 圆角 + 透明 + 阴影样式

```javascript
const app = new MiniApp({ title: '样式演示' });
const page = app.rootPage;

const header = page.addStack({ axis: 'horizontal', spacing: 8, alignment: 'center' });
header.setStyle({
  backgroundColor: '#1C1C1EF0',
  cornerRadius: 12,
  padding: 12,
  shadow: true
});

const icon = header.addImage({ systemName: 'sparkles', width: 26, height: 26 });
icon.setStyle({ cornerRadius: 6, shadow: true });

header.addText({
  text: 'MiniApp Header',
  style: { textColor: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
});

app.present();
```

---

## 最佳实践

### 1. 在 present 之前构建页面

```javascript
// 正确 - 先构建，再呈现
const app = new MiniApp({ title: '我的应用' });
app.rootPage.addText({ text: '内容' });
app.present();

// 不推荐 - present 后再添加元素可能导致布局闪烁
const app2 = new MiniApp({ title: '我的应用' });
app2.present();
app2.rootPage.addText({ text: '内容' }); // 会闪烁
```

### 2. 使用 onReady 做初始化

```javascript
// 正确 - 在 onReady 中加载数据
app.onReady(function() {
  const data = http.get('https://api.example.com/data');
  label.setText(data.result);
});
```

### 3. 在 onDestroy 中保存状态

```javascript
app.onDestroy(function() {
  storage.set('lastInput', textField.getText());
});
```

### 4. 页面推入后再添加内容

```javascript
// 正确 - pushPage 后 page 才有 _pageId
const page = new MiniAppPage('详情');
app.pushPage(page);
page.addText({ text: '内容' }); // 此时 page 已挂载

// 错误 - pushPage 之前 addXxx 不会生效
const page2 = new MiniAppPage('详情');
page2.addText({ text: '内容' }); // _pageId 为 null，不生效
app.pushPage(page2);
```

### 5. 使用容器组织布局

```javascript
// 推荐 - 用 Stack 组织元素
const row = page.addStack({ axis: 'horizontal', spacing: 8 });
row.addText({ text: '标签' });
row.addButton({ text: '操作' });

// 不推荐 - 所有元素堆在页面根级别
page.addText({ text: '标签' });
page.addButton({ text: '操作' }); // 无法水平排列
```

---

## 注意事项

1. **实例限制**: 最多同时存在 3 个 MiniApp 实例。超出时最旧的实例会被自动清理（LRU 策略）
2. **页面挂载**: `new MiniAppPage()` 创建的页面必须通过 `pushPage()` 挂载后才能添加元素
3. **根页面**: `app.rootPage` 在创建时自动挂载，可以立即使用 `addXxx`
4. **关闭按钮**: 根页面左上角自动显示关闭按钮，子页面自动显示返回按钮
5. **资源清理**: 页面弹出或 MiniApp 关闭时，所有元素和回调会自动清理，无需手动释放
6. **回调线程**: 所有回调（onClick、onChange、onSubmit、生命周期）在 JSExecutionQueue 上执行，线程安全
7. **键盘适配**: TextField 获取焦点时页面自动调整滚动位置，不会被键盘遮挡
8. **元素方法**: 所有 `addXxx` 返回的对象可调用对应 HUD 元素的全部方法，参考 [HUD 文档](./HUD.md)
9. **容器嵌套**: Stack、ScrollView、List 可以任意嵌套，子元素通过容器的 `addXxx` 方法添加
10. **导航栈**: `popPage()` 在根页面时不会执行任何操作。`popToRoot()` 会清理所有中间页面
