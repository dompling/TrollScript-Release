# File 文件操作

File 模块提供了文件和目录操作功能。你可以使用它来读写文件、管理目录、获取文件信息等。支持沙盒内操作和 Root 权限操作。

> **守护进程支持**: 完全支持。在触发器模式下可正常运行。

---

## 快速开始

```javascript
// 读写文件
const content = file.read('test.txt');
file.write('output.txt', 'Hello World');

// 目录操作
file.mkdir('mydir');
const files = file.list('mydir');

// 文件信息
const stat = file.stat('test.txt');
console.log(`大小: ${stat.size} 字节`);

// Root 权限操作（需要 TrollStore）
if (file.rootAvailable()) {
  const content = file.rootRead('/var/log/system.log');
}
```

---

## API 参考

### 基础文件操作

#### `file.read(path)`
读取文件内容。**参数:** `path` (string) **返回:** `string` 或抛出错误

#### `file.write(path, content)`
写入文件内容。**参数:** `path` (string), `content` (string) **返回:** `boolean`

#### `file.append(path, content)`
追加文件内容。**参数:** `path` (string), `content` (string) **返回:** `boolean`

#### `file.exists(path)`
检查文件是否存在。**参数:** `path` (string) **返回:** `boolean`

#### `file.delete(path)`
删除文件。**参数:** `path` (string) **返回:** `boolean`

#### `file.move(from, to)`
移动文件。**参数:** `from` (string), `to` (string) **返回:** `boolean`

#### `file.copy(from, to)`
复制文件。**参数:** `from` (string), `to` (string) **返回:** `boolean`

#### `file.list(path)`
列出目录内容。**参数:** `path` (string) **返回:** `string[]`

#### `file.mkdir(path)`
创建目录。**参数:** `path` (string) **返回:** `boolean`

#### `file.stat(path)`
获取文件信息。**返回:** `{ size, modificationDate, creationDate, type }`

#### `file.isDirectory(path)`
判断是否是目录。**参数:** `path` (string) **返回:** `boolean`

---

### 路径获取

#### `file.documentsPath()`
获取文档目录路径。**返回:** `string`

#### `file.cachePath()`
获取缓存目录路径。**返回:** `string`

#### `file.tempPath()`
获取临时目录路径。**返回:** `string`

---

### Root 权限操作

#### `file.rootAvailable()`
检查 Root Helper 是否可用。**返回:** `boolean`

#### `file.rootRead(path)`
使用 Root 权限读取文件。**参数:** `path` (string) **返回:** `string`

#### `file.rootList(path)`
使用 Root 权限列出目录。**参数:** `path` (string) **返回:** `string[]`

#### `file.rootCopy(src, dest)`
使用 Root 权限复制文件。**参数:** `src` (string), `dest` (string) **返回:** `boolean`

#### `file.rootExists(path)`
使用 Root 权限检查文件是否存在。**参数:** `path` (string) **返回:** `boolean`

---

## 完整示例

### 示例 1: 日志文件管理

```javascript
const logFile = file.documentsPath() + '/app.log';

function log(message) {
  const timestamp = util.formatDate(Date.now(), 'yyyy-MM-dd HH:mm:ss');
  const line = `[${timestamp}] ${message}\n`;
  file.append(logFile, line);
}

log('应用启动');
log('用户登录成功');

// 读取日志
const logs = file.read(logFile);
console.log(logs);
```

### 示例 2: 配置文件管理

```javascript
const configPath = file.documentsPath() + '/config.json';

function saveConfig(config) {
  const json = JSON.stringify(config, null, 2);
  file.write(configPath, json);
}

function loadConfig() {
  if (file.exists(configPath)) {
    const json = file.read(configPath);
    return JSON.parse(json);
  }
  return { theme: 'light', language: 'zh' };
}

const config = loadConfig();
config.theme = 'dark';
saveConfig(config);
```

### 示例 3: 文件备份

```javascript
function backupFile(path) {
  if (!file.exists(path)) {
    console.error('文件不存在');
    return false;
  }

  const timestamp = util.formatDate(Date.now(), 'yyyyMMdd_HHmmss');
  const backupPath = `${path}.backup_${timestamp}`;

  return file.copy(path, backupPath);
}

backupFile(file.documentsPath() + '/important.txt');
```

### 示例 4: 目录清理

```javascript
function cleanOldFiles(dir, daysOld = 7) {
  const files = file.list(dir);
  const now = Date.now();
  const maxAge = daysOld * 24 * 60 * 60 * 1000;

  files.forEach(filename => {
    const path = dir + '/' + filename;
    const stat = file.stat(path);

    if (stat.type === 'file') {
      const age = now - stat.modificationDate * 1000;
      if (age > maxAge) {
        file.delete(path);
        console.log('已删除:', filename);
      }
    }
  });
}

cleanOldFiles(file.cachePath(), 7);
```

### 示例 5: Root 权限读取系统文件

```javascript
if (file.rootAvailable()) {
  // 读取系统日志
  const syslog = file.rootRead('/var/log/system.log');
  console.log('系统日志:', syslog.substring(0, 500));

  // 列出系统目录
  const files = file.rootList('/var/mobile/Library');
  console.log('文件列表:', files);
} else {
  console.log('Root 权限不可用');
}
```

---

## 最佳实践

### 1. 使用完整路径

```javascript
// ✅ 正确
const path = file.documentsPath() + '/data.txt';
file.write(path, 'content');

// ❌ 错误 - 相对路径可能不可预测
file.write('data.txt', 'content');
```

### 2. 检查文件是否存在

```javascript
// ✅ 正确
if (file.exists(path)) {
  const content = file.read(path);
}

// ❌ 错误 - 可能抛出异常
const content = file.read(path);
```

### 3. 处理错误

```javascript
// ✅ 正确
try {
  const content = file.read(path);
  processContent(content);
} catch (error) {
  console.error('读取失败:', error);
}
```

### 4. 使用合适的目录

```javascript
// ✅ 正确 - 根据用途选择目录
const dataPath = file.documentsPath() + '/data.json';  // 持久数据
const cachePath = file.cachePath() + '/cache.tmp';     // 缓存数据
const tempPath = file.tempPath() + '/temp.txt';        // 临时文件
```

---

## 注意事项

1. **沙盒限制**: 普通操作仅限于 Documents、Caches、Temp 目录
2. **路径安全**: 自动阻止路径遍历攻击（`..`）
3. **Root 权限**: Root 操作需要 TrollStore 环境
4. **文件编码**: 默认使用 UTF-8 编码
5. **目录创建**: `write` 和 `mkdir` 会自动创建父目录
6. **相对路径**: 相对路径会自动转换为 Documents 目录下的路径
7. **线程安全**: 所有操作都是线程安全的
