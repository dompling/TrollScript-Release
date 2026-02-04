# System 系统设置控制

System 模块提供了系统设置控制功能。你可以使用它来控制 WiFi、蓝牙、飞行模式、音量、闪光灯等系统设置。

> **守护进程支持**: 完全支持。在触发器模式下可正常运行。
>
> **重要提示**: 大部分功能需要 **TrollStore 权限**才能使用。

---

## 快速开始

```javascript
// 检查 WiFi 状态
if (system.isWiFiEnabled()) {
  console.log('WiFi 已开启');
}

// 切换 WiFi
system.setWiFi(false);  // 关闭 WiFi
system.setWiFi(true);   // 开启 WiFi

// 设置音量
system.setVolume(0.5);  // 设置为 50%

// 开启闪光灯
system.setFlashlight(true, 1.0);  // 最大亮度

// 打开系统设置
system.openSettings('WIFI');  // 打开 WiFi 设置页面
```

---

## API 参考

### WiFi 控制

#### `system.isWiFiEnabled()`
检查 WiFi 是否开启。**返回:** `boolean`

```javascript
if (system.isWiFiEnabled()) {
  console.log('WiFi 已开启');
}
```

#### `system.setWiFi(enabled)`
设置 WiFi 开关。**参数:** `enabled` (boolean) **返回:** `boolean`

```javascript
// 关闭 WiFi
const success = system.setWiFi(false);
if (success) {
  console.log('WiFi 已关闭');
}

// 开启 WiFi
system.setWiFi(true);
```

---

### 蓝牙控制

#### `system.isBluetoothEnabled()`
检查蓝牙是否开启。**返回:** `boolean`

```javascript
if (system.isBluetoothEnabled()) {
  console.log('蓝牙已开启');
}
```

#### `system.setBluetooth(enabled)`
设置蓝牙开关。**参数:** `enabled` (boolean) **返回:** `boolean`

```javascript
// 关闭蓝牙
system.setBluetooth(false);

// 开启蓝牙
system.setBluetooth(true);
```

---

### 飞行模式

#### `system.isAirplaneModeEnabled()`
检查飞行模式是否开启。**返回:** `boolean`

```javascript
if (system.isAirplaneModeEnabled()) {
  console.log('飞行模式已开启');
}
```

#### `system.setAirplaneMode(enabled)`
设置飞行模式。**参数:** `enabled` (boolean) **返回:** `boolean`

```javascript
// 开启飞行模式
system.setAirplaneMode(true);

// 关闭飞行模式
system.setAirplaneMode(false);
```

---

### 勿扰模式

#### `system.isDoNotDisturbEnabled()`
检查勿扰模式是否开启。**返回:** `boolean`

```javascript
if (system.isDoNotDisturbEnabled()) {
  console.log('勿扰模式已开启');
}
```

#### `system.setDoNotDisturb(enabled)`
设置勿扰模式。**参数:** `enabled` (boolean) **返回:** `boolean`

```javascript
// 开启勿扰模式
system.setDoNotDisturb(true);

// 关闭勿扰模式
system.setDoNotDisturb(false);
```

---

### 音量控制

#### `system.getVolume(category?)`
获取系统音量。**参数:** `category` (string, 可选，默认 "Media") **返回:** `number` (0.0-1.0)

**支持的类别:**
- `"Media"` - 媒体音量（默认）
- `"Ringtone"` - 铃声音量
- `"Alarm"` - 闹钟音量
- `"VoiceCall"` - 通话音量

```javascript
// 获取媒体音量
const volume = system.getVolume();
console.log(`当前音量: ${(volume * 100).toFixed(0)}%`);

// 获取铃声音量
const ringtone = system.getVolume('Ringtone');
```

#### `system.setVolume(level, category?)`
设置系统音量。**参数:** `level` (number, 0.0-1.0), `category` (string, 可选) **返回:** `boolean`

```javascript
// 设置媒体音量为 50%
system.setVolume(0.5);

// 设置铃声音量为 80%
system.setVolume(0.8, 'Ringtone');

// 静音
system.setVolume(0);

// 最大音量
system.setVolume(1.0);
```

---

### 闪光灯控制

#### `system.hasFlashlight()`
检查设备是否有闪光灯。**返回:** `boolean`

```javascript
if (system.hasFlashlight()) {
  console.log('设备支持闪光灯');
}
```

#### `system.isFlashlightOn()`
检查闪光灯是否开启。**返回:** `boolean`

```javascript
if (system.isFlashlightOn()) {
  console.log('闪光灯已开启');
}
```

#### `system.setFlashlight(enabled, level?)`
设置闪光灯。**参数:** `enabled` (boolean), `level` (number, 0.0-1.0, 可选，默认 1.0) **返回:** `boolean`

```javascript
// 开启闪光灯（最大亮度）
system.setFlashlight(true);

// 开启闪光灯（50% 亮度）
system.setFlashlight(true, 0.5);

// 关闭闪光灯
system.setFlashlight(false);
```

---

### 方向锁定

#### `system.isOrientationLockEnabled()`
检查方向锁定是否开启。**返回:** `boolean`

```javascript
if (system.isOrientationLockEnabled()) {
  console.log('方向锁定已开启');
}
```

#### `system.setOrientationLock(enabled)`
设置方向锁定。**参数:** `enabled` (boolean) **返回:** `boolean`

```javascript
// 开启方向锁定
system.setOrientationLock(true);

// 关闭方向锁定
system.setOrientationLock(false);
```

---

### 低电量模式

#### `system.isLowPowerModeEnabled()`
检查低电量模式是否开启。**返回:** `boolean`

```javascript
if (system.isLowPowerModeEnabled()) {
  console.log('低电量模式已开启');
}
```

#### `system.setLowPowerMode(enabled)`
设置低电量模式。**参数:** `enabled` (boolean) **返回:** `boolean`

```javascript
// 开启低电量模式
system.setLowPowerMode(true);

// 关闭低电量模式
system.setLowPowerMode(false);
```

---

### 位置服务

#### `system.isLocationServicesEnabled()`
检查位置服务是否开启。**返回:** `boolean`

```javascript
if (system.isLocationServicesEnabled()) {
  console.log('位置服务已开启');
}
```

#### `system.setLocationServices(enabled)`
设置位置服务。**参数:** `enabled` (boolean) **返回:** `boolean`

```javascript
// 开启位置服务
system.setLocationServices(true);

// 关闭位置服务
system.setLocationServices(false);
```

---

### 蜂窝数据

#### `system.isCellularDataEnabled()`
检查蜂窝数据是否开启。**返回:** `boolean`

```javascript
if (system.isCellularDataEnabled()) {
  console.log('蜂窝数据已开启');
}
```

#### `system.setCellularData(enabled)`
设置蜂窝数据。**参数:** `enabled` (boolean) **返回:** `boolean`

```javascript
// 开启蜂窝数据
system.setCellularData(true);

// 关闭蜂窝数据
system.setCellularData(false);
```

---

### 打开系统设置

#### `system.openSettings(section?)`
打开系统设置。**参数:** `section` (string, 可选) **返回:** `boolean`

**注意:** 在 Daemon 模式下不可用。

**支持的设置页面:**
- `"WIFI"` - WiFi 设置
- `"BLUETOOTH"` - 蓝牙设置
- `"CELLULAR"` / `"MOBILE_DATA"` - 蜂窝网络设置
- `"VPN"` - VPN 设置
- `"GENERAL"` - 通用设置
- `"DISPLAY"` / `"BRIGHTNESS"` - 显示与亮度
- `"SOUND"` / `"SOUNDS"` - 声音设置
- `"NOTIFICATION"` / `"NOTIFICATIONS"` - 通知设置
- `"PRIVACY"` - 隐私设置
- `"BATTERY"` - 电池设置
- `"STORAGE"` - 存储设置
- `"WALLPAPER"` - 壁纸设置
- `"SIRI"` - Siri 设置
- `"ACCESSIBILITY"` - 辅助功能
- `"DO_NOT_DISTURB"` / `"DND"` - 勿扰模式设置
- `"SCREEN_TIME"` - 屏幕使用时间
- `"PASSWORDS"` - 密码设置

```javascript
// 打开主设置页面
system.openSettings();

// 打开 WiFi 设置
system.openSettings('WIFI');

// 打开蓝牙设置
system.openSettings('BLUETOOTH');

// 打开隐私设置
system.openSettings('PRIVACY');
```

---

## 完整示例

### 示例 1: 智能场景切换

```javascript
function switchToSleepMode() {
  console.log('切换到睡眠模式...');

  // 开启勿扰模式
  system.setDoNotDisturb(true);

  // 降低音量
  system.setVolume(0.2);

  // 开启低电量模式
  system.setLowPowerMode(true);

  // 关闭 WiFi（可选）
  system.setWiFi(false);

  console.log('睡眠模式已启用');
  notification.send('睡眠模式', '已切换到睡眠模式');
}

function switchToWorkMode() {
  console.log('切换到工作模式...');

  // 关闭勿扰模式
  system.setDoNotDisturb(false);

  // 设置正常音量
  system.setVolume(0.7);

  // 开启 WiFi
  system.setWiFi(true);

  // 关闭低电量模式
  system.setLowPowerMode(false);

  console.log('工作模式已启用');
  notification.send('工作模式', '已切换到工作模式');
}

// 使用
switchToSleepMode();
```

### 示例 2: 自动飞行模式

```javascript
function autoAirplaneMode() {
  // 检查时间，晚上 11 点到早上 7 点自动开启飞行模式
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 23 || hour < 7) {
    if (!system.isAirplaneModeEnabled()) {
      system.setAirplaneMode(true);
      console.log('已自动开启飞行模式');
      notification.send('飞行模式', '已自动开启飞行模式（夜间）');
    }
  } else {
    if (system.isAirplaneModeEnabled()) {
      system.setAirplaneMode(false);
      console.log('已自动关闭飞行模式');
      notification.send('飞行模式', '已自动关闭飞行模式（白天）');
    }
  }
}

autoAirplaneMode();
```

### 示例 3: 音量管理器

```javascript
function volumeManager() {
  const currentVolume = system.getVolume();
  console.log(`当前音量: ${(currentVolume * 100).toFixed(0)}%`);

  // 根据时间调整音量
  const hour = new Date().getHours();

  if (hour >= 22 || hour < 8) {
    // 夜间：低音量
    system.setVolume(0.2);
    console.log('已切换到夜间音量');
  } else if (hour >= 8 && hour < 18) {
    // 白天：正常音量
    system.setVolume(0.7);
    console.log('已切换到白天音量');
  } else {
    // 晚上：中等音量
    system.setVolume(0.5);
    console.log('已切换到晚间音量');
  }
}

volumeManager();
```

### 示例 4: 闪光灯 SOS 信号

```javascript
function flashlightSOS() {
  if (!system.hasFlashlight()) {
    console.log('设备不支持闪光灯');
    return;
  }

  // SOS 摩尔斯电码: ... --- ...
  // 短闪 = 200ms, 长闪 = 600ms, 间隔 = 200ms

  function shortFlash() {
    system.setFlashlight(true);
    util.sleep(200);
    system.setFlashlight(false);
    util.sleep(200);
  }

  function longFlash() {
    system.setFlashlight(true);
    util.sleep(600);
    system.setFlashlight(false);
    util.sleep(200);
  }

  console.log('发送 SOS 信号...');

  // S (...)
  shortFlash();
  shortFlash();
  shortFlash();
  util.sleep(400);

  // O (---)
  longFlash();
  longFlash();
  longFlash();
  util.sleep(400);

  // S (...)
  shortFlash();
  shortFlash();
  shortFlash();

  console.log('SOS 信号发送完成');
}

flashlightSOS();
```

### 示例 5: 省电模式

```javascript
function enablePowerSavingMode() {
  console.log('启用省电模式...');

  const changes = [];

  // 开启低电量模式
  if (!system.isLowPowerModeEnabled()) {
    system.setLowPowerMode(true);
    changes.push('低电量模式');
  }

  // 关闭 WiFi
  if (system.isWiFiEnabled()) {
    system.setWiFi(false);
    changes.push('WiFi');
  }

  // 关闭蓝牙
  if (system.isBluetoothEnabled()) {
    system.setBluetooth(false);
    changes.push('蓝牙');
  }

  // 关闭位置服务
  if (system.isLocationServicesEnabled()) {
    system.setLocationServices(false);
    changes.push('位置服务');
  }

  // 降低亮度
  display.setBrightness(0.3);
  changes.push('屏幕亮度');

  console.log(`省电模式已启用，已调整: ${changes.join(', ')}`);
  notification.send('省电模式', `已启用省电模式\n调整了 ${changes.length} 项设置`);
}

function disablePowerSavingMode() {
  console.log('关闭省电模式...');

  system.setLowPowerMode(false);
  system.setWiFi(true);
  system.setBluetooth(true);
  system.setLocationServices(true);
  display.setBrightness(0.7);

  console.log('省电模式已关闭');
  notification.send('省电模式', '已关闭省电模式');
}

// 根据电量自动切换
const battery = device.battery();
if (battery.level < 0.2) {
  enablePowerSavingMode();
}
```

### 示例 6: 系统状态监控

```javascript
function monitorSystemStatus() {
  console.log('=== 系统状态 ===');

  // 网络状态
  console.log('\n网络:');
  console.log(`WiFi: ${system.isWiFiEnabled() ? '开启' : '关闭'}`);
  console.log(`蓝牙: ${system.isBluetoothEnabled() ? '开启' : '关闭'}`);
  console.log(`蜂窝数据: ${system.isCellularDataEnabled() ? '开启' : '关闭'}`);
  console.log(`飞行模式: ${system.isAirplaneModeEnabled() ? '开启' : '关闭'}`);

  // 系统设置
  console.log('\n系统:');
  console.log(`勿扰模式: ${system.isDoNotDisturbEnabled() ? '开启' : '关闭'}`);
  console.log(`低电量模式: ${system.isLowPowerModeEnabled() ? '开启' : '关闭'}`);
  console.log(`方向锁定: ${system.isOrientationLockEnabled() ? '开启' : '关闭'}`);
  console.log(`位置服务: ${system.isLocationServicesEnabled() ? '开启' : '关闭'}`);

  // 音量
  const volume = system.getVolume();
  console.log(`\n音量: ${(volume * 100).toFixed(0)}%`);

  // 闪光灯
  if (system.hasFlashlight()) {
    console.log(`闪光灯: ${system.isFlashlightOn() ? '开启' : '关闭'}`);
  }

  // 设备信息
  const deviceInfo = device.info();
  const battery = device.battery();
  console.log('\n设备:');
  console.log(`型号: ${deviceInfo.model}`);
  console.log(`系统: iOS ${deviceInfo.systemVersion}`);
  console.log(`电量: ${(battery.level * 100).toFixed(0)}%`);
  console.log(`充电: ${battery.isCharging ? '是' : '否'}`);
}

monitorSystemStatus();
```

---

## 最佳实践

### 1. 检查当前状态

```javascript
// ✅ 正确 - 先检查再切换
if (!system.isWiFiEnabled()) {
  system.setWiFi(true);
}

// ❌ 错误 - 不检查直接切换
system.setWiFi(true);  // 可能已经开启
```

### 2. 音量范围验证

```javascript
// ✅ 正确 - 确保在有效范围内
const volume = Math.max(0, Math.min(1, userInput));
system.setVolume(volume);

// ❌ 错误 - 不验证范围
system.setVolume(userInput);  // 可能超出 0-1 范围
```

### 3. 闪光灯亮度控制

```javascript
// ✅ 正确 - 指定亮度级别
system.setFlashlight(true, 0.5);  // 50% 亮度

// ❌ 错误 - 总是最大亮度
system.setFlashlight(true);  // 可能太亮
```

### 4. 场景恢复

```javascript
// ✅ 正确 - 保存原始状态
const originalWiFi = system.isWiFiEnabled();
system.setWiFi(false);
// ... 执行操作
system.setWiFi(originalWiFi);  // 恢复原状态
```

---

## 注意事项

1. **TrollStore 权限**: 大部分功能需要 TrollStore 环境才能使用
2. **私有 API**: 使用 TSSystemSettings 私有 API，可能在未来 iOS 版本中失效
3. **Daemon 限制**: openSettings 在 Daemon 模式下不可用
4. **音量范围**: 音量值范围为 0.0-1.0，超出范围会被自动限制
5. **闪光灯亮度**: 亮度级别范围为 0.0-1.0
6. **设置页面**: openSettings 的 URL Scheme 可能在不同 iOS 版本中有差异
7. **权限要求**: 某些功能可能需要用户授权
8. **线程安全**: 所有操作都是线程安全的
