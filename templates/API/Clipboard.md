# Clipboard 剪贴板

Clipboard 模块提供了剪贴板操作和输入框文本写入功能。你可以使用它来读取、写入和清空系统剪贴板内容，以及在键盘聚焦时直接操作输入框。

> **守护进程支持**: 完全支持。利用 `com.apple.TextInput` 和 `com.apple.TextInput.accessibility` 权限，所有方法在 Daemon 模式下均可用。

---

## 目录

- [快速开始](#快速开始)
- [API 参考](#api-参考)
  - [剪贴板操作](#剪贴板操作)
    - [clipboard.getText()](#clipboardgettext)
    - [clipboard.setText()](#clipboardsettext)
    - [clipboard.clear()](#clipboardclear)
    - [clipboard.hasText()](#clipboardhastext)
  - [输入框操作](#输入框操作)
    - [clipboard.insertText()](#clipboardinserttext)
    - [clipboard.deleteBackward()](#clipboarddeletebackward)
    - [clipboard.getInputText()](#clipboardgetinputtext)
    - [clipboard.setInputText()](#clipboardsetinputtext)
    - [clipboard.hasInputFocus()](#clipboardhasinputfocus)
- [完整示例](#完整示例)
- [最佳实践](#最佳实践)

---

## 快速开始

### 剪贴板基础操作

```javascript
// 读取剪贴板内容
const text = clipboard.getText();
console.log('剪贴板内容:', text);

// 写入剪贴板
clipboard.setText('Hello TrollScript!');

// 检查是否有文本
if (clipboard.hasText()) {
  console.log('剪贴板中有文本');
}

// 清空剪贴板
clipboard.clear();
```

### 输入框写入（键盘聚焦时）

```javascript
// 检查是否有输入框聚焦
if (clipboard.hasInputFocus()) {
  // 在光标位置插入文本
  clipboard.insertText('Hello!');

  // 读取输入框全部内容
  const inputText = clipboard.getInputText();
  console.log('输入框内容:', inputText);

  // 替换输入框全部内容
  clipboard.setInputText('新的内容');

  // 删除光标前 3 个字符
  clipboard.deleteBackward(3);
}
```

---

## API 参考

## 剪贴板操作

### `clipboard.getText()`

获取剪贴板中的文本内容。

**返回:** `string` — 剪贴板文本内容，如果没有文本则返回空字符串

```javascript
const text = clipboard.getText();
console.log('剪贴板内容:', text);

// 输出: 剪贴板内容: Hello World
```

**注意事项:**
- 在 App 模式下，直接使用 `UIPasteboard` 读取
- 在 Daemon 模式下，优先尝试直接读取（利用 `com.apple.Pasteboard.paste-unchecked` 权限），如果失败则回退到缓存机制
- 只能读取纯文本内容，不支持图片、文件等其他类型

---

### `clipboard.setText(text)`

将文本写入剪贴板。

**参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `text` | `string` | 是 | 要写入的文本内容 |

**返回:** `void`

```javascript
clipboard.setText('Hello TrollScript!');
console.log('文本已写入剪贴板');
```

**注意事项:**
- 会覆盖剪贴板中的现有内容
- Daemon 模式下使用 `com.apple.Pasteboard.paste-unchecked` 权限直接写入
- 写入后，其他应用可以立即读取到新内容

---

### `clipboard.clear()`

清空剪贴板内容。

**返回:** `void`

```javascript
clipboard.clear();
console.log('剪贴板已清空');
```

**注意事项:**
- 清空后，`clipboard.getText()` 将返回空字符串

---

### `clipboard.hasText()`

检查剪贴板中是否有文本内容。

**返回:** `boolean` — 如果有文本返回 `true`，否则返回 `false`

```javascript
if (clipboard.hasText()) {
  const text = clipboard.getText();
  console.log('剪贴板中有文本:', text);
} else {
  console.log('剪贴板为空');
}
```

---

## 完整示例

### 示例 1: 剪贴板内容转换

```javascript
// 读取剪贴板内容并转换为大写
const text = clipboard.getText();

if (text) {
  const upperText = text.toUpperCase();
  clipboard.setText(upperText);
  console.log('已将剪贴板内容转换为大写');
} else {
  console.log('剪贴板为空');
}
```

---

### 示例 2: URL 提取和处理

```javascript
// 从剪贴板中提取 URL
const text = clipboard.getText();
const urlRegex = /(https?:\/\/[^\s]+)/g;
const urls = text.match(urlRegex);

if (urls && urls.length > 0) {
  console.log('找到 URL:', urls);

  // 处理第一个 URL
  const firstUrl = urls[0];
  console.log('正在处理:', firstUrl);

  // 可以进行进一步处理，如发送 HTTP 请求
  const response = http.get(firstUrl);
  console.log('响应状态:', response.statusCode);
} else {
  console.log('剪贴板中没有找到 URL');
}
```

---

### 示例 3: 剪贴板历史记录

```javascript
// 保存剪贴板历史
function saveClipboardHistory() {
  const text = clipboard.getText();

  if (!text) {
    return;
  }

  // 读取历史记录
  const history = storage.read('clipboard_history') || [];

  // 避免重复
  if (history.length > 0 && history[0].text === text) {
    return;
  }

  // 添加新记录
  history.unshift({
    text: text,
    timestamp: new Date().toISOString()
  });

  // 只保留最近 50 条
  if (history.length > 50) {
    history.pop();
  }

  storage.write('clipboard_history', history);
  console.log('剪贴板历史已更新');
}

// 每 5 秒检查一次剪贴板变化
setInterval(saveClipboardHistory, 5000);
```

---

### 示例 4: 文本格式化工具

```javascript
// 剪贴板文本格式化工具
function formatClipboardText() {
  const text = clipboard.getText();

  if (!text) {
    console.log('剪贴板为空');
    return;
  }

  // 移除多余空格
  let formatted = text.replace(/\s+/g, ' ').trim();

  // 移除空行
  formatted = formatted.replace(/\n\s*\n/g, '\n');

  // 写回剪贴板
  clipboard.setText(formatted);

  console.log('文本已格式化');

  // 显示通知
  notification.send('格式化完成', '剪贴板文本已格式化');
}

formatClipboardText();
```

---

### 示例 5: 剪贴板内容加密

```javascript
// 简单的 Base64 加密/解密
function encryptClipboard() {
  const text = clipboard.getText();

  if (!text) {
    console.log('剪贴板为空');
    return;
  }

  // 检查是否已加密（Base64 格式）
  const isEncrypted = /^[A-Za-z0-9+/]+=*$/.test(text);

  if (isEncrypted) {
    // 解密
    try {
      const decrypted = util.base64Decode(text);
      clipboard.setText(decrypted);
      console.log('已解密');
      notification.send('解密成功', '剪贴板内容已解密');
    } catch (error) {
      console.error('解密失败:', error);
    }
  } else {
    // 加密
    const encrypted = util.base64Encode(text);
    clipboard.setText(encrypted);
    console.log('已加密');
    notification.send('加密成功', '剪贴板内容已加密');
  }
}

encryptClipboard();
```

---

### 示例 6: 剪贴板监控触发器

```javascript
// 监控剪贴板变化并自动处理
let lastClipboard = '';

function monitorClipboard() {
  const current = clipboard.getText();

  // 检查是否有变化
  if (current !== lastClipboard) {
    lastClipboard = current;

    console.log('剪贴板内容已变化:', current);

    // 自动处理特定内容
    if (current.startsWith('http://') || current.startsWith('https://')) {
      console.log('检测到 URL，正在处理...');
      // 处理 URL
      processUrl(current);
    } else if (/^\d{11}$/.test(current)) {
      console.log('检测到手机号码');
      // 处理手机号
      processPhoneNumber(current);
    } else if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(current)) {
      console.log('检测到邮箱地址');
      // 处理邮箱
      processEmail(current);
    }
  }
}

function processUrl(url) {
  notification.send('检测到 URL', url);
}

function processPhoneNumber(phone) {
  notification.send('检测到手机号', phone);
}

function processEmail(email) {
  notification.send('检测到邮箱', email);
}

// 每 2 秒检查一次
setInterval(monitorClipboard, 2000);
```

---

### 示例 7: 多语言翻译快捷工具

```javascript
// 剪贴板内容翻译（需要配合 HTTP 模块和翻译 API）
function translateClipboard() {
  const text = clipboard.getText();

  if (!text) {
    console.log('剪贴板为空');
    return;
  }

  console.log('正在翻译:', text);

  // 调用翻译 API（示例）
  try {
    const response = http.post('https://api.example.com/translate', {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text,
        from: 'auto',
        to: 'zh'
      })
    });

    if (response.statusCode === 200) {
      const result = JSON.parse(response.body);
      const translated = result.translation;

      // 将翻译结果写回剪贴板
      clipboard.setText(translated);

      notification.send('翻译完成', translated);

      console.log('翻译结果:', translated);
    } else {
      console.error('翻译失败:', response.statusCode);
    }
  } catch (error) {
    console.error('翻译出错:', error);
  }
}

translateClipboard();
```

---

---

## 最佳实践

### 1. 检查剪贴板是否为空

在处理剪贴板内容前，先检查是否有内容：

```javascript
// ✅ 正确
if (clipboard.hasText()) {
  const text = clipboard.getText();
  // 处理文本
} else {
  console.log('剪贴板为空');
}

// ❌ 错误 - 没有检查
const text = clipboard.getText();
const upper = text.toUpperCase();  // 如果为空会出错
```

### 2. 操作输入框前先检查聚焦状态

```javascript
// ✅ 正确 - 先检查再操作
if (clipboard.hasInputFocus()) {
  clipboard.insertText('安全插入');
}

// ❌ 错误 - 不检查直接操作
clipboard.insertText('可能失败');  // 无聚焦时返回 false 但无反馈
```

### 3. 避免频繁读写

剪贴板和输入框操作有一定开销，避免在循环中频繁调用：

```javascript
// ✅ 正确
const text = clipboard.getText();
for (let i = 0; i < 1000; i++) {
  // 使用 text 变量
  processText(text);
}

// ❌ 错误 - 频繁读取
for (let i = 0; i < 1000; i++) {
  const text = clipboard.getText();  // 不必要的重复调用
  processText(text);
}
```

### 4. 在 Daemon 模式下避免死循环

在剪贴板触发器中修改剪贴板时要小心：

```javascript
// ✅ 正确 - 模块会自动处理
clipboard.setText('processed: ' + text);

// ⚠️ 注意 - 在剪贴板触发器中修改剪贴板
// 模块已经内置了防死循环机制，但仍需谨慎使用
```

### 5. 处理特殊字符

剪贴板内容可能包含特殊字符，需要适当处理：

```javascript
// ✅ 正确
const text = clipboard.getText();
const escaped = text.replace(/[<>&"']/g, (char) => {
  const escapeMap = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return escapeMap[char];
});
```

### 6. 保护用户隐私

不要记录敏感的剪贴板内容：

```javascript
// ✅ 正确 - 过滤敏感信息
function logClipboard() {
  const text = clipboard.getText();

  // 检查是否包含敏感信息
  if (text.includes('password') || text.includes('密码')) {
    console.log('剪贴板包含敏感信息，不记录');
    return;
  }

  console.log('剪贴板内容:', text);
}

// ❌ 错误 - 无条件记录
const text = clipboard.getText();
console.log('剪贴板:', text);  // 可能泄露密码等敏感信息
```


## 注意事项

1. **权限要求**: 剪贴板读写利用 `com.apple.Pasteboard.paste-unchecked` 和 `com.apple.Pasteboard.background-access` 权限；输入框操作利用 `com.apple.TextInput` 和 `com.apple.TextInput.accessibility` 权限
2. **Daemon 模式**: 完全支持。剪贴板读取优先尝试直接访问，回退到缓存机制
3. **内容类型**: 剪贴板操作只支持纯文本，不支持图片、文件等其他类型
4. **死循环防护**: 在剪贴板触发器中修改剪贴板时，模块会自动标记避免死循环
5. **性能影响**: 操作开销较小，但仍应避免过于频繁的调用
6. **跨应用**: 剪贴板内容在所有应用间共享，修改后其他应用可以立即看到
7**线程安全**: 输入框操作会自动调度到主线程执行，在 Daemon 模式下使用 `MainThreadHelper` 防止死锁
