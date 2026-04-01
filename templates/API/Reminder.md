# Reminder 提醒事项

Reminder 模块提供了提醒事项管理功能。你可以使用它来创建、查询、完成和删除提醒事项，支持时间提醒和位置提醒。

> **守护进程支持**: 完全支持。在触发器模式下可正常运行。

---

## 快速开始

```javascript
// 请求提醒权限
reminder.requestAccess();

// 检查权限
if (reminder.isAuthorized()) {
  // 获取所有提醒列表
  const lists = reminder.getLists();
  console.log('提醒列表:', lists);

  // 创建提醒
  reminder.create('买牛奶', {
    notes: '记得买低脂牛奶',
    dueDate: Date.now() + 3600000,  // 1小时后
    priority: 5
  });

  // 获取即将到期的提醒
  const upcoming = reminder.getUpcoming(7);
  console.log('未来7天的提醒:', upcoming);
}
```

---

## API 参考

### 权限管理

#### `reminder.isAuthorized()`
检查是否已授权访问提醒。**返回:** `boolean`

```javascript
if (reminder.isAuthorized()) {
  console.log('已授权访问提醒');
}
```

#### `reminder.requestAccess()`
请求提醒访问权限。**返回:** `boolean` - 是否授权成功

```javascript
const granted = reminder.requestAccess();
if (granted) {
  console.log('提醒权限已授予');
} else {
  console.log('提醒权限被拒绝');
}
```

---

### 提醒列表管理

#### `reminder.getLists()`
获取所有提醒列表。**返回:** `List[]`

#### `reminder.getSystemLists()`
获取系统提醒列表。当前实现与 `getLists()` 一致，作为兼容别名保留。**返回:** `List[]`

**List 对象结构:**
```javascript
{
  id: string,              // 列表 ID
  title: string,           // 列表名称
  color: string,           // 列表颜色
  isSystem: boolean        // 是否系统列表
}
```

```javascript
const lists = reminder.getLists();
lists.forEach(list => {
  console.log(`列表: ${list.title} (${list.id})`);
});
```

---

### 获取提醒

#### `reminder.getAll(listId?)`
获取所有提醒。**参数:** `listId` (string, 可选) **返回:** `Reminder[]`

**Reminder 对象结构:**
```javascript
{
  id: string,              // 提醒 ID
  title: string,           // 标题
  notes: string,           // 备注
  isCompleted: boolean,    // 是否已完成
  listId: string,          // 所属列表 ID
  listTitle: string,       // 所属列表名称
  priority: number,        // 优先级 (0-9, 0=无)
  creationDate: number,    // 创建时间戳（毫秒）
  dueDate?: number,        // 到期时间戳（毫秒，可选）
  isOverdue?: boolean      // 是否已过期（可选）
}
```

```javascript
// 获取所有提醒
const all = reminder.getAll();
console.log(`共有 ${all.length} 个提醒`);

// 获取指定列表的提醒
const listReminders = reminder.getAll('list-id-123');
```

#### `reminder.getSorted(options?)`
获取排序后的提醒。**参数:** `options` (object, 可选) **返回:** `Reminder[]`

**options 参数结构:**
```javascript
{
  sortBy?: 'createdAt' | 'dueDate' | 'priority' | 'title',
  ascending?: boolean,    // 默认 true
  completed?: boolean     // 是否包含已完成提醒，默认 false
}
```

```javascript
// 按优先级排序
const byPriority = reminder.getSorted({ sortBy: 'priority' });
const byDueDateDesc = reminder.getSorted({ sortBy: 'dueDate', ascending: false });
```

#### `reminder.getUpcoming(days?)`
获取即将到期的提醒。**参数:** `days` (number, 可选，默认 7) **返回:** `Reminder[]`

```javascript
// 获取未来7天的提醒
const upcoming = reminder.getUpcoming();

// 获取未来3天的提醒
const soon = reminder.getUpcoming(3);

```

#### `reminder.getOverdue(listId?)`
获取已过期的提醒。**参数:** `listId` (string, 可选) **返回:** `Reminder[]`

```javascript
const overdue = reminder.getOverdue();
if (overdue.length > 0) {
  console.log(`有 ${overdue.length} 个过期提醒`);
  notification.send('过期提醒', `您有 ${overdue.length} 个过期提醒`);
}
```

---

### 创建和管理

#### `reminder.create(title, options?)`
创建新提醒。**参数:** `title` (string), `options` (object, 可选) **返回:** `string | object` - 返回提醒 ID，位置提醒返回详细对象

#### `reminder.createSystemReminder(title, options?)`
创建系统提醒事项。当前实现与 `create()` 共用逻辑，作为兼容入口保留。**参数:** 同 `create`。**返回:** 同 `create`

**options 参数结构:**
```javascript
{
  listId?: string,         // 列表 ID（默认为默认列表）
  notes?: string,          // 备注
  dueDate?: number,        // 到期时间戳（毫秒）
  priority?: number,       // 优先级 (0-9, 0=无)
  location?: {             // 位置提醒
    latitude: number,
    longitude: number,
    radius: number,        // 半径（米）
    onArrive: boolean,     // 到达时提醒
    name: string           // 位置名称
  }
}
```

```javascript
// 创建简单提醒
const id = reminder.create('买牛奶');
console.log('提醒 ID:', id);

// 创建带时间的提醒
reminder.create('开会', {
  notes: '项目进度会议',
  dueDate: Date.now() + 3600000,  // 1小时后
  priority: 5
});

// 创建位置提醒
const result = reminder.create('到家后记得关灯', {
  location: {
    latitude: 39.9,
    longitude: 116.4,
    radius: 100,
    onArrive: true,
    name: '家'
  }
});
console.log('位置提醒:', result);
```

#### `reminder.complete(id)`
标记提醒为已完成。**参数:** `id` (string) **返回:** `boolean`

```javascript
const success = reminder.complete('reminder-id-123');
if (success) {
  console.log('提醒已完成');
  haptic.success();
}
```

#### `reminder.delete(id)`
删除提醒。**参数:** `id` (string) **返回:** `boolean`

```javascript
const success = reminder.delete('reminder-id-123');
if (success) {
  console.log('提醒已删除');
}
```

#### `reminder.reorder(ids)`
批量重排提醒。**参数:** `ids` (string[]) **返回:** `{ success, error? }`

```javascript
const result = reminder.reorder(['id-1', 'id-2', 'id-3']);
if (!result.success) {
  console.log(result.error);
}
```

> 当前系统 Reminder API 不支持通过该接口真正批量重排，通常会返回失败对象作为明确反馈。

---

## 完整示例

### 示例 1: 待办事项管理

```javascript
function setupTodoList() {
  if (!reminder.isAuthorized()) {
    console.log('请先授权访问提醒');
    reminder.requestAccess();
    return;
  }

  // 创建今日待办
  const todos = [
    { title: '回复邮件', priority: 5 },
    { title: '完成报告', priority: 9 },
    { title: '健身', priority: 3 },
    { title: '买菜', priority: 1 }
  ];

  todos.forEach(todo => {
    reminder.create({
      title: todo.title,
      priority: todo.priority,
      dueDate: Date.now() + 24 * 60 * 60 * 1000  // 今天结束前
    });
  });

  console.log('今日待办已创建');
}

setupTodoList();
```

### 示例 2: 每日提醒检查

```javascript
function checkDailyReminders() {
  if (!reminder.isAuthorized()) {
    return;
  }

  // 检查过期提醒
  const overdue = reminder.getOverdue();
  if (overdue.length > 0) {
    console.log(`⚠️ 有 ${overdue.length} 个过期提醒:`);
    overdue.forEach(r => {
      console.log(`- ${r.title}`);
    });
    notification.send('过期提醒', `您有 ${overdue.length} 个过期提醒`);
  }

  // 检查今日提醒
  const today = reminder.getUpcoming(1);
  if (today.length > 0) {
    console.log(`📅 今天有 ${today.length} 个提醒:`);
    today.forEach(r => {
      const time = util.formatDate(r.dueDate, 'HH:mm');
      console.log(`- [${time}] ${r.title}`);
    });
  }

  // 统计未完成提醒
  const all = reminder.getAll();
  const incomplete = all.filter(r => !r.isCompleted);
  console.log(`📝 共有 ${incomplete.length} 个未完成提醒`);
}

checkDailyReminders();
```

### 示例 3: 位置提醒

```javascript
function createLocationReminders() {
  // 到家提醒
  reminder.create({
    title: '到家后记得关灯',
    location: {
      latitude: 39.9,
      longitude: 116.4,
      radius: 100,
      title: '家'
    }
  });

  // 到公司提醒
  reminder.create({
    title: '到公司后打卡',
    location: {
      latitude: 39.95,
      longitude: 116.45,
      radius: 50,
      title: '公司'
    }
  });

  // 到超市提醒
  reminder.create({
    title: '买牛奶、面包、鸡蛋',
    notes: '记得用会员卡',
    location: {
      latitude: 39.92,
      longitude: 116.42,
      radius: 200,
      title: '超市'
    }
  });

  console.log('位置提醒已创建');
}

createLocationReminders();
```

### 示例 4: 提醒统计分析

```javascript
function analyzeReminders() {
  const all = reminder.getAll();

  // 按状态统计
  const completed = all.filter(r => r.isCompleted).length;
  const incomplete = all.filter(r => !r.isCompleted).length;

  console.log('=== 提醒统计 ===');
  console.log(`总数: ${all.length}`);
  console.log(`已完成: ${completed} (${(completed/all.length*100).toFixed(1)}%)`);
  console.log(`未完成: ${incomplete} (${(incomplete/all.length*100).toFixed(1)}%)`);

  // 按优先级统计
  const highPriority = all.filter(r => r.priority >= 7).length;
  const mediumPriority = all.filter(r => r.priority >= 4 && r.priority < 7).length;
  const lowPriority = all.filter(r => r.priority < 4).length;

  console.log('\n=== 优先级分布 ===');
  console.log(`高优先级: ${highPriority}`);
  console.log(`中优先级: ${mediumPriority}`);
  console.log(`低优先级: ${lowPriority}`);

  // 时间分析
  const overdue = reminder.getOverdue().length;
  const today = reminder.getUpcoming(1).length;
  const thisWeek = reminder.getUpcoming(7).length;

  console.log('\n=== 时间分布 ===');
  console.log(`已过期: ${overdue}`);
  console.log(`今天: ${today}`);
  console.log(`本周: ${thisWeek}`);
}

analyzeReminders();
```

### 示例 5: 批量操作

```javascript
function batchOperations() {
  // 完成所有低优先级的提醒
  const all = reminder.getAll();
  const lowPriority = all.filter(r => r.priority < 3 && !r.isCompleted);

  console.log(`找到 ${lowPriority.length} 个低优先级提醒`);

  lowPriority.forEach(r => {
    reminder.complete(r.id);
    console.log(`已完成: ${r.title}`);
  });

  // 删除已完成的旧提醒
  const completed = all.filter(r => r.isCompleted);
  const oldCompleted = completed.filter(r => {
    const age = Date.now() - r.createdAt;
    return age > 30 * 24 * 60 * 60 * 1000;  // 30天前
  });

  console.log(`找到 ${oldCompleted.length} 个旧的已完成提醒`);

  oldCompleted.forEach(r => {
    reminder.delete(r.id);
    console.log(`已删除: ${r.title}`);
  });
}

batchOperations();
```

### 示例 6: 智能提醒助手

```javascript
function smartReminderAssistant() {
  if (!reminder.isAuthorized()) {
    reminder.requestAccess();
    return;
  }

  // 检查过期提醒并重新安排
  const overdue = reminder.getOverdue();
  if (overdue.length > 0) {
    console.log('发现过期提醒，重新安排...');

    overdue.forEach(r => {
      // 重新创建为明天的提醒
      reminder.create({
        title: r.title,
        notes: r.notes + '\n(重新安排)',
        priority: r.priority,
        dueDate: Date.now() + 24 * 60 * 60 * 1000
      });

      // 完成旧的提醒
      reminder.complete(r.id);
      console.log(`已重新安排: ${r.title}`);
    });
  }

  // 检查高优先级提醒
  const highPriority = reminder.getSorted('priority')
    .filter(r => !r.isCompleted && r.priority >= 7);

  if (highPriority.length > 0) {
    console.log(`\n⚠️ 有 ${highPriority.length} 个高优先级提醒:`);
    highPriority.forEach(r => {
      console.log(`- ${r.title} (优先级: ${r.priority})`);
    });

    notification.send('高优先级提醒', `您有 ${highPriority.length} 个重要提醒`);
  }

  // 每日总结
  const today = reminder.getUpcoming(1);
  const completed = reminder.getAll().filter(r => r.isCompleted);

  console.log('\n=== 每日总结 ===');
  console.log(`今日待办: ${today.length}`);
  console.log(`已完成: ${completed.length}`);
  console.log(`完成率: ${(completed.length/(completed.length+today.length)*100).toFixed(1)}%`);
}

smartReminderAssistant();
```

---

## 最佳实践

### 1. 检查权限

```javascript
// ✅ 正确
if (reminder.isAuthorized()) {
  const reminders = reminder.getAll();
}

// ❌ 错误 - 不检查权限
const reminders = reminder.getAll();  // 可能返回空数组
```

### 2. 设置合理的优先级

```javascript
// ✅ 正确 - 使用 0-9 范围
reminder.create({
  title: '重要会议',
  priority: 9  // 最高优先级
});

// ❌ 错误 - 超出范围
reminder.create({
  title: '任务',
  priority: 10  // 无效
});
```

### 3. 处理时间戳

```javascript
// ✅ 正确 - 使用毫秒时间戳
const tomorrow = Date.now() + 24 * 60 * 60 * 1000;
reminder.create({
  title: '明天的任务',
  dueDate: tomorrow
});

// ❌ 错误 - 使用秒时间戳
reminder.create({
  title: '任务',
  dueDate: Math.floor(Date.now() / 1000)  // 错误的时间
});
```

### 4. 位置提醒半径

```javascript
// ✅ 正确 - 合理的半径
reminder.create({
  title: '到家提醒',
  location: {
    latitude: 39.9,
    longitude: 116.4,
    radius: 100,  // 100米
    title: '家'
  }
});

// ❌ 错误 - 半径太小或太大
reminder.create({
  title: '提醒',
  location: {
    radius: 1  // 太小，容易误触发
  }
});
```

---

## 注意事项

1. **权限要求**: 首次使用需要请求提醒访问权限
2. **iOS 17+**: iOS 17 及以上使用 `requestFullAccessToReminders` API
3. **优先级范围**: 优先级为 0-9，0 表示无优先级
4. **时间戳**: 所有时间戳为毫秒级 Unix 时间戳
5. **位置提醒**: 需要定位权限，半径单位为米
6. **列表 ID**: 如果不指定 listId，提醒会添加到默认列表
7. **完成状态**: 完成的提醒不会被删除，仍可查询
8. **线程安全**: 所有操作都是线程安全的
