# Notification 本地通知

Notification 模块提供了本地通知功能。你可以使用它来发送通知、管理通知权限、设置应用角标等。

> **守护进程支持**: 完全支持。在触发器模式下可正常运行，可以在后台发送通知。

---

## 目录

- [快速开始](#快速开始)
- [API 参考](#api-参考)
  - [权限管理](#权限管理)
    - [notification.requestAccess()](#notificationrequestaccess)
    - [notification.getAccessStatus()](#notificationgetaccessstatus)
    - [notification.isAuthorized()](#notificationisauthorized)
  - [通知操作](#通知操作)
    - [notification.schedule()](#notificationschedule)
    - [notification.send()](#notificationsend)
    - [notification.cancel()](#notificationcancel)
    - [notification.cancelAll()](#notificationcancelall)
  - [查询](#查询)
    - [notification.getPending()](#notificationgetpending)
    - [notification.getDelivered()](#notificationgetdelivered)
  - [角标管理](#角标管理)
    - [notification.setBadge()](#notificationsetbadge)
    - [notification.clearBadge()](#notificationclearbadge)
- [完整示例](#完整示例)
- [最佳实践](#最佳实践)

---

## 快速开始

使用 Notification 模块发送通知非常简单：

```javascript
// 请求通知权限
const result = notification.requestAccess();
if (result.granted) {
  console.log('通知权限已授予');
}

// 发送立即通知
notification.send('标题', '这是通知内容');

// 发送延迟通知
notification.send('提醒', '5秒后的通知', {
  delay: 5
});

// 设置角标
notification.setBadge(3);
```

---

## API 参考

### 权限管理

#### `notification.requestAccess()`

请求通知权限。

**返回:** `object` — 权限请求结果

| 字段 | 类型 | 说明 |
|------|------|------|
| `granted` | `boolean` | 是否授予权限 |
| `error` | `string` | 错误信息（如果有） |

```javascript
const result = notification.requestAccess();

if (result.granted) {
  console.log('通知权限已授予');
} else {
  console.error('通知权限被拒绝:', result.error);
}
```

**注意:**
- 首次调用会弹出系统权限请求对话框
- 如果用户之前已拒绝，需要引导用户到设置中手动开启

---

#### `notification.getAccessStatus()`

获取当前通知权限状态。

**返回:** `string` — 权限状态

可能的值：
- `'authorized'` - 已授权
- `'denied'` - 已拒绝
- `'notDetermined'` - 未决定
- `'provisional'` - 临时授权
- `'ephemeral'` - 短暂授权
- `'unknown'` - 未知状态

```javascript
const status = notification.getAccessStatus();
console.log('通知权限状态:', status);

if (status === 'denied') {
  console.log('请到设置中开启通知权限');
}
```

---

#### `notification.isAuthorized()`

检查是否已授权通知权限。

**返回:** `boolean` — 如果已授权返回 `true`，否则返回 `false`

```javascript
if (notification.isAuthorized()) {
  console.log('可以发送通知');
  notification.send('测试', '通知内容');
} else {
  console.log('需要先请求通知权限');
  notification.requestAccess();
}
```

---

### 通知操作

#### `notification.schedule(title, body, options?)`

调度一个通知（可以立即发送或延迟发送）。

**参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | `string` | 是 | 通知标题 |
| `body` | `string` | 是 | 通知内容 |
| `options` | `object` | 否 | 通知选项 |

**options 配置项:**

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `subtitle` | `string` | - | 副标题 |
| `badge` | `number` | - | 角标数字 |
| `delay` | `number` | - | 延迟时间（秒） |
| `date` | `number` | - | 指定时间戳（毫秒） |
| `id` | `string` | 自动生成 | 通知 ID |
| `userInfo` | `object` | - | 自定义数据 |
| `copyOnTap` | `string\|boolean` | - | 点击时复制内容 |

**copyOnTap 说明:**
- `string` - 点击通知时复制指定的字符串
- `true` 或 `1` - 点击通知时复制通知的 body 内容
- `false`、`0` 或不设置 - 不复制

**返回:** `string` — 通知 ID（成功时）或包含错误信息的对象（失败时）

```javascript
// 立即发送
const id = notification.schedule('标题', '内容');
console.log('通知 ID:', id);

// 5秒后发送
notification.schedule('提醒', '5秒后的通知', {
  delay: 5
});

// 指定时间发送
const tomorrow = Date.now() + 24 * 60 * 60 * 1000;
notification.schedule('明日提醒', '这是明天的通知', {
  date: tomorrow
});

// 带副标题和角标
notification.schedule('新消息', '你有3条未读消息', {
  subtitle: '来自好友',
  badge: 3
});

// 点击时复制内容
notification.schedule('验证码', '123456', {
  copyOnTap: true  // 点击时复制 "123456"
});

// 点击时复制自定义内容
notification.schedule('链接', '点击复制链接', {
  copyOnTap: 'https://example.com'
});

// 自定义 ID
notification.schedule('任务提醒', '任务即将到期', {
  id: 'task_reminder_001',
  delay: 10
});
```

---

#### `notification.send(title, body, options?)`

发送通知（`schedule` 的别名）。

**参数:** 同 `notification.schedule()`

**返回:** 同 `notification.schedule()`

```javascript
// 等同于 notification.schedule()
notification.send('标题', '内容');

notification.send('提醒', '延迟通知', {
  delay: 3
});
```

---

#### `notification.cancel(id)`

取消指定的通知。

**参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | `string` | 是 | 通知 ID |

**返回:** `boolean` — 是否成功

```javascript
// 发送通知并保存 ID
const id = notification.send('测试', '这是一条测试通知', {
  delay: 10
});

// 取消通知
notification.cancel(id);
console.log('通知已取消');
```

---

#### `notification.cancelAll()`

取消所有待发送和已发送的通知。

**返回:** `boolean` — 是否成功

```javascript
notification.cancelAll();
console.log('所有通知已清除');
```

---

### 查询

#### `notification.getPending()`

获取所有待发送的通知列表。

**返回:** `array` — 待发送通知数组

每个通知对象包含：
- `id` - 通知 ID
- `title` - 标题
- `body` - 内容
- `subtitle` - 副标题
- `delay` - 延迟时间（如果有）
- `date` - 发送时间戳（如果有）

```javascript
const pending = notification.getPending();
console.log(`有 ${pending.length} 条待发送通知`);

pending.forEach(notif => {
  console.log(`- ${notif.title}: ${notif.body}`);
});
```

---

#### `notification.getDelivered()`

获取所有已发送的通知列表。

**返回:** `array` — 已发送通知数组

每个通知对象包含：
- `id` - 通知 ID
- `title` - 标题
- `body` - 内容
- `subtitle` - 副标题
- `date` - 发送时间戳

```javascript
const delivered = notification.getDelivered();
console.log(`有 ${delivered.length} 条已发送通知`);

delivered.forEach(notif => {
  const date = new Date(notif.date * 1000);
  console.log(`- ${notif.title} (${date.toLocaleString()})`);
});
```

---

### 角标管理

#### `notification.setBadge(count)`

设置应用图标角标数字。

**参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `count` | `number` | 是 | 角标数字（0 表示清除） |

**返回:** `boolean` — 是否成功

```javascript
// 设置角标为 5
notification.setBadge(5);

// 清除角标
notification.setBadge(0);
```

---

#### `notification.clearBadge()`

清除应用图标角标。

**返回:** `boolean` — 是否成功

```javascript
notification.clearBadge();
console.log('角标已清除');
```

---

## 完整示例

### 示例 1: 简单提醒

```javascript
// 检查权限
if (!notification.isAuthorized()) {
  const result = notification.requestAccess();
  if (!result.granted) {
    console.error('无法发送通知：权限被拒绝');
    return;
  }
}

// 发送提醒
notification.send('喝水提醒', '该喝水了！', {
  delay: 3600  // 1小时后
});

console.log('提醒已设置');
```

---

### 示例 2: 定时任务提醒

```javascript
// 设置每日提醒
function setDailyReminder(hour, minute, title, body) {
  const now = new Date();
  const reminderTime = new Date();
  reminderTime.setHours(hour, minute, 0, 0);

  // 如果今天的时间已过，设置为明天
  if (reminderTime <= now) {
    reminderTime.setDate(reminderTime.getDate() + 1);
  }

  const delay = (reminderTime.getTime() - now.getTime()) / 1000;

  notification.send(title, body, {
    delay: delay,
    id: `daily_${hour}_${minute}`
  });

  console.log(`提醒已设置: ${reminderTime.toLocaleString()}`);
}

// 每天早上 8:00 提醒
setDailyReminder(8, 0, '早安', '新的一天开始了！');

// 每天晚上 22:00 提醒
setDailyReminder(22, 0, '晚安', '该休息了');
```

---

### 示例 3: 倒计时通知

```javascript
// 倒计时通知
function countdownNotification(title, seconds) {
  const intervals = [60, 30, 10, 5, 3, 2, 1];

  intervals.forEach(sec => {
    if (sec < seconds) {
      notification.send(title, `还剩 ${sec} 秒`, {
        delay: seconds - sec
      });
    }
  });

  // 最后的通知
  notification.send(title, '时间到！', {
    delay: seconds,
    badge: 1
  });

  console.log(`倒计时已开始: ${seconds} 秒`);
}

// 5分钟倒计时
countdownNotification('番茄钟', 5 * 60);
```

---

### 示例 4: 通知管理器

```javascript
// 通知管理器
class NotificationManager {
  constructor() {
    this.ensurePermission();
  }

  ensurePermission() {
    if (!notification.isAuthorized()) {
      const result = notification.requestAccess();
      if (!result.granted) {
        throw new Error('通知权限未授予');
      }
    }
  }

  send(title, body, options = {}) {
    const id = notification.send(title, body, options);
    console.log(`通知已发送: ${title}`);
    return id;
  }

  sendWithCopy(title, content) {
    return this.send(title, content, {
      copyOnTap: true
    });
  }

  schedule(title, body, delaySeconds) {
    return this.send(title, body, {
      delay: delaySeconds
    });
  }

  scheduleAt(title, body, timestamp) {
    return this.send(title, body, {
      date: timestamp
    });
  }

  cancelAll() {
    notification.cancelAll();
    notification.clearBadge();
    console.log('所有通知已清除');
  }

  listPending() {
    const pending = notification.getPending();
    console.log(`=== 待发送通知 (${pending.length}) ===`);
    pending.forEach((notif, index) => {
      console.log(`${index + 1}. ${notif.title}: ${notif.body}`);
    });
    return pending;
  }

  listDelivered() {
    const delivered = notification.getDelivered();
    console.log(`=== 已发送通知 (${delivered.length}) ===`);
    delivered.forEach((notif, index) => {
      const date = new Date(notif.date * 1000);
      console.log(`${index + 1}. ${notif.title} - ${date.toLocaleString()}`);
    });
    return delivered;
  }

  updateBadge(count) {
    notification.setBadge(count);
  }
}

// 使用
const nm = new NotificationManager();

nm.send('测试', '这是一条测试通知');
nm.schedule('提醒', '5秒后的提醒', 5);
nm.sendWithCopy('验证码', '123456');

nm.listPending();
```

---

### 示例 5: 任务提醒系统

```javascript
// 任务提醒系统
class TaskReminder {
  constructor() {
    this.tasks = storage.get('tasks') || [];
  }

  addTask(title, description, dueTime) {
    const task = {
      id: util.uuid(),
      title: title,
      description: description,
      dueTime: dueTime,
      created: Date.now()
    };

    this.tasks.push(task);
    this.saveTasks();
    this.scheduleReminder(task);

    console.log('任务已添加:', title);
    return task.id;
  }

  scheduleReminder(task) {
    const now = Date.now();
    const timeUntilDue = task.dueTime - now;

    if (timeUntilDue <= 0) {
      console.log('任务已过期');
      return;
    }

    // 提前 1 小时提醒
    const oneHourBefore = timeUntilDue - 60 * 60 * 1000;
    if (oneHourBefore > 0) {
      notification.send('任务提醒', `${task.title} 将在 1 小时后到期`, {
        delay: oneHourBefore / 1000,
        id: `${task.id}_1h`
      });
    }

    // 到期提醒
    notification.send('任务到期', task.description, {
      delay: timeUntilDue / 1000,
      id: task.id,
      badge: this.tasks.length
    });

    console.log('提醒已设置');
  }

  completeTask(taskId) {
    const index = this.tasks.findIndex(t => t.id === taskId);
    if (index !== -1) {
      const task = this.tasks[index];
      this.tasks.splice(index, 1);
      this.saveTasks();

      // 取消提醒
      notification.cancel(taskId);
      notification.cancel(`${taskId}_1h`);

      // 更新角标
      notification.setBadge(this.tasks.length);

      console.log('任务已完成:', task.title);
    }
  }

  listTasks() {
    console.log(`=== 任务列表 (${this.tasks.length}) ===`);
    this.tasks.forEach((task, index) => {
      const dueDate = new Date(task.dueTime);
      console.log(`${index + 1}. ${task.title} - ${dueDate.toLocaleString()}`);
    });
  }

  saveTasks() {
    storage.set('tasks', this.tasks);
  }
}

// 使用
const reminder = new TaskReminder();

// 添加任务
const tomorrow = Date.now() + 24 * 60 * 60 * 1000;
reminder.addTask('完成报告', '提交月度报告', tomorrow);

const nextWeek = Date.now() + 7 * 24 * 60 * 60 * 1000;
reminder.addTask('项目会议', '参加项目评审会议', nextWeek);

reminder.listTasks();
```

---

### 示例 6: 验证码通知

```javascript
// 验证码通知（点击复制）
function sendVerificationCode(code) {
  notification.send('验证码', code, {
    subtitle: '点击复制',
    copyOnTap: true,
    badge: 1
  });

  console.log('验证码已发送:', code);

  // 5分钟后清除角标
  setTimeout(() => {
    notification.clearBadge();
  }, 5 * 60 * 1000);
}

// 使用
const code = Math.floor(100000 + Math.random() * 900000).toString();
sendVerificationCode(code);
```

---

### 示例 7: 批量通知管理

```javascript
// 批量发送通知
function sendBatchNotifications(notifications) {
  const ids = [];

  notifications.forEach((notif, index) => {
    const id = notification.send(notif.title, notif.body, {
      delay: (index + 1) * 2,  // 每隔2秒发送一条
      ...notif.options
    });
    ids.push(id);
  });

  console.log(`已调度 ${ids.length} 条通知`);
  return ids;
}

// 使用
const notifications = [
  { title: '通知 1', body: '第一条通知' },
  { title: '通知 2', body: '第二条通知' },
  { title: '通知 3', body: '第三条通知' }
];

sendBatchNotifications(notifications);
```

---

### 示例 8: 通知历史记录

```javascript
// 通知历史记录
function saveNotificationHistory(title, body) {
  const history = storage.get('notification_history') || [];

  history.unshift({
    title: title,
    body: body,
    timestamp: Date.now()
  });

  // 只保留最近 100 条
  if (history.length > 100) {
    history.pop();
  }

  storage.set('notification_history', history);
}

function getNotificationHistory(limit = 10) {
  const history = storage.get('notification_history') || [];
  return history.slice(0, limit);
}

// 发送通知并记录
function sendAndLog(title, body, options) {
  const id = notification.send(title, body, options);
  saveNotificationHistory(title, body);
  return id;
}

// 查看历史
function showHistory() {
  const history = getNotificationHistory(20);
  console.log(`=== 通知历史 (最近 ${history.length} 条) ===`);

  history.forEach((item, index) => {
    const date = new Date(item.timestamp);
    console.log(`${index + 1}. ${item.title} - ${date.toLocaleString()}`);
  });
}

// 使用
sendAndLog('测试', '这是一条测试通知');
showHistory();
```

---

## 最佳实践

### 1. 始终检查权限

在发送通知前检查权限：

```javascript
// ✅ 正确
if (!notification.isAuthorized()) {
  const result = notification.requestAccess();
  if (!result.granted) {
    console.error('无法发送通知');
    return;
  }
}
notification.send('标题', '内容');

// ❌ 错误 - 没有检查权限
notification.send('标题', '内容');  // 可能失败
```

### 2. 使用有意义的通知 ID

为重要通知设置自定义 ID：

```javascript
// ✅ 正确 - 使用有意义的 ID
notification.send('任务提醒', '任务即将到期', {
  id: 'task_reminder_001',
  delay: 10
});

// 后续可以取消
notification.cancel('task_reminder_001');

// ❌ 较差 - 使用自动生成的 ID
const id = notification.send('任务提醒', '任务即将到期');
// ID 难以记住和管理
```

### 3. 合理设置角标

及时更新和清除角标：

```javascript
// ✅ 正确 - 及时更新角标
notification.send('新消息', '你有新消息', {
  badge: 3
});

// 消息已读后清除
notification.clearBadge();

// ❌ 错误 - 不清除角标
notification.setBadge(5);
// 角标一直显示，影响用户体验
```

### 4. 避免通知轰炸

不要在短时间内发送大量通知：

```javascript
// ✅ 正确 - 合并通知
notification.send('新消息', '你有 5 条新消息', {
  badge: 5
});

// ❌ 错误 - 发送多条通知
for (let i = 0; i < 5; i++) {
  notification.send('新消息', `消息 ${i + 1}`);
}
```

### 5. 提供清晰的通知内容

通知内容要简洁明了：

```javascript
// ✅ 正确 - 清晰的内容
notification.send('任务提醒', '项目报告将在 1 小时后到期');

// ❌ 错误 - 内容不清晰
notification.send('提醒', '时间到了');  // 什么时间？
```

### 6. 使用 copyOnTap 功能

对于验证码等需要复制的内容，使用 copyOnTap：

```javascript
// ✅ 正确 - 方便用户复制
notification.send('验证码', '123456', {
  copyOnTap: true
});

// ❌ 较差 - 用户需要手动复制
notification.send('验证码', '123456');
```

### 7. 定期清理通知

定期清理已发送的通知：

```javascript
// ✅ 正确 - 定期清理
function cleanupOldNotifications() {
  const delivered = notification.getDelivered();
  const now = Date.now();

  delivered.forEach(notif => {
    const age = now - notif.date * 1000;
    // 清理 24 小时前的通知
    if (age > 24 * 60 * 60 * 1000) {
      notification.cancel(notif.id);
    }
  });
}

// 每天清理一次
setInterval(cleanupOldNotifications, 24 * 60 * 60 * 1000);
```

---

## 注意事项

1. **权限要求**: 首次使用需要请求通知权限，用户可能拒绝
2. **系统限制**: iOS 对通知数量和频率有限制，避免发送过多通知
3. **Daemon 模式**: 在 Daemon 模式下可以正常发送通知
4. **通知延迟**: 使用 `delay` 参数时，最小延迟为 1 秒
5. **角标限制**: 角标数字最大为 999，超过会显示为 999+
6. **通知声音**: 默认使用系统通知声音，无法自定义
7. **通知分组**: iOS 会自动将同一应用的通知分组显示
8. **copyOnTap**: 点击通知复制功能需要应用处理，在 Daemon 模式下可能有限制
9. **时间精度**: 延迟通知的时间精度约为 1 秒
10. **后台限制**: 在某些情况下，系统可能延迟或不发送通知
