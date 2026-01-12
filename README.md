# TrollScript

<p align="center">
  <img src="https://raw.githubusercontent.com/dompling/TrollScript-Release/main/AppIcon.png" width="128" height="128" alt="TrollScript Logo">
</p>

<p align="center">
  <strong>基于 TrollStore 的 iOS JavaScript 脚本执行器</strong>
</p>

<p align="center">
  <a href="https://github.com/dompling/TrollScript-Release/releases/latest">
    <img src="https://img.shields.io/github/v/release/dompling/TrollScript-Release?style=flat-square" alt="Release">
  </a>
  <img src="https://img.shields.io/badge/iOS-16.0%2B-blue?style=flat-square" alt="iOS 16.0+">
  <img src="https://img.shields.io/badge/TrollStore-Required-orange?style=flat-square" alt="TrollStore Required">
  <a href="https://github.com/dompling/TrollScript-Release/releases">
    <img src="https://img.shields.io/github/downloads/dompling/TrollScript-Release/total?style=flat-square" alt="Downloads">
  </a>
</p>

---

## 简介

TrollScript 是一款利用 TrollStore 特权的 iOS JavaScript 脚本执行器。通过内置的 JavaScript 运行时，你可以编写和执行各种自动化脚本，访问系统级 API，实现普通 App 无法完成的功能。

## 功能特性

- **脚本管理** - 创建、编辑、删除、导入导出脚本
- **语法高亮** - 内置代码编辑器，支持 JavaScript 语法高亮
- **丰富的 API** - 15+ 原生模块，覆盖网络、位置、通知、媒体等功能
- **通知触发** - 监听指定 App 通知，自动执行脚本
- **iCloud 同步** - 支持 CloudKit 数据库和 iCloud Drive 两种同步模式
- **快捷指令** - 完整 App Intents 支持，可在快捷指令中运行脚本
- **版本更新** - 应用内检测新版本
- **崩溃恢复** - 内置崩溃捕获与恢复机制
- **性能监控** - 实时内存、CPU、FPS 监控

## 系统要求

- iOS 16.0 或更高版本
- 已安装 [TrollStore](https://github.com/opa334/TrollStore)

## 安装方式

### 方式一：直接下载

1. 前往 [Releases](https://github.com/dompling/TrollScript-Release/releases/latest) 页面
2. 下载最新的 `.tipa` 文件
3. 在 TrollStore 中安装

### 方式二：URL Scheme 安装

如果已安装 TrollStore，可以点击以下链接直接安装:

```
apple-magnifier://install?url=https://github.com/dompling/TrollScript-Release/releases/latest/download/TrollScript.tipa
```

## JavaScript API

TrollScript 内置丰富的原生模块，[查看完整 API 文档](API.md)：

### 基础模块

| 模块 | 功能 |
|------|------|
| `http` | HTTP 请求 (GET/POST/PUT/DELETE) |
| `console` | 控制台输出 |
| `storage` | 数据持久化存储 |
| `clipboard` | 剪贴板读写 |
| `file` | 文件读写操作（沙盒内） |
| `device` | 设备信息获取 |

### 系统功能模块

| 模块 | 功能 |
|------|------|
| `notification` | 本地通知发送与管理 |
| `location` | 位置服务、地理编码 |
| `app` | 应用管理、URL Scheme 调用 |
| `alarm` | 闹钟与定时提醒（基于本地通知） |

### 媒体与数据模块

| 模块 | 功能 |
|------|------|
| `media` | 音乐库访问、播放控制、专辑/艺术家/播放列表管理 |
| `contacts` | 通讯录读写、联系人搜索与分组 |
| `weather` | 天气查询（wttr.in API） |

### 扩展交互模块

| 模块 | 功能 |
|------|------|
| `mail` | 邮件发送、模板管理 |
| `shortcuts` | 快捷指令调用与集成 |

## 使用示例

### HTTP 请求
```javascript
const response = http.get('https://api.example.com/data');
console.log(response.data);

// POST 请求
const result = http.post('https://api.example.com/submit', {
  body: JSON.stringify({ name: 'test' }),
  headers: { 'Content-Type': 'application/json' }
});
```

### 获取位置
```javascript
const loc = location.getCurrent();
if (loc.success) {
  console.log('经度: ' + loc.longitude);
  console.log('纬度: ' + loc.latitude);
  console.log('地址: ' + loc.formattedAddress);
}
```

### 发送通知
```javascript
notification.send({
  title: '任务完成',
  body: '脚本执行成功',
  sound: true
});
```

### 剪贴板操作
```javascript
const text = clipboard.getText();
clipboard.setText('Hello TrollScript!');
```

### 天气查询
```javascript
const weather = weather.get('Beijing');
console.log('天气: ' + weather.condition);
console.log('温度: ' + weather.temperature);
```

### 音乐控制
```javascript
// 获取音乐库统计
const stats = media.getLibraryStats();
console.log('歌曲总数: ' + stats.totalSongs);

// 获取专辑列表
const albums = media.getAlbums(0, 20);

// 播放指定专辑
media.playAlbum('Album Name');

// 按艺术家搜索
const songs = media.searchByArtist('Artist Name');
```

### 通讯录操作
```javascript
// 请求权限
contacts.requestAccess();

// 搜索联系人
const results = contacts.search('张三');

// 获取联系人详情
const contact = contacts.getById(results[0].id);

// 创建新联系人
contacts.create({
  givenName: '李',
  familyName: '四',
  phoneNumbers: [{ label: 'mobile', value: '13800138000' }]
});
```

### 设置闹钟
```javascript
// 一次性闹钟
alarm.createOnce(Date.now() + 3600000, '提醒事项', {
  body: '一小时后的提醒',
  sound: true
});

// 每日重复闹钟
alarm.createDaily(8, 30, '起床时间');

// 每周重复（周一到周五）
alarm.createWeekly([1, 2, 3, 4, 5], 9, 0, '工作日提醒');
```

### 发送邮件
```javascript
// 简单发送
mail.send('recipient@example.com', '主题', '邮件内容');

// 高级选项
mail.sendAdvanced({
  to: ['user1@example.com', 'user2@example.com'],
  cc: ['cc@example.com'],
  subject: '会议通知',
  body: mail.createHtmlBody('<h1>重要会议</h1><p>请准时参加</p>'),
  isHTML: true
});
```

### 调用快捷指令
```javascript
// 运行快捷指令
shortcuts.run('我的快捷指令');

// 传递文本参数
shortcuts.runWithText('处理文本', '需要处理的内容');

// 使用剪贴板作为输入
shortcuts.runWithClipboard('处理剪贴板');
```

### 数据存储
```javascript
// 存储数据
storage.set('key', 'value');
storage.setObject('user', { name: '张三', age: 25 });

// 读取数据
const value = storage.get('key');
const user = storage.getObject('user');

// 删除数据
storage.remove('key');
storage.clear();
```

## 高级功能

### iCloud 同步

TrollScript 支持两种 iCloud 同步模式：

1. **文件目录模式**（推荐）
   - 脚本存储在 `iCloud Drive/TrollScript/Scripts/` 目录
   - 可在「文件」App 中直接查看和编辑
   - 支持 `.trollscript` 和 `.js` 格式

2. **数据库模式**
   - 使用 CloudKit + CoreData 同步
   - 自动后台同步，无需手动操作

### 脚本导入/导出

支持两种导出格式：
- `.trollscript` - 完整格式，包含代码和元数据
- `.js` - 纯 JavaScript 代码

导入支持：`.trollscript`、`.js`、`.json`、`.txt` 格式

### 快捷指令集成

TrollScript 完整支持 iOS 快捷指令：

- **运行脚本** - 在快捷指令中选择并运行脚本
- **传递参数** - 支持文本/JSON 参数传递
- **获取结果** - 脚本返回值可在快捷指令中使用
- **按名称运行** - 通过脚本名称直接运行
- **执行代码** - 直接执行 JavaScript 代码片段

### 脚本商店

TrollScript 支持脚本商店功能，通过脚本商店可以方便地获取和分享脚本。

## 截图

> 待添加应用截图

## 更新日志

查看 [Releases](https://github.com/dompling/TrollScript-Release/releases) 获取完整更新日志。

## 反馈问题

如遇问题，请在 [Issues](https://github.com/dompling/TrollScript-Release/issues) 中反馈。

## 免责声明

- 本项目仅供学习研究使用
- 请勿用于非法用途
- 使用本软件产生的任何后果由用户自行承担

## 致谢

- [TrollStore](https://github.com/opa334/TrollStore)
- [Highlightr](https://github.com/raspu/Highlightr)

---

<p align="center">
  Made with ❤️
</p>
