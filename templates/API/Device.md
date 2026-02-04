# Device 设备信息

Device 模块提供了获取 iOS 设备信息的功能。你可以使用它来获取设备名称、型号、系统版本、电池状态、屏幕信息等。

> **守护进程支持**: 完全支持。在触发器模式下可正常运行，可以获取设备的实时状态信息。

---

## 目录

- [快速开始](#快速开始)
- [API 参考](#api-参考)
  - [device.info()](#deviceinfo)
  - [device.battery()](#devicebattery)
  - [device.screen()](#devicescreen)
- [完整示例](#完整示例)
- [最佳实践](#最佳实践)

---

## 快速开始

获取设备信息非常简单：

```javascript
// 获取设备基本信息
const info = device.info();
console.log('设备名称:', info.name);
console.log('系统版本:', info.systemVersion);

// 获取电池信息
const battery = device.battery();
console.log('电量:', Math.round(battery.level * 100) + '%');
console.log('充电状态:', battery.state);
```

---

## API 参考

### `device.info()`

获取设备的基本信息。

**返回:** `object` — 设备信息对象

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | `string` | 设备名称（如 "iPhone 15 Pro"） |
| `model` | `string` | 设备型号（如 "iPhone"） |
| `systemName` | `string` | 系统名称（如 "iOS"） |
| `systemVersion` | `string` | 系统版本号（如 "17.2"） |
| `identifier` | `string` | 设备唯一标识符（UUID） |

```javascript
const info = device.info();
console.log(info);
// 输出:
// {
//   name: "我的 iPhone",
//   model: "iPhone",
//   systemName: "iOS",
//   systemVersion: "17.2",
//   identifier: "12345678-1234-1234-1234-123456789ABC"
// }
```

---

### `device.battery()`

获取设备的电池信息。

**返回:** `object` — 电池信息对象

| 字段 | 类型 | 说明 |
|------|------|------|
| `level` | `number` | 电量百分比（0.0 - 1.0） |
| `state` | `string` | 充电状态: `'unknown'` \| `'unplugged'` \| `'charging'` \| `'full'` |
| `lowPowerMode` | `boolean` | 是否开启低电量模式 |

```javascript
const battery = device.battery();
console.log('电量:', Math.round(battery.level * 100) + '%');
console.log('充电状态:', battery.state);
console.log('低电量模式:', battery.lowPowerMode);

// 输出:
// 电量: 85%
// 充电状态: charging
// 低电量模式: false
```

---

### `device.screen()`

获取设备的屏幕信息。

**返回:** `object` — 屏幕信息对象

| 字段 | 类型 | 说明 |
|------|------|------|
| `width` | `number` | 屏幕宽度（逻辑像素） |
| `height` | `number` | 屏幕高度（逻辑像素） |
| `scale` | `number` | 屏幕缩放比例（如 2.0、3.0） |
| `brightness` | `number` | 屏幕亮度（0.0 - 1.0） |

```javascript
const screen = device.screen();
console.log(`屏幕尺寸: ${screen.width}x${screen.height}`);
console.log(`缩放比例: @${screen.scale}x`);
console.log(`亮度: ${Math.round(screen.brightness * 100)}%`);

// 输出:
// 屏幕尺寸: 393x852
// 缩放比例: @3x
// 亮度: 75%
```

---

## 完整示例

### 示例 1: 显示设备完整信息

```javascript
const info = device.info();
const battery = device.battery();
const screen = device.screen();

console.log('=== 设备信息 ===');
console.log(`设备: ${info.name}`);
console.log(`型号: ${info.model}`);
console.log(`系统: ${info.systemName} ${info.systemVersion}`);
console.log(`标识符: ${info.identifier}`);

console.log('\n=== 电池信息 ===');
console.log(`电量: ${Math.round(battery.level * 100)}%`);
console.log(`状态: ${battery.state}`);
console.log(`低电量模式: ${battery.lowPowerMode ? '开启' : '关闭'}`);

console.log('\n=== 屏幕信息 ===');
console.log(`分辨率: ${screen.width}x${screen.height} @${screen.scale}x`);
console.log(`亮度: ${Math.round(screen.brightness * 100)}%`);
```

---

### 示例 2: 电量监控与提醒

```javascript
function checkBattery() {
  const battery = device.battery();
  const level = Math.round(battery.level * 100);

  console.log(`当前电量: ${level}%`);

  if (level < 20 && battery.state === 'unplugged') {
    notification.send('电量不足', `当前电量仅剩 ${level}%，请及时充电`, { sound: 'default' });
  }

  if (level === 100 && battery.state === 'charging') {
    notification.send('充电完成', '设备已充满电，可以拔掉充电器了', { sound: 'default' });
  }
}

// 每5分钟检查一次电量
setInterval(checkBattery, 5 * 60 * 1000);
```

---

### 示例 3: 根据设备型号执行不同逻辑

```javascript
const info = device.info();
const screen = device.screen();

// 判断是否为 iPad
const isIPad = info.model === 'iPad';

// 判断屏幕尺寸
const isSmallScreen = screen.width < 375;
const isLargeScreen = screen.width >= 428;

if (isIPad) {
  console.log('检测到 iPad，使用平板布局');
  // 执行 iPad 特定逻辑
} else if (isSmallScreen) {
  console.log('检测到小屏幕设备，使用紧凑布局');
  // 执行小屏幕逻辑
} else if (isLargeScreen) {
  console.log('检测到大屏幕设备，使用宽松布局');
  // 执行大屏幕逻辑
}
```

---

### 示例 4: 系统版本兼容性检查

```javascript
function checkSystemVersion(requiredVersion) {
  const info = device.info();
  const currentVersion = parseFloat(info.systemVersion);
  const required = parseFloat(requiredVersion);

  if (currentVersion < required) {
    console.error(`系统版本过低！需要 iOS ${requiredVersion} 或更高版本`);
    console.error(`当前版本: iOS ${info.systemVersion}`);
    return false;
  }

  console.log(`系统版本检查通过: iOS ${info.systemVersion}`);
  return true;
}

// 检查是否满足最低版本要求
if (checkSystemVersion('15.0')) {
  // 执行需要 iOS 15+ 的功能
  console.log('开始执行脚本...');
} else {
  console.error('脚本终止');
}
```

---

### 示例 5: 自动调节屏幕亮度

```javascript
function adjustBrightnessForReading() {
  const screen = device.screen();
  const currentBrightness = screen.brightness;

  console.log(`当前亮度: ${Math.round(currentBrightness * 100)}%`);

  // 注意: iOS 不允许通过 API 直接修改屏幕亮度
  // 这里只是读取和建议
  if (currentBrightness < 0.3) {
    console.warn('屏幕亮度较低，建议提高亮度以获得更好的阅读体验');
  } else if (currentBrightness > 0.8) {
    console.warn('屏幕亮度较高，建议降低亮度以节省电量');
  } else {
    console.log('屏幕亮度适中');
  }
}

adjustBrightnessForReading();
```

---

### 示例 6: 设备信息日志记录

```javascript
function logDeviceInfo() {
  const info = device.info();
  const battery = device.battery();
  const screen = device.screen();
  const timestamp = new Date().toISOString();

  const log = {
    timestamp,
    device: {
      name: info.name,
      model: info.model,
      system: `${info.systemName} ${info.systemVersion}`,
      identifier: info.identifier
    },
    battery: {
      level: Math.round(battery.level * 100),
      state: battery.state,
      lowPowerMode: battery.lowPowerMode
    },
    screen: {
      resolution: `${screen.width}x${screen.height}`,
      scale: screen.scale,
      brightness: Math.round(screen.brightness * 100)
    }
  };

  // 保存到存储
  const logs = storage.read('device_logs') || [];
  logs.push(log);

  // 只保留最近100条记录
  if (logs.length > 100) {
    logs.shift();
  }

  storage.write('device_logs', logs);
  console.log('设备信息已记录');
}

// 每小时记录一次设备信息
setInterval(logDeviceInfo, 60 * 60 * 1000);
```

---

## 最佳实践

### 1. 缓存设备信息

设备基本信息不会频繁变化，可以缓存以提高性能：

```javascript
// ✅ 正确 - 缓存设备信息
let cachedDeviceInfo = null;

function getDeviceInfo() {
  if (!cachedDeviceInfo) {
    cachedDeviceInfo = device.info();
  }
  return cachedDeviceInfo;
}

// ❌ 错误 - 每次都重新获取
function processData() {
  const info = device.info();  // 不必要的重复调用
  // ...
}
```

### 2. 电池信息需要实时获取

电池状态会实时变化，不应缓存：

```javascript
// ✅ 正确 - 实时获取电池信息
function checkBatteryStatus() {
  const battery = device.battery();  // 每次都获取最新状态
  return battery.level < 0.2;
}

// ❌ 错误 - 缓存电池信息
const cachedBattery = device.battery();  // 状态会过时
```

### 3. 使用有意义的变量名

```javascript
// ✅ 正确
const batteryLevel = Math.round(battery.level * 100);
const isCharging = battery.state === 'charging';
const isLowPower = battery.lowPowerMode;

// ❌ 错误
const b = battery.level;
const s = battery.state;
```

### 4. 处理未知状态

```javascript
// ✅ 正确 - 处理所有可能的状态
const battery = device.battery();
let statusText;

switch (battery.state) {
  case 'charging':
    statusText = '充电中';
    break;
  case 'full':
    statusText = '已充满';
    break;
  case 'unplugged':
    statusText = '未充电';
    break;
  case 'unknown':
  default:
    statusText = '状态未知';
    break;
}

// ❌ 错误 - 没有处理所有情况
const statusText = battery.state === 'charging' ? '充电中' : '未充电';
```

### 5. 屏幕尺寸适配

```javascript
// ✅ 正确 - 使用屏幕信息进行适配
const screen = device.screen();
const isCompact = screen.width < 375;
const windowWidth = isCompact ? 280 : 320;

const win = hud.createWindow({
  width: windowWidth,
  height: 120
});

// ❌ 错误 - 硬编码尺寸
const win = hud.createWindow({
  width: 300,  // 可能在小屏幕上显示不全
  height: 120
});
```

### 6. 设备标识符的使用

```javascript
// ✅ 正确 - 用于设备识别和数据隔离
const info = device.info();
const deviceId = info.identifier;
const userDataKey = `user_data_${deviceId}`;
const userData = storage.read(userDataKey);

// ❌ 错误 - 不要用于敏感操作
// 设备标识符可能会变化（重装系统等），不适合作为永久标识
```

---

## 注意事项

1. **设备标识符**: `identifier` 字段返回的是 `identifierForVendor`，在某些情况下可能会变化（如重装系统）
2. **电池监控**: 调用 `device.battery()` 会自动启用电池监控，这会略微增加电量消耗
3. **屏幕亮度**: iOS 不允许通过 API 直接修改屏幕亮度，只能读取当前值
4. **权限要求**: 获取设备信息不需要特殊权限
5. **守护进程模式**: 在 Daemon 模式下，所有 API 都可以正常工作
6. **性能影响**: 这些 API 调用开销很小，可以频繁使用
