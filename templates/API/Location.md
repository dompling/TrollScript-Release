# Location 定位服务

Location 模块提供了定位服务功能。你可以使用它来获取当前位置、计算距离、地理编码等。支持使用 TrollStore 权限控制系统定位服务开关。

> **守护进程支持**: 完全支持。在触发器模式下可正常运行。

---

## 快速开始

```javascript
// 请求定位权限
location.requestAccess();

// 获取当前位置
if (location.isAuthorized()) {
  const pos = location.getCurrent();
  console.log(`位置: ${pos.lat}, ${pos.lng}`);
}

// 计算距离
const distance = location.distance(39.9, 116.4, 31.2, 121.5);
console.log(`距离: ${distance} 米`);

// 地理编码
const results = location.geocode('北京天安门');
console.log(results[0]);
```

---

## API 参考

### 权限管理

#### `location.requestAccess()`
请求定位权限。**返回:** `void`

#### `location.getAccessStatus()`
获取权限状态。**返回:** `'authorized'` | `'denied'` | `'restricted'` | `'notDetermined'` | `'unknown'`

#### `location.isAuthorized()`
检查是否已授权。**返回:** `boolean`

#### `location.isLocationServicesEnabled()`
检查定位服务是否开启。**返回:** `boolean`

#### `location.hasTrollStorePermission()`
检查是否有 TrollStore 权限。**返回:** `boolean`

---

### 定位服务开关（TrollStore Only）

#### `location.setLocationServicesEnabled(enabled)`
开关系统定位服务。**参数:** `enabled` (boolean) **返回:** `{ success, enabled?, message? }`

**注意:** 需要 TrollStore 权限

#### `location.toggleLocationServices()`
切换定位服务状态。**返回:** `{ success, enabled?, message? }`

**注意:** 需要 TrollStore 权限

---

### 位置获取

#### `location.getCurrent()`
获取当前位置。**返回:** `{ lat, lng, alt, course, speed, accuracy, timestamp } | null`

**返回值字段:**
- `lat` - 纬度
- `lng` - 经度
- `alt` - 海拔（米）
- `course` - 方向（度）
- `speed` - 速度（米/秒）
- `accuracy` - 精度（米）
- `timestamp` - 时间戳

#### `location.current()`
`getCurrent()` 的别名。

---

### 计算

#### `location.distance(lat1, lng1, lat2, lng2)`
计算两点距离。**参数:** 4 个 number **返回:** `number`（米）

```javascript
const distance = location.distance(39.9, 116.4, 31.2, 121.5);
console.log(`距离: ${(distance / 1000).toFixed(2)} 公里`);
```

---

### 地理编码

#### `location.geocode(address)`
地址转坐标。**参数:** `address` (string) **返回:** `[{ lat, lng, name }]`

```javascript
const results = location.geocode('北京天安门');
if (results.length > 0) {
  console.log(`坐标: ${results[0].lat}, ${results[0].lng}`);
}
```

#### `location.reverseGeocode(lat, lng, locale?)`
坐标转地址。**参数:** `lat` (number), `lng` (number), `locale` (string, 可选) **返回:** `[{ name, country, locality, ... }]`

**locale 参数:** 可选，指定语言（如 `'zh_CN'`, `'en_US'`），默认使用系统语言

**返回值字段:**
- `name` - 地点名称
- `country` - 国家
- `locality` - 城市
- `administrativeArea` - 省/州
- `subLocality` - 区/县
- `thoroughfare` - 街道
- `postalCode` - 邮编

```javascript
const results = location.reverseGeocode(39.9, 116.4);
if (results.length > 0) {
  const addr = results[0];
  console.log(`${addr.country} ${addr.locality} ${addr.thoroughfare}`);
}

// 指定语言
const enResults = location.reverseGeocode(39.9, 116.4, 'en_US');
const zhResults = location.reverseGeocode(39.9, 116.4, 'zh_CN');
```

---

## 完整示例

### 示例 1: 获取当前位置

```javascript
function getCurrentLocation() {
  if (!location.isAuthorized()) {
    console.log('请求定位权限...');
    location.requestAccess();
    return null;
  }

  const pos = location.getCurrent();
  if (pos) {
    console.log(`纬度: ${pos.lat}`);
    console.log(`经度: ${pos.lng}`);
    console.log(`精度: ${pos.accuracy} 米`);
    return pos;
  } else {
    console.error('无法获取位置');
    return null;
  }
}

getCurrentLocation();
```

### 示例 2: 距离计算

```javascript
function calculateDistance(from, to) {
  const distance = location.distance(
    from.lat, from.lng,
    to.lat, to.lng
  );

  const km = (distance / 1000).toFixed(2);
  console.log(`距离: ${km} 公里`);

  return distance;
}

const beijing = { lat: 39.9, lng: 116.4 };
const shanghai = { lat: 31.2, lng: 121.5 };
calculateDistance(beijing, shanghai);
```

### 示例 3: 地理编码

```javascript
function searchLocation(address) {
  const results = location.geocode(address);

  if (results.length === 0) {
    console.log('未找到结果');
    return null;
  }

  console.log(`找到 ${results.length} 个结果:`);
  results.forEach((r, i) => {
    console.log(`${i + 1}. ${r.name} (${r.lat}, ${r.lng})`);
  });

  return results[0];
}

searchLocation('北京天安门');
```

### 示例 4: 反向地理编码

```javascript
function getAddress(lat, lng) {
  const results = location.reverseGeocode(lat, lng);

  if (results.length === 0) {
    console.log('未找到地址');
    return null;
  }

  const addr = results[0];
  const fullAddress = [
    addr.country,
    addr.administrativeArea,
    addr.locality,
    addr.subLocality,
    addr.thoroughfare
  ].filter(x => x).join(' ');

  console.log('地址:', fullAddress);
  return fullAddress;
}

getAddress(39.9, 116.4);
```

### 示例 5: 位置监控

```javascript
function monitorLocation() {
  let lastPos = null;

  setInterval(() => {
    const pos = location.getCurrent();
    if (!pos) return;

    if (lastPos) {
      const distance = location.distance(
        lastPos.lat, lastPos.lng,
        pos.lat, pos.lng
      );

      if (distance > 100) {
        console.log(`移动了 ${distance.toFixed(0)} 米`);
        notification.send('位置变化', `移动了 ${distance.toFixed(0)} 米`);
      }
    }

    lastPos = pos;
  }, 60000);  // 每分钟检查一次
}

monitorLocation();
```

### 示例 6: 定位服务控制（TrollStore）

```javascript
function toggleLocationService() {
  if (!location.hasTrollStorePermission()) {
    console.error('需要 TrollStore 权限');
    return false;
  }

  const result = location.toggleLocationServices();

  if (result.success) {
    const status = result.enabled ? '已开启' : '已关闭';
    console.log(`定位服务${status}`);
    notification.send('定位服务', status);
    return true;
  } else {
    console.error('切换失败:', result.message);
    return false;
  }
}

toggleLocationService();
```

---

## 最佳实践

### 1. 检查权限

```javascript
// ✅ 正确
if (location.isAuthorized()) {
  const pos = location.getCurrent();
}

// ❌ 错误 - 不检查权限
const pos = location.getCurrent();  // 可能返回 null
```

### 2. 处理空值

```javascript
// ✅ 正确
const pos = location.getCurrent();
if (pos) {
  console.log(pos.lat, pos.lng);
}

// ❌ 错误 - 不检查空值
const pos = location.getCurrent();
console.log(pos.lat);  // 可能报错
```

### 3. 使用合适的精度

```javascript
// ✅ 正确 - 检查精度
const pos = location.getCurrent();
if (pos && pos.accuracy < 100) {
  // 精度足够，使用位置
  processLocation(pos);
}
```

### 4. 谨慎使用定位服务开关

```javascript
// ✅ 正确 - 检查权限
if (location.hasTrollStorePermission()) {
  location.setLocationServicesEnabled(false);
}

// ❌ 错误 - 不检查权限
location.setLocationServicesEnabled(false);  // 会失败
```

---

## 注意事项

1. **权限要求**: 首次使用需要请求定位权限
2. **精度**: 定位精度受环境影响，室内精度较低
3. **超时**: 获取位置最多等待 30 秒
4. **TrollStore**: 定位服务开关需要 TrollStore 权限
5. **地理编码**: 需要网络连接，最多等待 30 秒
6. **语言**: reverseGeocode 支持指定语言，默认使用系统语言
7. **距离单位**: distance 返回米，需要自行转换为公里
8. **线程安全**: 所有操作都是线程安全的
