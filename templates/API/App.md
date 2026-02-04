# App 应用操作

App 模块提供了应用相关的操作功能，包括获取应用信息、打开 URL、管理日志、查看崩溃报告，以及使用私有 API 管理其他应用。

> **守护进程支持**: 部分支持。`open`、`launch`、`openSettings` 在 Daemon 模式下不可用，`vibrate` 在后台可能不生效。

---

## 目录

- [快速开始](#快速开始)
- [API 参考](#api-参考)
  - [应用信息](#应用信息)
  - [URL 操作](#url-操作)
  - [日志管理](#日志管理)
  - [崩溃报告](#崩溃报告)
  - [应用管理（私有 API）](#应用管理私有-api)
- [完整示例](#完整示例)

---

## 快速开始

```javascript
// 获取应用信息
const info = app.info();
console.log(`${info.name} v${info.version}`);

// 打开 URL
app.open('https://example.com');

// 获取日志
const logs = app.getLogs(50);
console.log(`最近 ${logs.length} 条日志`);

// 列出所有应用（私有 API）
const apps = app.list();
console.log(`已安装 ${apps.length} 个应用`);
```

---

## API 参考

### 应用信息

#### `app.version()`
获取应用版本号。**返回:** `string`

#### `app.build()`
获取构建号。**返回:** `string`

#### `app.bundleId()`
获取 Bundle ID。**返回:** `string`

#### `app.info()`
获取完整应用信息。**返回:** `object` - 包含 `name`, `version`, `build`, `bundleId`, `language`

```javascript
const info = app.info();
console.log(info);
// { name: "TrollScript", version: "1.0.0", build: "1", bundleId: "com.example.app", language: "zh" }
```

---

### URL 操作

#### `app.open(url)`
打开 URL 或 URL Scheme。**参数:** `url` (string) **返回:** `boolean` (Daemon 模式下不可用)

```javascript
app.open('https://example.com');
app.open('shortcuts://run-shortcut?name=MyShortcut');
```

#### `app.canOpen(url)`
检查是否能打开指定 URL。**参数:** `url` (string) **返回:** `boolean`

#### `app.openSettings()`
打开应用设置页面。**返回:** `boolean` (Daemon 模式下返回 false)

---

### 用户交互

#### `app.vibrate()`
触发设备震动反馈。**返回:** `void` (Daemon 模式下可能不生效)

```javascript
// 触发震动
app.vibrate();
```

---

### 日志管理

#### `app.getLogs(limit?)`
获取应用日志。**参数:** `limit` (number, 默认 100) **返回:** `array`

```javascript
const logs = app.getLogs(50);
logs.forEach(log => {
  console.log(`[${log.level}] ${log.message}`);
});
```

#### `app.exportLogs()`
导出所有日志为字符串。**返回:** `string`

#### `app.clearLogs()`
清除所有日志。**返回:** `void`

#### `app.exit(code?)`
退出应用（仅用于调试）。**参数:** `code` (number, 可选, 默认 0) - 退出码 **返回:** `void`

```javascript
// 正常退出
app.exit();

// 以错误码退出
app.exit(1);
```

> ⚠️ **警告**: 此方法会立即终止应用，仅用于调试目的。

---

### 崩溃报告

#### `app.getCrashReports()`
获取所有崩溃报告。**返回:** `array`

```javascript
const crashes = app.getCrashReports();
crashes.forEach(crash => {
  console.log(`崩溃时间: ${new Date(crash.date * 1000)}`);
  console.log(`原因: ${crash.reason}`);
});
```

#### `app.getLastCrash()`
获取最近一次崩溃报告。**返回:** `object | null`

---

### 应用管理（私有 API）

#### `app.list()`
获取所有已安装应用列表。**返回:** `array`

```javascript
const apps = app.list();
apps.forEach(app => {
  console.log(`${app.name} (${app.bundleId})`);
});
```

#### `app.getAppInfo(bundleId)`
获取指定应用信息。**参数:** `bundleId` (string) **返回:** `object | null`

#### `app.launch(bundleId)`
启动指定应用。**参数:** `bundleId` (string) **返回:** `boolean` (Daemon 模式下不可用)

```javascript
app.launch('com.apple.mobilesafari');
```

#### `app.terminate(bundleId)`
终止指定应用。**参数:** `bundleId` (string) **返回:** `boolean`

#### `app.isInstalled(bundleId)`
检查应用是否已安装。**参数:** `bundleId` (string) **返回:** `boolean`

#### `app.getDataContainer(bundleId)`
获取应用数据容器路径。**参数:** `bundleId` (string) **返回:** `string | null`

---

## 完整示例

### 示例 1: 应用信息显示

```javascript
const info = app.info();
console.log('=== 应用信息 ===');
console.log(`名称: ${info.name}`);
console.log(`版本: ${info.version} (${info.build})`);
console.log(`Bundle ID: ${info.bundleId}`);
console.log(`语言: ${info.language}`);
```

### 示例 2: 日志导出

```javascript
function exportLogsToFile() {
  const logs = app.exportLogs();
  const filename = `logs_${util.formatDate(Date.now(), 'yyyyMMdd_HHmmss')}.txt`;
  file.write(`/var/mobile/Documents/${filename}`, logs);
  console.log('日志已导出:', filename);
}
```

### 示例 3: 应用启动器

```javascript
function launchApp(bundleId) {
  if (!app.isInstalled(bundleId)) {
    console.error('应用未安装');
    return false;
  }

  const success = app.launch(bundleId);
  if (success) {
    console.log('应用已启动');
  } else {
    console.error('启动失败');
  }
  return success;
}

launchApp('com.apple.mobilesafari');
```

### 示例 4: 崩溃监控

```javascript
function checkCrashes() {
  const lastCrash = app.getLastCrash();
  if (lastCrash) {
    const crashTime = new Date(lastCrash.date * 1000);
    const now = Date.now();
    const hoursSinceCrash = (now - lastCrash.date * 1000) / (1000 * 60 * 60);

    if (hoursSinceCrash < 24) {
      notification.send('应用崩溃', `最近发生崩溃: ${lastCrash.reason}`);
    }
  }
}
```

### 示例 5: 应用管理器

```javascript
class AppManager {
  listApps() {
    return app.list();
  }

  findApp(keyword) {
    const apps = this.listApps();
    return apps.filter(a =>
      a.name.includes(keyword) || a.bundleId.includes(keyword)
    );
  }

  launchByName(name) {
    const apps = this.findApp(name);
    if (apps.length === 0) {
      console.error('未找到应用');
      return false;
    }
    return app.launch(apps[0].bundleId);
  }
}

const manager = new AppManager();
manager.launchByName('Safari');
```

---

## 最佳实践

### 1. 检查应用是否安装

```javascript
// ✅ 正确
if (app.isInstalled('com.apple.mobilesafari')) {
  app.launch('com.apple.mobilesafari');
}

// ❌ 错误
app.launch('com.apple.mobilesafari');  // 可能失败
```

### 2. 处理 URL 打开失败

```javascript
// ✅ 正确
if (app.canOpen(url)) {
  app.open(url);
} else {
  console.error('无法打开 URL');
}
```

### 3. 定期清理日志

```javascript
// ✅ 正确 - 定期清理
const logs = app.getLogs();
if (logs.length > 1000) {
  app.clearLogs();
}
```

### 4. 安全使用私有 API

```javascript
// ✅ 正确 - 检查返回值
const apps = app.list();
if (apps && apps.length > 0) {
  // 处理应用列表
}
```

---

## 注意事项

1. **私有 API**: 应用管理功能使用私有 API，需要 TrollStore 权限
2. **Daemon 限制**: `openSettings` 在 Daemon 模式下不可用
3. **权限要求**: 某些操作需要特殊权限
4. **系统限制**: 无法终止系统应用
5. **Bundle ID**: 需要准确的 Bundle ID 才能操作应用
6. **日志大小**: 日志会占用存储空间，建议定期清理
7. **崩溃报告**: 仅记录应用自身的崩溃
8. **线程安全**: 所有 API 都是线程安全的
