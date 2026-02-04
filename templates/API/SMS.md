# SMS 短信管理

SMS 模块提供了短信读取和管理功能。你可以使用它来读取短信、搜索短信、提取验证码等。

> **守护进程支持**: 完全支持。在触发器模式下可正常运行。
>
> **重要提示**: 读取真实短信数据需要 **Root 权限**（TrollStore）。如果没有权限，模块会返回模拟数据用于测试。

---

## 快速开始

```javascript
// 读取最近的短信
const messages = sms.read(20);
messages.forEach(msg => {
  console.log(`${msg.address}: ${msg.text}`);
});
```

---

## API 参考

### 读取短信

#### `sms.read(limit?)`
读取短信列表。**参数:** `limit` (number, 可选，默认 100) **返回:** `Message[]`

**Message 对象结构:**
```javascript
 {
    id: number,              // 短信 ID
    guid: string,            // 短信 GUID
    address: string,         // 发件人/收件人号码
    text: string,            // 短信内容
    date: string,            // 日期时间
    dateRead?: string,       // 已读时间
    isFromMe: boolean,       // 是否为自己发送的短信
    isRead: boolean,         // 是否已读
    service: string,         // 服务类型（SMS/iMessage/unknown）
    hasAttachments: boolean, // 是否有附件
    chatIdentifier?: string, // 聊天标识符（可选）
    simCard?: string,        // SIM 卡信息（可选）
    account?: string,        // 账户信息（可选）
    accountGuid?: string,    // 账户 GUID（可选）
  }
```

```javascript
// 读取最近 50 条短信
const messages = sms.read(50);
messages.forEach(msg => {
  const time = util.formatDate(msg.date, 'yyyy-MM-dd HH:mm');
  console.log(`[${time}] ${msg.address}: ${msg.text}`);
});
```

#### `sms.getLatest(count?)`
获取最新的短信。**参数:** `count` (number, 可选，默认 10) **返回:** `Message[]`

```javascript
const latest = sms.getLatest(5);
console.log('最新 5 条短信:', latest);
```

#### `sms.getUnread(limit?)`
获取未读短信。**参数:** `limit` (number, 可选，默认 100) **返回:** `Message[]`

```javascript
const unread = sms.getUnread();
if (unread.length > 0) {
  console.log(`有 ${unread.length} 条未读短信`);
  notification.send('未读短信', `您有 ${unread.length} 条未读短信`);
}
```

---

### 搜索短信

#### `sms.search(keyword, limit?)`
搜索包含关键词的短信。**参数:** `keyword` (string), `limit` (number, 可选，默认 100) **返回:** `Message[]`

```javascript
// 搜索包含"验证码"的短信
const results = sms.search('验证码', 20);
console.log(`找到 ${results.length} 条相关短信`);
```

#### `sms.getByAddress(address, limit?)`
获取指定号码的短信。**参数:** `address` (string), `limit` (number, 可选，默认 100) **返回:** `Message[]`

```javascript
// 获取某个号码的所有短信
const messages = sms.getByAddress('10086', 50);
console.log(`与 10086 的短信记录: ${messages.length} 条`);
```

---

### 聊天管理

#### `sms.getChats()`
获取短信聊天列表。**返回:** `Chat[]`

**Chat 对象结构:**
```javascript
{
  address: string,         // 联系人号码
  lastMessage: string,     // 最后一条消息
  lastDate: number,        // 最后消息时间戳
  unreadCount: number,     // 未读数量
  messageCount: number     // 总消息数
}
```

```javascript
const chats = sms.getChats();
chats.forEach(chat => {
  console.log(`${chat.address}: ${chat.messageCount} 条消息, ${chat.unreadCount} 条未读`);
});
```

---

### 统计信息

#### `sms.getStatistics()`
获取短信统计信息。**返回:** `{ totalMessages, unreadCount, chatCount, isMockData }`

```javascript
const stats = sms.getStatistics();
console.log('=== 短信统计 ===');
console.log(`总消息数: ${stats.totalMessages}`);
console.log(`未读消息: ${stats.unreadCount}`);
console.log(`聊天数量: ${stats.chatCount}`);
console.log(`数据类型: ${stats.isMockData ? '模拟' : '真实'}`);
```

---

### Root Helper 方法

#### `sms.helperAvailable()`
检查 Root Helper 是否可用。**返回:** `boolean`

#### `sms.helperCheck()`
检查短信数据库文件是否存在。**返回:** `boolean`

#### `sms.helperCopy()`
使用 Root Helper 复制短信数据库。**返回:** `boolean`

#### `sms.helperList()`
列出短信数据库目录内容。**返回:** `string[]`

```javascript
if (sms.helperAvailable()) {
  console.log('Root Helper 可用');

  if (sms.helperCheck()) {
    console.log('短信数据库存在');
    const success = sms.helperCopy();
    if (success) {
      console.log('数据库复制成功');
    }
  }
}
```

---

## 完整示例

### 示例 1: 短信备份

```javascript
function backupMessages() {
  if (!sms.isRealDataAvailable()) {
    console.log('无法访问真实短信数据');
    return;
  }

  const messages = sms.read(1000);
  const backup = {
    exportDate: Date.now(),
    totalCount: messages.length,
    messages: messages.map(msg => ({
      from: msg.address,
      content: msg.text,
      date: util.formatDate(msg.date, 'yyyy-MM-dd HH:mm:ss'),
      isRead: msg.isRead
    }))
  };

  const json = JSON.stringify(backup, null, 2);
  const filename = `sms_backup_${util.formatDate(Date.now(), 'yyyyMMdd')}.json`;
  const path = file.documentsPath() + '/' + filename;

  file.write(path, json);
  console.log(`已备份 ${messages.length} 条短信到 ${filename}`);
  notification.send('备份完成', `已备份 ${messages.length} 条短信`);
}

backupMessages();
```

### 示例 2: 短信统计分析

```javascript
function analyzeMessages() {
  const messages = sms.read(500);

  // 按发件人统计
  const senderStats = {};
  messages.forEach(msg => {
    if (!senderStats[msg.address]) {
      senderStats[msg.address] = 0;
    }
    senderStats[msg.address]++;
  });

  // 排序
  const sorted = Object.entries(senderStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  console.log('=== 短信来源 TOP 10 ===');
  sorted.forEach(([address, count], index) => {
    console.log(`${index + 1}. ${address}: ${count} 条`);
  });

  // 按日期统计
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTimestamp = today.getTime();

  const todayCount = messages.filter(msg => msg.date >= todayTimestamp).length;
  const weekCount = messages.filter(msg => msg.date >= todayTimestamp - 7 * 24 * 60 * 60 * 1000).length;

  console.log('\n=== 时间统计 ===');
  console.log(`今天: ${todayCount} 条`);
  console.log(`本周: ${weekCount} 条`);
  console.log(`总计: ${messages.length} 条`);
}

analyzeMessages();
```

### 示例 3: 未读短信提醒

```javascript
function checkUnreadMessages() {
  const unread = sms.getUnread();

  if (unread.length === 0) {
    console.log('没有未读短信');
    return;
  }

  console.log(`有 ${unread.length} 条未读短信:`);

  unread.forEach((msg, index) => {
    const time = util.formatDate(msg.date, 'HH:mm');
    console.log(`${index + 1}. [${time}] ${msg.address}: ${msg.text.substring(0, 30)}...`);
  });

  // 发送通知
  if (unread.length === 1) {
    const msg = unread[0];
    notification.send(msg.address, msg.text);
  } else {
    notification.send('未读短信', `您有 ${unread.length} 条未读短信`);
  }

  haptic.notification('warning');
}

checkUnreadMessages();
```

### 示例 4: 验证码历史记录

```javascript
function getVerificationCodeHistory() {
  const messages = sms.read(200);

  // 验证码正则
  const codePattern = /\b\d{4,8}\b/;

  const codes = [];
  messages.forEach(msg => {
    const match = msg.text.match(codePattern);
    if (match && (
      msg.text.includes('验证码') ||
      msg.text.includes('code') ||
      msg.text.includes('Code')
    )) {
      codes.push({
        code: match[0],
        from: msg.address,
        date: msg.date,
        text: msg.text
      });
    }
  });

  console.log(`找到 ${codes.length} 条验证码短信:`);
  codes.slice(0, 10).forEach((item, index) => {
    const time = util.formatDate(item.date, 'MM-dd HH:mm');
    console.log(`${index + 1}. [${time}] ${item.from}: ${item.code}`);
  });

  return codes;
}

const history = getVerificationCodeHistory();
```

### 示例 5: 聊天记录导出

```javascript
function exportChat(address) {
  const messages = sms.getByAddress(address, 500);

  if (messages.length === 0) {
    console.log('没有找到聊天记录');
    return;
  }

  console.log(`导出与 ${address} 的 ${messages.length} 条消息`);

  let text = `=== 与 ${address} 的聊天记录 ===\n\n`;

  messages.forEach(msg => {
    const time = util.formatDate(msg.date, 'yyyy-MM-dd HH:mm:ss');
    const direction = msg.isSent ? '我' : address;
    text += `[${time}] ${direction}:\n${msg.text}\n\n`;
  });

  const filename = `chat_${address}_${util.formatDate(Date.now(), 'yyyyMMdd')}.txt`;
  const path = file.documentsPath() + '/' + filename;

  file.write(path, text);
  console.log(`聊天记录已导出到 ${filename}`);
}

exportChat('10086');
```

---

## 注意事项

1. **Root 权限**: 读取真实短信需要 TrollStore 环境和 Root Helper
2. **模拟数据**: 无权限时自动使用模拟数据，`isMockData` 字段标识数据来源
3. **数据库访问**: 短信数据来自系统数据库 `/var/mobile/Library/SMS/sms.db`
4. **只读操作**: 只能读取短信，不能发送或删除
5. **验证码识别**: 自动识别 4-8 位数字验证码
6. **时间戳**: 所有时间戳为毫秒级 Unix 时间戳
7. **隐私保护**: 请遵守隐私法规，不要滥用短信数据
8. **线程安全**: 所有操作都是线程安全的
