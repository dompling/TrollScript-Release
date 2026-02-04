# Storage 本地存储

Storage 模块提供了简单易用的本地存储功能。你可以使用它来保存和读取各种类型的数据，包括字符串、数字、布尔值、对象和数组。

> **守护进程支持**: 完全支持。在触发器模式下可正常运行，与主应用共享存储数据。

---

## 目录

- [快速开始](#快速开始)
- [API 参考](#api-参考)
  - [storage.get()](#storageget)
  - [storage.set()](#storageset)
  - [storage.remove()](#storageremove)
  - [storage.clear()](#storageclear)
  - [storage.has()](#storagehas)
  - [storage.keys()](#storagekeys)
- [完整示例](#完整示例)
- [最佳实践](#最佳实践)

---

## 快速开始

使用 Storage 模块非常简单：

```javascript
// 保存数据
storage.set('username', 'Alice');
storage.set('age', 25);
storage.set('settings', { theme: 'dark', language: 'zh' });

// 读取数据
const username = storage.get('username');
console.log('用户名:', username);  // 输出: 用户名: Alice

// 检查键是否存在
if (storage.has('username')) {
  console.log('用户名已设置');
}

// 删除数据
storage.remove('age');

// 清空所有数据
storage.clear();
```

---

## API 参考

### `storage.get(key)`

获取存储的值。

**参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `key` | `string` | 是 | 存储键名 |

**返回:** `any` — 存储的值，如果键不存在则返回 `undefined`

**支持的数据类型:**
- `string` - 字符串
- `number` - 数字（整数或浮点数）
- `boolean` - 布尔值
- `object` - 对象
- `array` - 数组

```javascript
// 读取字符串
const name = storage.get('name');

// 读取数字
const age = storage.get('age');

// 读取对象
const user = storage.get('user');
console.log(user.name, user.age);

// 读取数组
const tags = storage.get('tags');
console.log(tags[0]);

// 键不存在时返回 undefined
const notExist = storage.get('not_exist');
console.log(notExist);  // undefined
```

---

### `storage.set(key, value)`

设置存储值。

**参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `key` | `string` | 是 | 存储键名 |
| `value` | `any` | 是 | 要存储的值 |

**返回:** `void`

**支持的值类型:**
- 字符串、数字、布尔值
- 对象和数组（会自动序列化）
- `null` 或 `undefined` 会删除该键

```javascript
// 保存字符串
storage.set('name', 'Alice');

// 保存数字
storage.set('age', 25);
storage.set('price', 99.99);

// 保存布尔值
storage.set('isActive', true);

// 保存对象
storage.set('user', {
  name: 'Bob',
  age: 30,
  email: 'bob@example.com'
});

// 保存数组
storage.set('tags', ['javascript', 'ios', 'automation']);

// 保存嵌套结构
storage.set('config', {
  theme: 'dark',
  notifications: {
    enabled: true,
    sound: 'default'
  },
  recentFiles: ['file1.js', 'file2.js']
});

// 设置为 null 或 undefined 会删除该键
storage.set('temp', null);  // 等同于 storage.remove('temp')
```

---

### `storage.remove(key)`

删除指定的存储项。

**参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `key` | `string` | 是 | 要删除的键名 |

**返回:** `void`

```javascript
storage.remove('username');
console.log(storage.get('username'));  // undefined
```

---

### `storage.clear()`

清空所有存储数据。

**返回:** `void`

```javascript
storage.clear();
console.log(storage.keys());  // []
```

**警告:** 此操作会删除所有存储的数据，无法恢复！

---

### `storage.has(key)`

检查指定的键是否存在。

**参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `key` | `string` | 是 | 要检查的键名 |

**返回:** `boolean` — 如果键存在返回 `true`，否则返回 `false`

```javascript
storage.set('username', 'Alice');

if (storage.has('username')) {
  console.log('用户名已设置');
} else {
  console.log('用户名未设置');
}
```

---

### `storage.keys()`

获取所有存储的键名列表。

**返回:** `string[]` — 所有键名的数组

```javascript
storage.set('name', 'Alice');
storage.set('age', 25);
storage.set('city', 'Beijing');

const keys = storage.keys();
console.log(keys);  // ['name', 'age', 'city']

// 遍历所有存储项
keys.forEach(key => {
  const value = storage.get(key);
  console.log(`${key}: ${value}`);
});
```

---

## 完整示例

### 示例 1: 用户配置管理

```javascript
// 保存用户配置
function saveUserConfig(config) {
  storage.set('user_config', config);
  console.log('配置已保存');
}

// 读取用户配置
function getUserConfig() {
  const defaultConfig = {
    theme: 'light',
    language: 'zh',
    notifications: true
  };

  const config = storage.get('user_config');
  return config || defaultConfig;
}

// 更新单个配置项
function updateConfigItem(key, value) {
  const config = getUserConfig();
  config[key] = value;
  saveUserConfig(config);
}

// 使用
saveUserConfig({
  theme: 'dark',
  language: 'en',
  notifications: false
});

const config = getUserConfig();
console.log('当前主题:', config.theme);

updateConfigItem('theme', 'light');
```

---

### 示例 2: 数据缓存

```javascript
// 缓存 API 响应数据
function cacheApiResponse(endpoint, data, ttl = 3600) {
  const cacheKey = `cache_${endpoint}`;
  const cacheData = {
    data: data,
    timestamp: Date.now(),
    ttl: ttl * 1000  // 转换为毫秒
  };

  storage.set(cacheKey, cacheData);
  console.log(`已缓存: ${endpoint}`);
}

// 获取缓存数据
function getCachedData(endpoint) {
  const cacheKey = `cache_${endpoint}`;
  const cached = storage.get(cacheKey);

  if (!cached) {
    return null;
  }

  // 检查是否过期
  const now = Date.now();
  if (now - cached.timestamp > cached.ttl) {
    storage.remove(cacheKey);
    console.log('缓存已过期');
    return null;
  }

  console.log('使用缓存数据');
  return cached.data;
}

// 使用
const apiData = { users: ['Alice', 'Bob'], count: 2 };
cacheApiResponse('/api/users', apiData, 1800);

// 稍后获取
const data = getCachedData('/api/users');
if (data) {
  console.log('用户列表:', data.users);
} else {
  console.log('需要重新获取数据');
}
```

---

### 示例 3: 计数器和统计

```javascript
// 增加计数器
function incrementCounter(name) {
  const current = storage.get(name) || 0;
  const newValue = current + 1;
  storage.set(name, newValue);
  return newValue;
}

// 获取计数器值
function getCounter(name) {
  return storage.get(name) || 0;
}

// 重置计数器
function resetCounter(name) {
  storage.remove(name);
}

// 使用
const scriptRuns = incrementCounter('script_runs');
console.log(`脚本已运行 ${scriptRuns} 次`);

const errorCount = incrementCounter('error_count');
console.log(`错误次数: ${errorCount}`);

// 重置错误计数
resetCounter('error_count');
```

---

### 示例 4: 历史记录管理

```javascript
// 添加历史记录
function addToHistory(item, maxItems = 50) {
  const history = storage.get('history') || [];

  // 避免重复
  const index = history.findIndex(h => h.id === item.id);
  if (index !== -1) {
    history.splice(index, 1);
  }

  // 添加到开头
  history.unshift({
    ...item,
    timestamp: Date.now()
  });

  // 限制数量
  if (history.length > maxItems) {
    history.pop();
  }

  storage.set('history', history);
}

// 获取历史记录
function getHistory(limit = 10) {
  const history = storage.get('history') || [];
  return history.slice(0, limit);
}

// 清空历史记录
function clearHistory() {
  storage.remove('history');
}

// 搜索历史记录
function searchHistory(keyword) {
  const history = storage.get('history') || [];
  return history.filter(item =>
    item.title.includes(keyword) ||
    item.content.includes(keyword)
  );
}

// 使用
addToHistory({
  id: '1',
  title: '测试脚本',
  content: 'console.log("Hello")'
});

const recent = getHistory(5);
console.log('最近的历史记录:', recent);

const results = searchHistory('测试');
console.log('搜索结果:', results);
```

---

### 示例 5: 应用状态管理

```javascript
// 保存应用状态
function saveAppState(state) {
  storage.set('app_state', {
    ...state,
    lastUpdated: Date.now()
  });
}

// 恢复应用状态
function restoreAppState() {
  const state = storage.get('app_state');

  if (!state) {
    return getDefaultState();
  }

  console.log('恢复应用状态，上次更新:', new Date(state.lastUpdated));
  return state;
}

// 默认状态
function getDefaultState() {
  return {
    currentPage: 'home',
    filters: {},
    sortBy: 'date',
    viewMode: 'list'
  };
}

// 使用
const state = restoreAppState();
console.log('当前页面:', state.currentPage);

// 更新状态
state.currentPage = 'settings';
state.viewMode = 'grid';
saveAppState(state);
```

---

### 示例 6: 数据导出和导入

```javascript
// 导出所有数据
function exportAllData() {
  const keys = storage.keys();
  const data = {};

  keys.forEach(key => {
    data[key] = storage.get(key);
  });

  const json = JSON.stringify(data, null, 2);
  clipboard.setText(json);
  console.log('数据已导出到剪贴板');

  return json;
}

// 导入数据
function importData(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    let count = 0;

    for (const key in data) {
      storage.set(key, data[key]);
      count++;
    }

    console.log(`已导入 ${count} 个数据项`);
    return true;
  } catch (error) {
    console.error('导入失败:', error.message);
    return false;
  }
}

// 备份数据
function backupData() {
  const backup = exportAllData();
  const timestamp = util.formatDate(Date.now(), 'yyyyMMdd_HHmmss');
  const filename = `backup_${timestamp}.json`;

  file.write(`/var/mobile/Documents/${filename}`, backup);
  console.log('备份已保存:', filename);
}

// 使用
backupData();

// 从剪贴板导入
const jsonData = clipboard.getText();
importData(jsonData);
```

---

### 示例 7: 键值对管理工具

```javascript
// 列出所有存储项
function listAllStorage() {
  const keys = storage.keys();

  console.log(`=== 存储项列表 (共 ${keys.length} 项) ===`);

  keys.forEach(key => {
    const value = storage.get(key);
    const type = typeof value;
    const preview = JSON.stringify(value).substring(0, 50);

    console.log(`${key} [${type}]: ${preview}...`);
  });
}

// 查找包含关键词的键
function findKeys(keyword) {
  const keys = storage.keys();
  return keys.filter(key => key.includes(keyword));
}

// 批量删除
function removeByPrefix(prefix) {
  const keys = storage.keys();
  let count = 0;

  keys.forEach(key => {
    if (key.startsWith(prefix)) {
      storage.remove(key);
      count++;
    }
  });

  console.log(`已删除 ${count} 个以 "${prefix}" 开头的项`);
}

// 使用
listAllStorage();

const cacheKeys = findKeys('cache_');
console.log('缓存键:', cacheKeys);

removeByPrefix('temp_');
```

---

## 最佳实践

### 1. 使用有意义的键名

使用清晰、描述性的键名，避免冲突：

```javascript
// ✅ 正确 - 使用命名空间
storage.set('user_settings', config);
storage.set('app_cache_users', data);
storage.set('script_run_count', count);

// ❌ 错误 - 键名不清晰
storage.set('data', config);
storage.set('temp', data);
storage.set('x', count);
```

### 2. 提供默认值

读取数据时提供默认值，避免 undefined：

```javascript
// ✅ 正确
const config = storage.get('config') || { theme: 'light' };
const count = storage.get('count') || 0;

// ❌ 错误 - 没有处理 undefined
const config = storage.get('config');
console.log(config.theme);  // 如果不存在会报错
```

### 3. 检查键是否存在

在读取前检查键是否存在：

```javascript
// ✅ 正确
if (storage.has('user_data')) {
  const data = storage.get('user_data');
  processData(data);
} else {
  console.log('数据不存在');
}

// ❌ 较差
const data = storage.get('user_data');
if (data) {  // 如果值为 0 或 false 会误判
  processData(data);
}
```

### 4. 避免存储敏感信息

不要在 Storage 中存储密码、密钥等敏感信息：

```javascript
// ✅ 正确 - 只存储非敏感信息
storage.set('username', 'alice');
storage.set('last_login', Date.now());

// ❌ 错误 - 存储敏感信息
storage.set('password', '123456');  // 不安全！
storage.set('api_key', 'secret_key');  // 不安全！
```

### 5. 定期清理过期数据

实现数据过期机制，避免存储空间浪费：

```javascript
// ✅ 正确 - 带过期时间的存储
function setWithExpiry(key, value, ttl) {
  const item = {
    value: value,
    expiry: Date.now() + ttl
  };
  storage.set(key, item);
}

function getWithExpiry(key) {
  const item = storage.get(key);
  if (!item) return null;

  if (Date.now() > item.expiry) {
    storage.remove(key);
    return null;
  }

  return item.value;
}
```

### 6. 使用命名空间避免冲突

为不同功能使用不同的键前缀：

```javascript
// ✅ 正确 - 使用前缀
const CACHE_PREFIX = 'cache_';
const CONFIG_PREFIX = 'config_';
const TEMP_PREFIX = 'temp_';

storage.set(`${CACHE_PREFIX}users`, data);
storage.set(`${CONFIG_PREFIX}theme`, 'dark');
storage.set(`${TEMP_PREFIX}download`, file);
```

### 7. 批量操作要谨慎

批量操作时要考虑性能：

```javascript
// ✅ 正确 - 批量操作后一次性保存
const data = storage.get('bulk_data') || {};
data.item1 = 'value1';
data.item2 = 'value2';
data.item3 = 'value3';
storage.set('bulk_data', data);

// ❌ 错误 - 频繁写入
storage.set('item1', 'value1');
storage.set('item2', 'value2');
storage.set('item3', 'value3');
```

---

## 注意事项

1. **数据持久化**: 存储的数据会持久保存，即使应用重启也不会丢失
2. **数据共享**: 在 Daemon 模式和主应用之间共享存储数据
3. **数据类型**: 支持字符串、数字、布尔值、对象和数组，会自动序列化和反序列化
4. **存储限制**: 虽然没有硬性限制，但不建议存储过大的数据（如大文件）
5. **线程安全**: Storage 操作是线程安全的，可以在任何线程调用
6. **性能考虑**: 频繁的读写操作可能影响性能，建议批量操作
7. **数据安全**: 存储的数据未加密，不要存储敏感信息
8. **键名规范**: 键名区分大小写，建议使用小写字母和下划线
