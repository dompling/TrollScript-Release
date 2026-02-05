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
  - [性能监控](#性能监控)
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

### 性能监控

#### `app.cpuUsage()`
获取 CPU 使用率（进程级 + 系统级）。**返回:** `object`

```javascript
const cpu = app.cpuUsage();
console.log(`进程 CPU: ${cpu.process.toFixed(1)}%`);
console.log(`系统 CPU: ${cpu.system.total.toFixed(1)}%`);
console.log(`用户态: ${cpu.system.user.toFixed(1)}%`);
console.log(`系统态: ${cpu.system.system.toFixed(1)}%`);
console.log(`空闲: ${cpu.system.idle.toFixed(1)}%`);
console.log(`CPU 核心数: ${cpu.system.cores}`);
```

返回对象结构:
```javascript
{
  process: 12.5,           // 当前进程 CPU 使用率 (%)
  system: {
    total: 45.2,           // 系统总 CPU 使用率 (%)
    user: 30.1,            // 用户态 CPU (%)
    system: 15.1,          // 系统态 CPU (%)
    idle: 54.8,            // 空闲 CPU (%)
    nice: 0.0,             // Nice 优先级 CPU (%)
    cores: 6               // CPU 核心数
  }
}
```

#### `app.memoryUsage()`
获取内存使用情况。**返回:** `object`

```javascript
const mem = app.memoryUsage();
console.log(`当前内存: ${mem.usage.toFixed(1)} ${mem.unit}`);
console.log(`峰值内存: ${mem.peak.toFixed(1)} ${mem.unit}`);
```

返回对象结构:
```javascript
{
  usage: 156.8,    // 当前内存使用量
  peak: 189.2,     // 峰值内存使用量
  unit: "MB"       // 单位
}
```

#### `app.fps()`
获取当前帧率。**返回:** `object`

```javascript
const fpsInfo = app.fps();
console.log(`FPS: ${Math.round(fpsInfo.fps)}`);
if (fpsInfo.isCritical) {
  console.warn('帧率过低！');
}
```

返回对象结构:
```javascript
{
  fps: 60.0,          // 当前帧率
  isWarning: false,   // 是否处于警告状态 (内存>200MB 或 CPU>80% 或 FPS<30)
  isCritical: false   // 是否处于危险状态 (内存>400MB 或 CPU>95% 或 FPS<15)
}
```

#### `app.performanceSnapshot()`
获取完整性能指标快照。**返回:** `object`

```javascript
const snapshot = app.performanceSnapshot();
console.log(JSON.stringify(snapshot, null, 2));
```

返回完整的性能数据，包含 CPU、内存、FPS 和时间戳。

#### `app.startMonitoring()`
开启性能监控（FPS 采样、指标记录）。**返回:** `boolean`

```javascript
app.startMonitoring();
// 监控中...
setTimeout(() => {
  const fps = app.fps();
  console.log(`当前 FPS: ${fps.fps}`);
}, 2000);
```

> **注意**: 开启监控后才能获取准确的 FPS 数据。

#### `app.stopMonitoring()`
停止性能监控。**返回:** `boolean`

```javascript
app.stopMonitoring();
```

#### `app.performanceRecords(limit?)`
获取历史性能记录。**参数:** `limit` (number, 默认 50) **返回:** `array`

```javascript
const records = app.performanceRecords(10);
records.forEach(record => {
  console.log(`脚本: ${record.scriptName}`);
  console.log(`执行时间: ${record.executionTime.toFixed(2)}ms`);
  console.log(`峰值内存: ${record.peakMemory.toFixed(1)}MB`);
  console.log(`成功: ${record.success}`);
});
```

返回数组元素结构:
```javascript
{
  id: "uuid-string",
  scriptName: "MyScript",
  executionTime: 123.45,      // 执行时间 (ms)
  peakMemory: 156.8,          // 峰值内存 (MB)
  averageCPU: 25.3,           // 平均 CPU (%)
  timestamp: 1704067200.0,    // 时间戳
  success: true               // 是否成功
}
```

#### `app.clearPerformanceRecords()`
清除所有性能记录。**返回:** `void`

```javascript
app.clearPerformanceRecords();
```

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

### Darwin Notification

Darwin Notification 是 iOS 系统级的通知机制，可用于进程间通信。

#### `app.notifyPost(name)`
发送 Darwin Notification。**参数:** `name` (string) - notification 名称 **返回:** `boolean` - 是否发送成功

```javascript
// 发送通知 唤起 Copylog
const success = app.notifyPost('me.tomt000.copylog.showView');
if (success) {
  console.log('通知发送成功');
}
```

#### `app.notifyRegister(name)`
注册监听 Darwin Notification。**参数:** `name` (string) - notification 名称 **返回:** `number` - 监听 token

```javascript
// 注册监听
const token = app.notifyRegister('com.example.mynotification');
console.log('注册成功，token:', token);
```

#### `app.notifyCancel(token)`
取消监听 Darwin Notification。**参数:** `token` (number) - 监听 token **返回:** `boolean` - 是否取消成功

```javascript
// 取消监听
const success = app.notifyCancel(token);
if (success) {
  console.log('取消监听成功');
}
```

**完整示例：进程间通信**

```javascript
// 进程 A：注册监听
const token = app.notifyRegister('com.example.data.updated');
console.log('开始监听数据更新通知');

// 进程 B：发送通知
app.notifyPost('com.example.data.updated');

// 进程 A：取消监听
app.notifyCancel(token);
```

> **注意**: Darwin Notification 是系统级通知，适用于跨进程通信。通知名称建议使用反向域名格式（如 `com.example.notification`）以避免冲突。

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
