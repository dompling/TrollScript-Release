# Shortcuts 快捷指令集成

Shortcuts 模块提供了与系统快捷指令 App 的集成功能。你可以使用它来运行快捷指令、管理快捷指令和捐赠 Siri 建议。

> **守护进程支持**: 不支持。运行快捷指令和打开 App 都需要前台 UI 交互，Daemon 模式下完全不可用。

---

## 快速开始

```javascript
// 检查快捷指令是否可用
if (shortcuts.isAvailable()) {
  console.log('快捷指令可用');

  // 运行快捷指令
  shortcuts.run('我的快捷指令');

  // 运行快捷指令并传入参数
  shortcuts.run('处理文本', 'Hello World');

  // 打开快捷指令 App
  shortcuts.open();
}

// 捐赠 Siri 建议
shortcuts.donateInteraction('打开工作模式', 'work-mode');
```

---

## API 参考

### 运行快捷指令

#### `shortcuts.run(name, input?)`
运行快捷指令。**参数:** `name` (string), `input` (string, 可选) **返回:** `boolean`

**注意:** 在 Daemon 模式下不可用。

```javascript
// 运行快捷指令
const success = shortcuts.run('我的快捷指令');
if (success) {
  console.log('快捷指令已启动');
}

// 运行快捷指令并传入文本
shortcuts.run('处理文本', 'Hello World');

// 运行快捷指令并传入 JSON
const data = JSON.stringify({ name: 'Alice', age: 25 });
shortcuts.run('处理数据', data);
```

#### `shortcuts.runWithCallback(name, input?)`
运行快捷指令并等待回调。**参数:** `name` (string), `input` (string, 可选) **返回:** `boolean`

使用 x-callback-url 模式，支持成功、取消和错误回调。

**注意:** 在 Daemon 模式下不可用。

```javascript
// 运行快捷指令并等待回调
const success = shortcuts.runWithCallback('我的快捷指令');
if (success) {
  console.log('快捷指令已启动，等待回调');
}

// 带参数运行
shortcuts.runWithCallback('处理文本', 'Hello World');
```

---

### 打开快捷指令

#### `shortcuts.open()`
打开快捷指令 App。**返回:** `boolean`

**注意:** 在 Daemon 模式下不可用。

```javascript
// 打开快捷指令 App
shortcuts.open();
```

#### `shortcuts.openGallery()`
打开快捷指令中心（Gallery）。**返回:** `boolean`

**注意:** 在 Daemon 模式下不可用。

```javascript
// 打开快捷指令中心
shortcuts.openGallery();
```

---

### 管理快捷指令

#### `shortcuts.create(name)`
创建新快捷指令。**参数:** `name` (string) **返回:** `boolean`

**注意:** 在 Daemon 模式下不可用。

```javascript
// 创建新快捷指令
shortcuts.create('我的新快捷指令');
```

#### `shortcuts.import(url)`
导入快捷指令。**参数:** `url` (string) **返回:** `boolean`

**注意:** 在 Daemon 模式下不可用。

```javascript
// 导入快捷指令
const url = 'https://www.icloud.com/shortcuts/xxxxx';
shortcuts.import(url);
```

---

### 检查可用性

#### `shortcuts.isAvailable()`
检查快捷指令是否可用。**返回:** `boolean`

```javascript
if (shortcuts.isAvailable()) {
  console.log('快捷指令可用');
  shortcuts.run('我的快捷指令');
} else {
  console.log('快捷指令不可用');
}
```

---

### Siri 建议

#### `shortcuts.donateInteraction(title, identifier)`
捐赠 Siri 建议。**参数:** `title` (string), `identifier` (string) **返回:** `boolean`

将操作捐赠给 Siri，让 Siri 可以在合适的时候建议用户执行该操作。

```javascript
// 捐赠 Siri 建议
const success = shortcuts.donateInteraction('打开工作模式', 'work-mode');
if (success) {
  console.log('Siri 建议已捐赠');
}

// 捐赠多个建议
shortcuts.donateInteraction('回家路线', 'route-home');
shortcuts.donateInteraction('睡眠模式', 'sleep-mode');
```

#### `shortcuts.deleteInteraction(identifier)`
删除 Siri 建议。**参数:** `identifier` (string) **返回:** `boolean`

```javascript
// 删除指定的 Siri 建议
shortcuts.deleteInteraction('work-mode');
```

#### `shortcuts.deleteAllInteractions()`
删除所有 Siri 建议。**返回:** `boolean`

```javascript
// 删除所有 Siri 建议
shortcuts.deleteAllInteractions();
console.log('所有 Siri 建议已删除');
```

---

## 完整示例

### 示例 1: 快捷指令自动化

```javascript
function runDailyRoutine() {
  if (!shortcuts.isAvailable()) {
    console.log('快捷指令不可用');
    return;
  }

  const hour = new Date().getHours();

  if (hour === 8) {
    // 早上 8 点：运行早晨例程
    console.log('运行早晨例程...');
    shortcuts.run('早晨例程');
    notification.send('早晨例程', '已启动早晨例程');
  } else if (hour === 18) {
    // 晚上 6 点：运行下班例程
    console.log('运行下班例程...');
    shortcuts.run('下班例程');
    notification.send('下班例程', '已启动下班例程');
  } else if (hour === 22) {
    // 晚上 10 点：运行睡前例程
    console.log('运行睡前例程...');
    shortcuts.run('睡前例程');
    notification.send('睡前例程', '已启动睡前例程');
  }
}

runDailyRoutine();
```

### 示例 2: 智能场景切换

```javascript
function switchScene(scene) {
  if (!shortcuts.isAvailable()) {
    console.log('快捷指令不可用');
    return false;
  }

  const scenes = {
    work: '工作模式',
    home: '回家模式',
    sleep: '睡眠模式',
    exercise: '运动模式'
  };

  const shortcutName = scenes[scene];
  if (!shortcutName) {
    console.error('未知场景:', scene);
    return false;
  }

  console.log(`切换到 ${shortcutName}...`);
  const success = shortcuts.run(shortcutName);

  if (success) {
    notification.send('场景切换', `已切换到${shortcutName}`);
    haptic.success();

    // 捐赠 Siri 建议
    shortcuts.donateInteraction(`切换到${shortcutName}`, `scene-${scene}`);
  }

  return success;
}

// 使用
switchScene('work');
```

### 示例 3: 数据处理管道

```javascript
function processData(data) {
  if (!shortcuts.isAvailable()) {
    console.log('快捷指令不可用');
    return;
  }

  // 将数据转换为 JSON
  const jsonData = JSON.stringify(data);

  console.log('发送数据到快捷指令处理...');

  // 运行数据处理快捷指令
  const success = shortcuts.run('数据处理器', jsonData);

  if (success) {
    console.log('数据已发送到快捷指令');
    notification.send('数据处理', '数据已发送到快捷指令处理');
  } else {
    console.error('发送失败');
  }
}

// 使用
const userData = {
  name: 'Alice',
  age: 25,
  email: 'alice@example.com'
};

processData(userData);
```

### 示例 4: Siri 建议管理

```javascript
function setupSiriSuggestions() {
  console.log('设置 Siri 建议...');

  const suggestions = [
    { title: '打开工作模式', id: 'work-mode' },
    { title: '回家路线', id: 'route-home' },
    { title: '睡眠模式', id: 'sleep-mode' },
    { title: '健身记录', id: 'fitness-log' },
    { title: '每日总结', id: 'daily-summary' }
  ];

  let success = 0;
  let failed = 0;

  suggestions.forEach(suggestion => {
    if (shortcuts.donateInteraction(suggestion.title, suggestion.id)) {
      console.log(`✓ ${suggestion.title}`);
      success++;
    } else {
      console.log(`✗ ${suggestion.title}`);
      failed++;
    }
  });

  console.log(`\n完成: 成功 ${success}, 失败 ${failed}`);
  notification.send('Siri 建议', `已设置 ${success} 个建议`);
}

function cleanupSiriSuggestions() {
  console.log('清理 Siri 建议...');
  shortcuts.deleteAllInteractions();
  console.log('所有 Siri 建议已删除');
}

// 使用
setupSiriSuggestions();
```

### 示例 5: 快捷指令库管理

```javascript
function importShortcuts(urls) {
  if (!shortcuts.isAvailable()) {
    console.log('快捷指令不可用');
    return;
  }

  console.log(`准备导入 ${urls.length} 个快捷指令...`);

  urls.forEach((url, index) => {
    console.log(`导入 ${index + 1}/${urls.length}: ${url}`);

    const success = shortcuts.import(url);
    if (success) {
      console.log('✓ 导入成功');
    } else {
      console.log('✗ 导入失败');
    }

    // 等待一下，避免太快
    util.sleep(2000);
  });

  console.log('导入完成');
  notification.send('快捷指令', '批量导入完成');
}

// 使用
const shortcutUrls = [
  'https://www.icloud.com/shortcuts/xxxxx1',
  'https://www.icloud.com/shortcuts/xxxxx2',
  'https://www.icloud.com/shortcuts/xxxxx3'
];

importShortcuts(shortcutUrls);
```

### 示例 6: 条件触发快捷指令

```javascript
function conditionalShortcut() {
  if (!shortcuts.isAvailable()) {
    return;
  }

  // 获取当前状态
  const battery = device.battery();
  const location = location.getCurrent();
  const hour = new Date().getHours();

  // 低电量提醒
  if (battery.level < 0.2 && !battery.isCharging) {
    console.log('电量低，运行省电模式快捷指令');
    shortcuts.run('省电模式');
    return;
  }

  // 到家自动化
  if (location) {
    const homeDistance = location.distance(
      location.lat, location.lng,
      39.9, 116.4  // 家的坐标
    );

    if (homeDistance < 100) {
      console.log('到家了，运行回家模式');
      shortcuts.run('回家模式');
      return;
    }
  }

  // 工作时间提醒
  if (hour >= 9 && hour < 18) {
    const today = calendar.getToday();
    if (today.length > 0) {
      console.log('有日程安排，运行工作模式');
      shortcuts.run('工作模式');
    }
  }
}

conditionalShortcut();
```

### 示例 7: 快捷指令与通知集成

```javascript
function notificationShortcut(title, message, shortcutName) {
  // 发送通知
  notification.send(title, message);

  // 等待用户点击通知（模拟）
  util.sleep(1000);

  // 运行快捷指令
  if (shortcuts.isAvailable()) {
    console.log(`运行快捷指令: ${shortcutName}`);
    shortcuts.run(shortcutName);
  }
}

// 使用
notificationShortcut(
  '会议提醒',
  '10 分钟后有会议',
  '会议准备'
);
```

---

## 最佳实践

### 1. 检查可用性

```javascript
// ✅ 正确
if (shortcuts.isAvailable()) {
  shortcuts.run('我的快捷指令');
}

// ❌ 错误 - 不检查可用性
shortcuts.run('我的快捷指令');  // 可能失败
```

### 2. 处理 Daemon 模式

```javascript
// ✅ 正确 - 检查环境
if (!DaemonEnvironment.isInDaemon && shortcuts.isAvailable()) {
  shortcuts.run('我的快捷指令');
} else {
  console.log('Daemon 模式下无法运行快捷指令');
}
```

### 3. 使用有意义的标识符

```javascript
// ✅ 正确 - 清晰的标识符
shortcuts.donateInteraction('打开工作模式', 'work-mode');
shortcuts.donateInteraction('回家路线', 'route-home');

// ❌ 错误 - 模糊的标识符
shortcuts.donateInteraction('操作1', 'action1');
```

### 4. 传递结构化数据

```javascript
// ✅ 正确 - 使用 JSON
const data = JSON.stringify({ name: 'Alice', age: 25 });
shortcuts.run('处理数据', data);

// ❌ 错误 - 传递对象
shortcuts.run('处理数据', { name: 'Alice' });  // 会被转换为字符串
```

---

## 注意事项

1. **Daemon 限制**: 运行快捷指令的功能在 Daemon 模式下不可用
2. **URL Scheme**: 使用 `shortcuts://` URL Scheme 与快捷指令 App 交互
3. **回调支持**: `runWithCallback` 使用 x-callback-url 模式，回调 URL 为 `trollscript://shortcut-callback`
4. **超时时间**: 所有操作的超时时间为 10 秒
5. **Siri 建议**: 捐赠的 Siri 建议会在系统中保留，直到被删除
6. **输入格式**: 快捷指令的输入参数为字符串，复杂数据需要使用 JSON
7. **异步执行**: 快捷指令在后台异步执行，无法直接获取返回值
8. **线程安全**: 所有操作都是线程安全的
