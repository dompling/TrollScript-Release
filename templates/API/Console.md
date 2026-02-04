# Console 控制台

Console 模块提供了标准的控制台日志输出功能。你可以使用它来输出不同级别的日志信息，帮助调试和监控脚本运行状态。

> **守护进程支持**: 完全支持。在触发器模式下可正常运行，日志会被记录到系统日志中。

---

## 目录

- [快速开始](#快速开始)
- [API 参考](#api-参考)
  - [console.log()](#consolelog)
  - [console.error()](#consoleerror)
  - [console.warn()](#consolewarn)
  - [console.info()](#consoleinfo)
  - [console.debug()](#consoledebug)
  - [console.clear()](#consoleclear)
- [完整示例](#完整示例)
- [最佳实践](#最佳实践)

---

## 快速开始

使用 console 模块输出日志非常简单：

```javascript
// 输出普通日志
console.log('Hello TrollScript!');

// 输出多个参数
console.log('用户:', 'Alice', '年龄:', 25);

// 输出对象
const user = { name: 'Bob', age: 30 };
console.log('用户信息:', user);
```

---

## API 参考

### `console.log(...args)`

输出普通日志信息。

**参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `...args` | `any` | 否 | 要输出的内容，支持多个参数 |

**返回:** `void`

```javascript
console.log('这是一条普通日志');
console.log('数值:', 42, '字符串:', 'hello');
console.log({ key: 'value', count: 10 });
```

---

### `console.error(...args)`

输出错误日志信息。

**参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `...args` | `any` | 否 | 要输出的错误内容 |

**返回:** `void`

```javascript
console.error('发生错误:', error.message);
console.error('无法连接到服务器');
```

---

### `console.warn(...args)`

输出警告日志信息。

**参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `...args` | `any` | 否 | 要输出的警告内容 |

**返回:** `void`

```javascript
console.warn('警告: 磁盘空间不足');
console.warn('API 调用次数接近限制');
```

---

### `console.info(...args)`

输出信息日志。

**参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `...args` | `any` | 否 | 要输出的信息内容 |

**返回:** `void`

```javascript
console.info('脚本启动成功');
console.info('当前版本:', '1.0.0');
```

---

### `console.debug(...args)`

输出调试日志信息。

**参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `...args` | `any` | 否 | 要输出的调试内容 |

**返回:** `void`

```javascript
console.debug('进入函数 processData');
console.debug('变量值:', someVariable);
```

---

### `console.clear()`

清空控制台输出。

**返回:** `void`

```javascript
console.clear();
```

---

## 完整示例

### 示例 1: 基础日志输出

```javascript
// 不同级别的日志
console.log('这是普通日志');
console.info('这是信息日志');
console.warn('这是警告日志');
console.error('这是错误日志');
console.debug('这是调试日志');
```

---

### 示例 2: 输出复杂对象

```javascript
const user = {
  name: 'Alice',
  age: 25,
  hobbies: ['reading', 'coding'],
  address: {
    city: 'Beijing',
    country: 'China'
  }
};

console.log('用户信息:', user);
// 输出: 用户信息: {"name":"Alice","age":25,"hobbies":["reading","coding"],"address":{"city":"Beijing","country":"China"}}
```

---

### 示例 3: 调试脚本执行流程

```javascript
console.log('=== 脚本开始执行 ===');

try {
  console.debug('步骤 1: 读取配置文件');
  const config = storage.read('config');

  console.debug('步骤 2: 处理数据');
  const result = processData(config);

  console.info('处理完成，结果:', result);
} catch (error) {
  console.error('执行失败:', error.message);
} finally {
  console.log('=== 脚本执行结束 ===');
}
```

---

### 示例 4: 性能监控

```javascript
const startTime = Date.now();

console.log('开始执行任务...');

// 执行一些操作
for (let i = 0; i < 1000; i++) {
  // 模拟耗时操作
}

const endTime = Date.now();
const duration = endTime - startTime;

console.info(`任务完成，耗时: ${duration}ms`);

if (duration > 1000) {
  console.warn('任务执行时间过长，建议优化');
}
```

---

### 示例 5: 条件日志输出

```javascript
const DEBUG_MODE = true;

function debugLog(...args) {
  if (DEBUG_MODE) {
    console.debug('[DEBUG]', ...args);
  }
}

debugLog('这条日志只在调试模式下显示');
debugLog('变量值:', someVariable);
```

---

## 最佳实践

### 1. 使用合适的日志级别

根据信息的重要性选择合适的日志级别：

```javascript
// ✅ 正确
console.error('数据库连接失败');  // 错误
console.warn('缓存即将过期');     // 警告
console.info('用户登录成功');     // 信息
console.debug('变量值: x=10');    // 调试

// ❌ 错误
console.log('数据库连接失败');    // 应该用 error
```

### 2. 输出有意义的信息

日志应该包含足够的上下文信息：

```javascript
// ✅ 正确
console.error('无法连接到 API:', apiUrl, '错误:', error.message);

// ❌ 错误
console.error('错误');  // 信息不足
```

### 3. 避免输出敏感信息

不要在日志中输出密码、密钥等敏感信息：

```javascript
// ✅ 正确
console.log('用户登录:', username);

// ❌ 错误
console.log('用户登录:', username, '密码:', password);
```

### 4. 使用结构化日志

对于复杂的日志，使用对象格式：

```javascript
// ✅ 正确
console.log('API 请求', {
  method: 'POST',
  url: '/api/users',
  status: 200,
  duration: '150ms'
});

// ❌ 较差
console.log('API 请求 POST /api/users 200 150ms');
```

### 5. 在生产环境控制日志输出

在生产环境中，可以通过配置控制日志级别：

```javascript
const LOG_LEVEL = storage.read('logLevel') || 'info';

function shouldLog(level) {
  const levels = ['debug', 'info', 'warn', 'error'];
  const currentLevel = levels.indexOf(LOG_LEVEL);
  const messageLevel = levels.indexOf(level);
  return messageLevel >= currentLevel;
}

function log(level, ...args) {
  if (shouldLog(level)) {
    console[level](...args);
  }
}

// 使用
log('debug', '这条日志可能不会显示');
log('error', '这条错误日志总是会显示');
```

### 6. 添加时间戳和标签

为日志添加时间戳和标签，便于追踪：

```javascript
function logWithTimestamp(level, tag, ...args) {
  const timestamp = new Date().toISOString();
  console[level](`[${timestamp}] [${tag}]`, ...args);
}

logWithTimestamp('info', 'AUTH', '用户登录成功');
logWithTimestamp('error', 'DB', '数据库查询失败');
```

---

## 注意事项

1. **对象输出**: 对象和数组会自动使用 `JSON.stringify` 格式化输出
2. **多参数**: 支持传入多个参数，会用空格连接
3. **守护进程模式**: 在 Daemon 模式下，日志会被记录到系统日志中，可以通过主应用查看
4. **性能影响**: 频繁的日志输出可能影响性能，在生产环境中应适当控制日志级别
