# Calendar 日历管理

Calendar 模块提供了日历事件管理功能。你可以使用它来创建、查询和删除日历事件。

> **守护进程支持**: 完全支持。在触发器模式下可正常运行。

---

## 快速开始

```javascript
// 请求日历权限
calendar.requestAccess();

// 检查权限
if (calendar.isAuthorized()) {
  // 获取所有日历
  const calendars = calendar.getCalendars();
  console.log('日历列表:', calendars);

  // 获取今天的事件
  const today = calendar.getToday();
  console.log(`今天有 ${today.length} 个事件`);

  // 创建新事件
  calendar.create({
    title: '团队会议',
    startDate: Date.now() + 3600000,  // 1小时后
    endDate: Date.now() + 5400000,    // 1.5小时后
    location: '会议室A',
    notes: '讨论项目进度'
  });
}
```

---

## API 参考

### 权限管理

#### `calendar.isAuthorized()`
检查是否已授权访问日历。**返回:** `boolean`

```javascript
if (calendar.isAuthorized()) {
  console.log('已授权访问日历');
}
```

#### `calendar.requestAccess()`
请求日历访问权限。**返回:** `boolean` - 是否授权成功

```javascript
const granted = calendar.requestAccess();
if (granted) {
  console.log('日历权限已授予');
} else {
  console.log('日历权限被拒绝');
}
```

---

### 日历管理

#### `calendar.getCalendars()`
获取所有日历列表。**返回:** `Calendar[]`

**Calendar 对象结构:**
```javascript
{
  id: string,              // 日历 ID
  title: string,           // 日历名称
  color: string,           // 日历颜色（十六进制）
  type: number,            // 日历类型
  allowsModify: boolean    // 是否允许修改
}
```

```javascript
const calendars = calendar.getCalendars();
calendars.forEach(cal => {
  console.log(`${cal.title} (类型:${cal.type}) - ${cal.allowsModify ? '可编辑' : '只读'}`);
  console.log(`颜色: ${cal.color}`);
});
```

---

### 获取事件

#### `calendar.getToday()`
获取今天的事件。**返回:** `Event[]`

**Event 对象结构:**
```javascript
{
  id: string,              // 事件 ID
  title: string,           // 标题
  startDate: number,       // 开始时间戳（毫秒）
  endDate: number,         // 结束时间戳（毫秒）
  calendar: string,        // 所属日历名称
  calendarId: string,      // 所属日历 ID
  isAllDay: boolean,       // 是否全天事件
  location: string,        // 地点
  notes: string            // 备注
}
```

```javascript
// 获取今日事件
const today = calendar.getToday();
today.forEach(event => {
  const time = util.formatDate(event.startDate, 'HH:mm');
  console.log(`[${time}] ${event.title}`);
});
```

#### `calendar.getEvents(start, end, calendarId?)`
获取指定时间范围的事件。**参数:** `start` (number), `end` (number), `calendarId` (string, 可选) **返回:** `Event[]`

```javascript
// 获取本周的事件
const now = Date.now();
const weekLater = now + 7 * 24 * 60 * 60 * 1000;
const weekEvents = calendar.getEvents(now, weekLater);

console.log(`本周有 ${weekEvents.length} 个事件`);

// 获取指定日历的事件
const workWeek = calendar.getEvents(now, weekLater, 'work-calendar-id');
```

---

### 创建和删除

#### `calendar.create(title, start, end, options?)`
创建新事件。**参数:** `title` (string), `start` (number), `end` (number), `options` (object, 可选) **返回:** `string | null` - 返回事件 ID，失败返回 null

**options 参数结构:**
```javascript
{
  calendarId?: string,     // 日历 ID（默认为默认日历）
  allDay?: boolean,        // 是否全天事件（默认 false）
  location?: string,       // 地点
  notes?: string,          // 备注
  url?: string             // URL
}
```

```javascript
// 创建普通事件
const eventId = calendar.create(
  '团队会议',
  Date.now() + 3600000,  // 1小时后
  Date.now() + 5400000,  // 1.5小时后
  {
    location: '会议室A',
    notes: '讨论Q1项目进度'
  }
);
console.log('事件已创建，ID:', eventId);

// 创建全天事件
calendar.create(
  '公司年会',
  Date.now(),
  Date.now() + 24 * 60 * 60 * 1000,
  {
    allDay: true,
    location: '大礼堂'
  }
);

// 创建带 URL 的事件
calendar.create(
  '在线会议',
  Date.now() + 3600000,
  Date.now() + 5400000,
  {
    url: 'https://zoom.us/j/123456789',
    notes: '点击链接加入会议'
  }
);
```

#### `calendar.delete(id)`
删除事件。**参数:** `id` (string) **返回:** `boolean`

```javascript
const success = calendar.delete('event-id-123');
if (success) {
  console.log('事件已删除');
}
```

---

## 完整示例

### 示例 1: 每日日程提醒

```javascript
function dailyScheduleReminder() {
  if (!calendar.isAuthorized()) {
    console.log('请先授权访问日历');
    calendar.requestAccess();
    return;
  }

  const today = calendar.getToday();

  if (today.length === 0) {
    console.log('今天没有安排');
    notification.send('今日日程', '今天没有安排的事件');
    return;
  }

  console.log(`=== 今日日程 (${today.length} 个事件) ===`);

  today.forEach((event, index) => {
    const startTime = util.formatDate(event.startDate, 'HH:mm');
    const endTime = util.formatDate(event.endDate, 'HH:mm');

    if (event.isAllDay) {
      console.log(`${index + 1}. [全天] ${event.title}`);
    } else {
      console.log(`${index + 1}. [${startTime}-${endTime}] ${event.title}`);
    }

    if (event.location) {
      console.log(`   地点: ${event.location}`);
    }
  });

  // 发送通知
  const nextEvent = today[0];
  if (nextEvent && !nextEvent.isAllDay) {
    const timeUntil = nextEvent.startDate - Date.now();
    if (timeUntil > 0 && timeUntil < 3600000) {  // 1小时内
      const minutes = Math.floor(timeUntil / 60000);
      notification.send('即将开始', `${nextEvent.title} 将在 ${minutes} 分钟后开始`);
    }
  }
}

dailyScheduleReminder();
```

### 示例 2: 创建周期性事件

```javascript
function createWeeklyMeeting() {
  // 创建未来4周的每周例会
  const meetingTime = new Date();
  meetingTime.setHours(14, 0, 0, 0);  // 下午2点

  for (let week = 0; week < 4; week++) {
    const startDate = meetingTime.getTime() + (week * 7 * 24 * 60 * 60 * 1000);
    const endDate = startDate + (60 * 60 * 1000);  // 1小时

    calendar.create({
      title: '周例会',
      startDate: startDate,
      endDate: endDate,
      location: '会议室B',
      notes: '团队周报和下周计划',
      url: 'https://meet.example.com/weekly'
    });

    const dateStr = util.formatDate(startDate, 'yyyy-MM-dd');
    console.log(`已创建 ${dateStr} 的周例会`);
  }

  console.log('未来4周的周例会已创建');
}

createWeeklyMeeting();
```

### 示例 3: 日程冲突检测

```javascript
function checkConflicts(newEvent) {
  const events = calendar.getEvents(
    newEvent.startDate,
    newEvent.endDate
  );

  const conflicts = events.filter(event => {
    // 检查时间重叠
    return (
      (newEvent.startDate >= event.startDate && newEvent.startDate < event.endDate) ||
      (newEvent.endDate > event.startDate && newEvent.endDate <= event.endDate) ||
      (newEvent.startDate <= event.startDate && newEvent.endDate >= event.endDate)
    );
  });

  if (conflicts.length > 0) {
    console.log('⚠️ 发现时间冲突:');
    conflicts.forEach(event => {
      const time = util.formatDate(event.startDate, 'HH:mm');
      console.log(`- [${time}] ${event.title}`);
    });
    return false;
  } else {
    console.log('✅ 没有时间冲突');
    return true;
  }
}

// 使用
const newMeeting = {
  title: '客户会议',
  startDate: Date.now() + 3600000,
  endDate: Date.now() + 5400000
};

if (checkConflicts(newMeeting)) {
  calendar.create(newMeeting);
  console.log('会议已创建');
} else {
  console.log('请选择其他时间');
}
```

### 示例 4: 日历统计分析

```javascript
function analyzeCalendar() {
  // 获取本周数据
  const now = Date.now();
  const weekStart = now - (now % (7 * 24 * 60 * 60 * 1000));
  const weekEnd = weekStart + (7 * 24 * 60 * 60 * 1000);

  const weekEvents = calendar.getEvents(weekStart, weekEnd);

  // 统计
  const stats = {
    total: weekEvents.length,
    allDay: 0,
    withLocation: 0,
    totalDuration: 0,
    byDay: {}
  };

  weekEvents.forEach(event => {
    if (event.isAllDay) {
      stats.allDay++;
    } else {
      const duration = event.endDate - event.startDate;
      stats.totalDuration += duration;
    }

    if (event.location) {
      stats.withLocation++;
    }

    // 按日期统计
    const day = util.formatDate(event.startDate, 'yyyy-MM-dd');
    stats.byDay[day] = (stats.byDay[day] || 0) + 1;
  });

  console.log('=== 本周日历统计 ===');
  console.log(`总事件数: ${stats.total}`);
  console.log(`全天事件: ${stats.allDay}`);
  console.log(`有地点: ${stats.withLocation}`);

  const avgDuration = stats.totalDuration / (stats.total - stats.allDay);
  const hours = Math.floor(avgDuration / (60 * 60 * 1000));
  const minutes = Math.floor((avgDuration % (60 * 60 * 1000)) / (60 * 1000));
  console.log(`平均时长: ${hours}小时${minutes}分钟`);

  console.log('\n每日事件数:');
  Object.entries(stats.byDay).forEach(([day, count]) => {
    console.log(`${day}: ${count} 个`);
  });
}

analyzeCalendar();
```

### 示例 5: 自动日程导出

```javascript
function exportSchedule(days = 7) {
  if (!calendar.isAuthorized()) {
    console.log('需要日历权限');
    return;
  }

  const now = Date.now();
  const future = now + (days * 24 * 60 * 60 * 1000);
  const events = calendar.getEvents(now, future);

  // 按日期分组
  const byDate = {};
  events.forEach(event => {
    const date = util.formatDate(event.startDate, 'yyyy-MM-dd');
    if (!byDate[date]) {
      byDate[date] = [];
    }
    byDate[date].push(event);
  });

  // 生成文本
  let text = `=== 未来 ${days} 天日程 ===\n\n`;

  Object.keys(byDate).sort().forEach(date => {
    const dayEvents = byDate[date];
    text += `${date} (${dayEvents.length} 个事件)\n`;
    text += '─'.repeat(40) + '\n';

    dayEvents.forEach(event => {
      if (event.isAllDay) {
        text += `[全天] ${event.title}\n`;
      } else {
        const start = util.formatDate(event.startDate, 'HH:mm');
        const end = util.formatDate(event.endDate, 'HH:mm');
        text += `[${start}-${end}] ${event.title}\n`;
      }

      if (event.location) {
        text += `  📍 ${event.location}\n`;
      }
      if (event.notes) {
        text += `  📝 ${event.notes}\n`;
      }
      if (event.url) {
        text += `  🔗 ${event.url}\n`;
      }
      text += '\n';
    });

    text += '\n';
  });

  // 保存到文件
  const filename = `schedule_${util.formatDate(now, 'yyyyMMdd')}.txt`;
  const path = file.documentsPath() + '/' + filename;
  file.write(path, text);

  console.log(`日程已导出到 ${filename}`);
  console.log(`共 ${events.length} 个事件`);
}

exportSchedule(7);
```

### 示例 6: 智能会议助手

```javascript
function meetingAssistant() {
  if (!calendar.isAuthorized()) {
    calendar.requestAccess();
    return;
  }

  const now = Date.now();
  const today = calendar.getToday();

  // 查找下一个会议
  const upcoming = today.filter(e => e.startDate > now && !e.isAllDay);
  upcoming.sort((a, b) => a.startDate - b.startDate);

  if (upcoming.length === 0) {
    console.log('今天没有更多会议了');
    return;
  }

  const nextMeeting = upcoming[0];
  const timeUntil = nextMeeting.startDate - now;
  const minutes = Math.floor(timeUntil / 60000);

  console.log('=== 下一个会议 ===');
  console.log(`标题: ${nextMeeting.title}`);
  console.log(`时间: ${util.formatDate(nextMeeting.startDate, 'HH:mm')}`);
  console.log(`还有: ${minutes} 分钟`);

  if (nextMeeting.location) {
    console.log(`地点: ${nextMeeting.location}`);
  }

  if (nextMeeting.url) {
    console.log(`链接: ${nextMeeting.url}`);
  }

  // 提前提醒
  if (minutes <= 10 && minutes > 0) {
    notification.send('会议提醒', `${nextMeeting.title} 将在 ${minutes} 分钟后开始`);
    haptic.notification('warning');

    // 如果有会议链接，复制到剪贴板
    if (nextMeeting.url) {
      clipboard.setText(nextMeeting.url);
      console.log('会议链接已复制到剪贴板');
    }
  }

  // 显示今日剩余会议
  if (upcoming.length > 1) {
    console.log(`\n今日还有 ${upcoming.length - 1} 个会议:`);
    upcoming.slice(1, 4).forEach(event => {
      const time = util.formatDate(event.startDate, 'HH:mm');
      console.log(`- [${time}] ${event.title}`);
    });
  }
}

meetingAssistant();
```

---

## 最佳实践

### 1. 检查权限

```javascript
// ✅ 正确
if (calendar.isAuthorized()) {
  const events = calendar.getToday();
}

// ❌ 错误 - 不检查权限
const events = calendar.getToday();  // 可能返回空数组
```

### 2. 使用合理的时间范围

```javascript
// ✅ 正确 - 限制查询范围
const weekEvents = calendar.getEvents(
  Date.now(),
  Date.now() + 7 * 24 * 60 * 60 * 1000
);

// ❌ 错误 - 范围太大
const allEvents = calendar.getEvents(
  0,
  Date.now() + 365 * 24 * 60 * 60 * 1000
);
```

### 3. 处理全天事件

```javascript
// ✅ 正确 - 检查是否全天事件
events.forEach(event => {
  if (event.isAllDay) {
    console.log(`[全天] ${event.title}`);
  } else {
    const time = util.formatDate(event.startDate, 'HH:mm');
    console.log(`[${time}] ${event.title}`);
  }
});
```

### 4. 验证时间顺序

```javascript
// ✅ 正确 - 确保结束时间晚于开始时间
const startDate = Date.now() + 3600000;
const endDate = startDate + 3600000;  // 1小时后

calendar.create({
  title: '会议',
  startDate: startDate,
  endDate: endDate
});

// ❌ 错误 - 结束时间早于开始时间
calendar.create({
  title: '会议',
  startDate: Date.now(),
  endDate: Date.now() - 3600000  // 无效
});
```

---

## 注意事项

1. **权限要求**: 首次使用需要请求日历访问权限
2. **iOS 17+**: iOS 17 及以上使用 `requestFullAccessToEvents` API
3. **时间戳**: 所有时间戳为毫秒级 Unix 时间戳
4. **全天事件**: 全天事件的开始和结束时间应设置为当天的 00:00:00
5. **日历 ID**: 如果不指定 calendarId，事件会添加到默认日历
6. **只读日历**: 某些日历（如订阅日历）不允许修改
7. **时区**: 时间戳使用设备本地时区
8. **线程安全**: 所有操作都是线程安全的
