# iCloud 文件操作

iCloud 模块提供了 iCloud Drive 文件操作功能。你可以使用它来读写 iCloud Drive 中的文件和目录。

> **守护进程支持**: 完全支持。在触发器模式下可正常运行。

---

## 快速开始

```javascript
// 获取 iCloud 容器路径
const path = icloud.containerPath();
console.log('iCloud 路径:', path);

// 写入文件
icloud.write('notes.txt', 'Hello iCloud!');

// 读取文件
const content = icloud.read('notes.txt');
console.log('内容:', content);

// 列出目录
const files = icloud.list('Documents');
console.log('文件列表:', files);

// 删除文件
icloud.delete('old.txt');
```

---

## API 参考

### `icloud.containerPath()`
获取 iCloud 容器路径。**返回:** `string | null`

```javascript
const path = icloud.containerPath();
if (path) {
  console.log('iCloud 可用:', path);
} else {
  console.log('iCloud 不可用');
}
```

---

### `icloud.read(path)`
读取 iCloud 文件。**参数:** `path` (string) **返回:** `string` 或抛出错误

```javascript
try {
  const content = icloud.read('notes.txt');
  console.log('内容:', content);
} catch (error) {
  console.error('读取失败:', error);
}
```

---

### `icloud.write(path, content)`
写入 iCloud 文件。**参数:** `path` (string), `content` (string) **返回:** `boolean`

```javascript
const success = icloud.write('notes.txt', 'Hello World');
if (success) {
  console.log('写入成功');
}
```

---

### `icloud.delete(path)`
删除 iCloud 文件。**参数:** `path` (string) **返回:** `boolean`

```javascript
const success = icloud.delete('old.txt');
if (success) {
  console.log('删除成功');
}
```

---

### `icloud.list(path?)`
列出 iCloud 目录。**参数:** `path` (string, 可选) **返回:** `string[]`

```javascript
// 列出根目录
const files = icloud.list();
console.log('根目录文件:', files);

// 列出子目录
const docs = icloud.list('Documents');
console.log('Documents 目录:', docs);
```

---

## 完整示例

### 示例 1: 笔记同步

```javascript
function saveNote(title, content) {
  const filename = `${title}.txt`;
  const success = icloud.write(filename, content);

  if (success) {
    console.log('笔记已保存到 iCloud');
    return true;
  } else {
    console.error('保存失败');
    return false;
  }
}

function loadNote(title) {
  const filename = `${title}.txt`;

  try {
    const content = icloud.read(filename);
    console.log('笔记内容:', content);
    return content;
  } catch (error) {
    console.error('读取失败:', error);
    return null;
  }
}

saveNote('日记', '今天天气很好');
const content = loadNote('日记');
```

### 示例 2: 配置同步

```javascript
function syncConfig(config) {
  const json = JSON.stringify(config, null, 2);
  const success = icloud.write('config.json', json);

  if (success) {
    console.log('配置已同步到 iCloud');
  }

  return success;
}

function loadConfig() {
  try {
    const json = icloud.read('config.json');
    return JSON.parse(json);
  } catch (error) {
    console.log('使用默认配置');
    return { theme: 'light', language: 'zh' };
  }
}

const config = loadConfig();
config.theme = 'dark';
syncConfig(config);
```

### 示例 3: 文件管理

```javascript
function listAllFiles(dir = '') {
  const files = icloud.list(dir);

  console.log(`=== ${dir || '根目录'} ===`);
  files.forEach(file => {
    console.log(`- ${file}`);
  });

  return files;
}

function cleanOldFiles(pattern) {
  const files = icloud.list();
  let count = 0;

  files.forEach(file => {
    if (file.includes(pattern)) {
      if (icloud.delete(file)) {
        console.log('已删除:', file);
        count++;
      }
    }
  });

  console.log(`清理完成，删除了 ${count} 个文件`);
}

listAllFiles();
cleanOldFiles('backup_');
```

### 示例 4: 数据备份

```javascript
function backupToICloud(data, filename) {
  const timestamp = util.formatDate(Date.now(), 'yyyyMMdd_HHmmss');
  const backupName = `${filename}_${timestamp}.json`;

  const json = JSON.stringify(data, null, 2);
  const success = icloud.write(backupName, json);

  if (success) {
    console.log('备份成功:', backupName);
    notification.send('备份完成', `已备份到 iCloud: ${backupName}`);
  }

  return success;
}

const userData = {
  name: 'Alice',
  settings: { theme: 'dark' },
  lastUpdate: Date.now()
};

backupToICloud(userData, 'user_data');
```

---

## 最佳实践

### 1. 检查 iCloud 可用性

```javascript
// ✅ 正确
if (icloud.containerPath()) {
  icloud.write('file.txt', 'content');
} else {
  console.log('iCloud 不可用');
}

// ❌ 错误 - 不检查
icloud.write('file.txt', 'content');  // 可能失败
```

### 2. 处理错误

```javascript
// ✅ 正确
try {
  const content = icloud.read('file.txt');
  processContent(content);
} catch (error) {
  console.error('读取失败:', error);
}
```

### 3. 使用相对路径

```javascript
// ✅ 正确 - 使用相对路径
icloud.write('notes/daily.txt', 'content');

// ❌ 错误 - 使用绝对路径
icloud.write('/var/mobile/Library/...', 'content');
```

### 4. 组织文件结构

```javascript
// ✅ 正确 - 使用目录组织
icloud.write('notes/2024/01/daily.txt', 'content');
icloud.write('backups/config.json', 'content');

// ❌ 较差 - 所有文件在根目录
icloud.write('daily.txt', 'content');
icloud.write('config.json', 'content');
```

---

## 注意事项

1. **iCloud 要求**: 需要用户在系统中开启 iCloud Drive
2. **路径**: 使用相对路径，基于 iCloud Drive 根目录
3. **同步**: 文件会自动同步到 iCloud，可能有延迟
4. **容量**: 受 iCloud 存储空间限制
5. **权限**: 只能访问应用的 iCloud 容器
6. **文件编码**: 默认使用 UTF-8 编码
7. **目录创建**: write 会自动创建父目录
8. **线程安全**: 所有操作都是线程安全的
