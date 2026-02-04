# Util 工具函数

Util 模块提供了一系列实用的工具函数，包括 UUID 生成、哈希计算、Base64 编解码、日期格式化等常用功能。

> **守护进程支持**: 完全支持。在触发器模式下可正常运行，所有工具函数都可以正常使用。

---

## 目录

- [快速开始](#快速开始)
- [API 参考](#api-参考)
  - [util.uuid()](#utiluuid)
  - [util.md5()](#utilmd5)
  - [util.sha256()](#utilsha256)
  - [util.base64Encode()](#utilbase64encode)
  - [util.base64Decode()](#utilbase64decode)
  - [util.formatDate()](#utilformatdate)
  - [util.now()](#utilnow)
  - [util.sleep()](#utilsleep)
- [完整示例](#完整示例)
- [最佳实践](#最佳实践)

---

## 快速开始

使用 Util 模块的工具函数非常简单：

```javascript
// 生成 UUID
const id = util.uuid();
console.log('UUID:', id);

// 计算 MD5
const hash = util.md5('Hello World');
console.log('MD5:', hash);

// Base64 编码
const encoded = util.base64Encode('Hello');
console.log('编码:', encoded);

// 格式化日期
const formatted = util.formatDate(Date.now(), 'yyyy-MM-dd HH:mm:ss');
console.log('时间:', formatted);

// 延迟执行
util.sleep(1000);  // 暂停 1 秒
console.log('1秒后执行');
```

---

## API 参考

### `util.uuid()`

生成一个随机的 UUID（通用唯一识别码）。

**返回:** `string` — UUID 字符串（格式：XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX）

```javascript
const id = util.uuid();
console.log(id);
// 输出: 550E8400-E29B-41D4-A716-446655440000

// 用作唯一标识符
const taskId = util.uuid();
storage.set(`task_${taskId}`, {
  name: '任务1',
  status: 'pending'
});
```

---

### `util.md5(string)`

计算字符串的 MD5 哈希值。

**参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `string` | `string` | 是 | 要计算哈希的字符串 |

**返回:** `string` — 32 位小写十六进制 MD5 哈希值

```javascript
const hash = util.md5('Hello World');
console.log(hash);
// 输出: b10a8db164e0754105b7a99be72e3fe5

// 用于数据校验
const data = 'important data';
const checksum = util.md5(data);
storage.set('data_checksum', checksum);

// 后续验证
const storedChecksum = storage.get('data_checksum');
if (util.md5(data) === storedChecksum) {
  console.log('数据完整');
} else {
  console.log('数据已被修改');
}
```

**注意:** MD5 不适合用于安全敏感场景，建议使用 SHA256。

---

### `util.sha256(string)`

计算字符串的 SHA256 哈希值。

**参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `string` | `string` | 是 | 要计算哈希的字符串 |

**返回:** `string` — 64 位小写十六进制 SHA256 哈希值

```javascript
const hash = util.sha256('Hello World');
console.log(hash);
// 输出: a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e

// 用于安全校验
const password = 'user_password';
const hashedPassword = util.sha256(password);
console.log('密码哈希:', hashedPassword);
```

---

### `util.base64Encode(string)`

将字符串编码为 Base64 格式。

**参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `string` | `string` | 是 | 要编码的字符串 |

**返回:** `string` — Base64 编码后的字符串

```javascript
const encoded = util.base64Encode('Hello World');
console.log(encoded);
// 输出: SGVsbG8gV29ybGQ=

// 编码中文
const chineseEncoded = util.base64Encode('你好世界');
console.log(chineseEncoded);
// 输出: 5L2g5aW95LiW55WM

// 用于数据传输
const data = JSON.stringify({ name: 'Alice', age: 25 });
const encodedData = util.base64Encode(data);
clipboard.setText(encodedData);
```

---

### `util.base64Decode(string)`

将 Base64 编码的字符串解码为原始字符串。

**参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `string` | `string` | 是 | Base64 编码的字符串 |

**返回:** `string` — 解码后的原始字符串

```javascript
const decoded = util.base64Decode('SGVsbG8gV29ybGQ=');
console.log(decoded);
// 输出: Hello World

// 解码中文
const chineseDecoded = util.base64Decode('5L2g5aW95LiW55WM');
console.log(chineseDecoded);
// 输出: 你好世界

// 解码数据
const encodedData = clipboard.getText();
try {
  const decodedData = util.base64Decode(encodedData);
  const data = JSON.parse(decodedData);
  console.log('解码成功:', data);
} catch (error) {
  console.error('解码失败:', error);
}
```

---

### `util.formatDate(timestamp, format?)`

将时间戳格式化为指定格式的日期字符串。

**参数:**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `timestamp` | `number` | 是 | - | 时间戳（毫秒） |
| `format` | `string` | 否 | `'yyyy-MM-dd HH:mm:ss'` | 日期格式 |

**返回:** `string` — 格式化后的日期字符串

**常用格式:**
- `yyyy-MM-dd HH:mm:ss` - 完整日期时间（默认）
- `yyyy-MM-dd` - 仅日期
- `HH:mm:ss` - 仅时间
- `HH:mm:ss.SSS` - 带毫秒的时间
- 自定义格式（如 `yyyy年MM月dd日`）

**格式占位符:**
- `yyyy` - 四位年份
- `MM` - 两位月份（01-12）
- `dd` - 两位日期（01-31）
- `HH` - 两位小时（00-23）
- `mm` - 两位分钟（00-59）
- `ss` - 两位秒（00-59）
- `SSS` - 三位毫秒（000-999）

```javascript
const now = Date.now();

// 默认格式
const formatted1 = util.formatDate(now);
console.log(formatted1);
// 输出: 2024-01-15 14:30:45

// 仅日期
const formatted2 = util.formatDate(now, 'yyyy-MM-dd');
console.log(formatted2);
// 输出: 2024-01-15

// 仅时间
const formatted3 = util.formatDate(now, 'HH:mm:ss');
console.log(formatted3);
// 输出: 14:30:45

// 带毫秒
const formatted4 = util.formatDate(now, 'HH:mm:ss.SSS');
console.log(formatted4);
// 输出: 14:30:45.123

// 中文格式
const formatted5 = util.formatDate(now, 'yyyy年MM月dd日 HH:mm');
console.log(formatted5);
// 输出: 2024年01月15日 14:30

// 自定义格式
const formatted6 = util.formatDate(now, 'yyyy/MM/dd HH:mm');
console.log(formatted6);
// 输出: 2024/01/15 14:30
```

---

### `util.now()`

获取当前时间戳（毫秒）。

**返回:** `number` — 当前时间戳（毫秒）

```javascript
const timestamp = util.now();
console.log('当前时间戳:', timestamp);
// 输出: 1705305045123

// 等同于
const timestamp2 = Date.now();

// 用于计时
const startTime = util.now();
// 执行一些操作
const endTime = util.now();
const duration = endTime - startTime;
console.log(`耗时: ${duration}ms`);
```

---

### `util.sleep(ms)`

暂停执行指定的毫秒数。

**参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `ms` | `number` | 是 | 暂停的毫秒数 |

**返回:** `void`

```javascript
console.log('开始');
util.sleep(1000);  // 暂停 1 秒
console.log('1秒后');

util.sleep(2000);  // 暂停 2 秒
console.log('再过2秒');

// 用于延迟执行
function delayedAction() {
  console.log('准备执行...');
  util.sleep(500);
  console.log('执行！');
}
```

**注意:** `sleep` 会阻塞当前线程，不建议在需要响应的场景中使用过长的延迟。

---

## 完整示例

### 示例 1: 生成唯一文件名

```javascript
function generateUniqueFilename(extension) {
  const uuid = util.uuid();
  const timestamp = util.formatDate(util.now(), 'yyyyMMdd_HHmmss');
  return `file_${timestamp}_${uuid.substring(0, 8)}.${extension}`;
}

const filename = generateUniqueFilename('txt');
console.log('文件名:', filename);
// 输出: file_20240115_143045_550e8400.txt
```

---

### 示例 2: 数据完整性校验

```javascript
// 保存数据并计算校验和
function saveDataWithChecksum(key, data) {
  const jsonData = JSON.stringify(data);
  const checksum = util.sha256(jsonData);

  storage.set(key, data);
  storage.set(`${key}_checksum`, checksum);

  console.log('数据已保存，校验和:', checksum);
}

// 读取数据并验证完整性
function loadDataWithVerification(key) {
  const data = storage.get(key);
  const storedChecksum = storage.get(`${key}_checksum`);

  if (!data || !storedChecksum) {
    console.error('数据不存在');
    return null;
  }

  const jsonData = JSON.stringify(data);
  const currentChecksum = util.sha256(jsonData);

  if (currentChecksum !== storedChecksum) {
    console.error('数据完整性验证失败！');
    return null;
  }

  console.log('数据完整性验证通过');
  return data;
}

// 使用
saveDataWithChecksum('user_data', {
  name: 'Alice',
  age: 25,
  email: 'alice@example.com'
});

const userData = loadDataWithVerification('user_data');
console.log('用户数据:', userData);
```

---

### 示例 3: 简单的加密/解密

```javascript
// 简单的 Base64 "加密"（仅用于混淆，不安全）
function simpleEncrypt(text) {
  return util.base64Encode(text);
}

function simpleDecrypt(encrypted) {
  try {
    return util.base64Decode(encrypted);
  } catch (error) {
    console.error('解密失败:', error);
    return null;
  }
}

// 使用
const secret = '这是一个秘密消息';
const encrypted = simpleEncrypt(secret);
console.log('加密后:', encrypted);

const decrypted = simpleDecrypt(encrypted);
console.log('解密后:', decrypted);

// 注意：这不是真正的加密，只是编码！
```

---

### 示例 4: 日志记录系统

```javascript
// 带时间戳的日志记录
function log(level, message) {
  const timestamp = util.formatDate(util.now(), 'yyyy-MM-dd HH:mm:ss.SSS');
  const logEntry = `[${timestamp}] [${level}] ${message}`;

  console.log(logEntry);

  // 保存到存储
  const logs = storage.get('app_logs') || [];
  logs.push({
    timestamp: util.now(),
    level: level,
    message: message
  });

  // 只保留最近 1000 条
  if (logs.length > 1000) {
    logs.shift();
  }

  storage.set('app_logs', logs);
}

// 使用
log('INFO', '应用启动');
log('DEBUG', '正在加载配置');
log('ERROR', '连接失败');

// 导出日志
function exportLogs() {
  const logs = storage.get('app_logs') || [];
  let logText = '';

  logs.forEach(log => {
    const timestamp = util.formatDate(log.timestamp, 'yyyy-MM-dd HH:mm:ss');
    logText += `[${timestamp}] [${log.level}] ${log.message}\n`;
  });

  return logText;
}

const logContent = exportLogs();
file.write('/var/mobile/Documents/app.log', logContent);
```

---

### 示例 5: 性能监控

```javascript
// 性能计时器
class PerformanceTimer {
  constructor(name) {
    this.name = name;
    this.startTime = util.now();
  }

  lap(label) {
    const now = util.now();
    const duration = now - this.startTime;
    console.log(`[${this.name}] ${label}: ${duration}ms`);
    return duration;
  }

  end() {
    const duration = this.lap('总耗时');
    return duration;
  }
}

// 使用
const timer = new PerformanceTimer('数据处理');

// 步骤 1
console.log('开始读取数据...');
const data = storage.get('large_data');
timer.lap('读取数据');

// 步骤 2
console.log('开始处理数据...');
// 处理数据...
timer.lap('处理数据');

// 步骤 3
console.log('开始保存结果...');
storage.set('result', data);
timer.lap('保存结果');

timer.end();
```

---

### 示例 6: 重试机制

```javascript
// 带延迟的重试函数
function retryWithDelay(fn, maxRetries = 3, delayMs = 1000) {
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      console.log(`尝试 ${attempt + 1}/${maxRetries}...`);
      const result = fn();
      console.log('成功！');
      return result;
    } catch (error) {
      attempt++;
      console.error(`失败: ${error.message}`);

      if (attempt < maxRetries) {
        console.log(`等待 ${delayMs}ms 后重试...`);
        util.sleep(delayMs);
      } else {
        console.error('已达到最大重试次数');
        throw error;
      }
    }
  }
}

// 使用
function unreliableOperation() {
  // 模拟可能失败的操作
  if (Math.random() < 0.7) {
    throw new Error('操作失败');
  }
  return '操作成功';
}

try {
  const result = retryWithDelay(unreliableOperation, 5, 500);
  console.log('结果:', result);
} catch (error) {
  console.error('最终失败:', error);
}
```

---

### 示例 7: 缓存系统

```javascript
// 带过期时间和校验的缓存
class Cache {
  constructor(prefix = 'cache_') {
    this.prefix = prefix;
  }

  set(key, value, ttlSeconds = 3600) {
    const fullKey = this.prefix + key;
    const data = JSON.stringify(value);
    const checksum = util.md5(data);

    const cacheEntry = {
      data: value,
      checksum: checksum,
      timestamp: util.now(),
      ttl: ttlSeconds * 1000
    };

    storage.set(fullKey, cacheEntry);
  }

  get(key) {
    const fullKey = this.prefix + key;
    const entry = storage.get(fullKey);

    if (!entry) {
      return null;
    }

    // 检查是否过期
    const now = util.now();
    if (now - entry.timestamp > entry.ttl) {
      storage.remove(fullKey);
      console.log('缓存已过期');
      return null;
    }

    // 验证数据完整性
    const data = JSON.stringify(entry.data);
    const checksum = util.md5(data);

    if (checksum !== entry.checksum) {
      console.error('缓存数据已损坏');
      storage.remove(fullKey);
      return null;
    }

    return entry.data;
  }

  clear() {
    const keys = storage.keys();
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        storage.remove(key);
      }
    });
  }
}

// 使用
const cache = new Cache('api_');

// 缓存 API 响应
cache.set('users', [{ name: 'Alice' }, { name: 'Bob' }], 1800);

// 获取缓存
const users = cache.get('users');
if (users) {
  console.log('使用缓存:', users);
} else {
  console.log('缓存未命中，需要重新获取');
}
```

---

### 示例 8: 批处理工具

```javascript
// 批量处理数据，带进度显示
function batchProcess(items, processor, batchSize = 10, delayMs = 100) {
  const total = items.length;
  const startTime = util.now();

  console.log(`开始处理 ${total} 个项目...`);

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    try {
      processor(item, i);
    } catch (error) {
      console.error(`处理项目 ${i} 失败:`, error.message);
    }

    // 每处理一批后暂停
    if ((i + 1) % batchSize === 0) {
      const progress = ((i + 1) / total * 100).toFixed(1);
      const elapsed = util.now() - startTime;
      const avgTime = elapsed / (i + 1);
      const remaining = Math.round(avgTime * (total - i - 1));

      console.log(`进度: ${i + 1}/${total} (${progress}%), 预计剩余: ${remaining}ms`);

      if (i + 1 < items.length) {
        util.sleep(delayMs);
      }
    }
  }

  const totalTime = util.now() - startTime;
  console.log(`处理完成！总耗时: ${totalTime}ms`);
}

// 使用
const items = Array.from({ length: 100 }, (_, i) => i);

batchProcess(items, (item, index) => {
  // 处理每个项目
  const result = item * 2;
  console.log(`处理项目 ${index}: ${item} -> ${result}`);
}, 20, 50);
```

---

## 最佳实践

### 1. 使用 UUID 作为唯一标识符

```javascript
// ✅ 正确 - 使用 UUID
const taskId = util.uuid();
storage.set(`task_${taskId}`, taskData);

// ❌ 错误 - 使用时间戳（可能重复）
const taskId = Date.now();
```

### 2. 选择合适的哈希算法

```javascript
// ✅ 正确 - 安全场景使用 SHA256
const passwordHash = util.sha256(password);

// ✅ 正确 - 非安全场景使用 MD5（更快）
const cacheKey = util.md5(url);

// ❌ 错误 - 安全场景使用 MD5
const passwordHash = util.md5(password);  // 不安全！
```

### 3. Base64 不是加密

```javascript
// ✅ 正确 - 用于编码传输
const encoded = util.base64Encode(data);
http.post(url, { data: encoded });

// ❌ 错误 - 用于"加密"敏感信息
const "encrypted" = util.base64Encode(password);  // 这不是加密！
```

### 4. 使用预定义的日期格式

```javascript
// ✅ 正确 - 使用常用格式（性能更好）
const date1 = util.formatDate(now, 'yyyy-MM-dd HH:mm:ss');
const date2 = util.formatDate(now, 'yyyy-MM-dd');
const date3 = util.formatDate(now, 'HH:mm:ss');

// ⚠️ 可以但较慢 - 自定义格式
const date4 = util.formatDate(now, 'yyyy年MM月dd日');
```

### 5. 避免过长的 sleep

```javascript
// ✅ 正确 - 短暂延迟
util.sleep(100);  // 100ms

// ❌ 错误 - 过长延迟会阻塞
util.sleep(60000);  // 1分钟，太长了！
```

### 6. 组合使用工具函数

```javascript
// ✅ 正确 - 组合使用
const id = util.uuid();
const timestamp = util.now();
const formatted = util.formatDate(timestamp, 'yyyy-MM-dd');
const hash = util.sha256(`${id}_${timestamp}`);

const record = {
  id: id,
  date: formatted,
  checksum: hash
};
```

---

## 注意事项

1. **UUID 格式**: 生成的 UUID 符合标准格式，可以用作唯一标识符
2. **哈希算法**: MD5 适合非安全场景，SHA256 适合安全场景
3. **Base64 编码**: 只是编码方式，不是加密，不要用于保护敏感信息
4. **日期格式**: 支持常用格式和自定义格式，常用格式性能更好
5. **时间戳单位**: `util.now()` 返回毫秒，`util.formatDate()` 接受毫秒
6. **Sleep 阻塞**: `util.sleep()` 会阻塞当前线程，不适合长时间延迟
7. **性能考虑**: 哈希计算和 Base64 编解码有一定开销，避免在循环中频繁调用
8. **错误处理**: Base64 解码可能失败，需要使用 try-catch 处理
