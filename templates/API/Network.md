# Network 网络操作

Network 模块提供了网络状态检测、URL 处理、网络工具和 VPN 管理等功能。

> **守护进程支持**: 有限支持。openSettings 方法需要 UI 交互，Daemon 模式下不可用。

---

## 快速开始

```javascript
// 检查网络状态
if (network.isReachable()) {
  const type = network.getConnectionType();
  console.log('网络类型:', type);  // wifi 或 cellular
}

// URL 编码
const encoded = network.encodeURL('你好 世界');
console.log(encoded);  // %E4%BD%A0%E5%A5%BD%20%E4%B8%96%E7%95%8C

// Ping 测试
const result = network.ping('google.com');
console.log(`延迟: ${result.latency}ms`);

// VPN 管理
const vpns = network.listVPNs();
console.log('VPN 列表:', vpns);
```

---

## API 参考

### 网络状态

#### `network.isReachable()`
检查网络是否可用。**返回:** `boolean`

#### `network.getConnectionType()`
获取连接类型。**返回:** `'wifi'` | `'cellular'` | `'none'`

#### `network.getIPAddress()`
获取设备 IP 地址。**返回:** `string | null`

---

### URL 操作

#### `network.encodeURL(string)`
URL 编码。**参数:** `string` **返回:** `string`

#### `network.decodeURL(string)`
URL 解码。**参数:** `string` **返回:** `string`

#### `network.parseURL(url)`
解析 URL 组件。**返回:** `{ scheme, host, port, path, query, fragment, params }`

#### `network.buildURL(baseURL, params?)`
构建带参数的 URL。**参数:** `baseURL` (string), `params` (object) **返回:** `string`

---

### 网络工具

#### `network.ping(host)`
Ping 主机。**参数:** `host` (string) **返回:** `{ success, latency }`

#### `network.download(url, filename?)`
下载文件到 Documents 目录。**参数:** `url` (string), `filename` (string) **返回:** `{ success, path, error }`

---

### VPN 管理

#### `network.listVPNs()`
列出 VPN 配置。**返回:** `[{ name, active }]`

#### `network.connectVPN(name?)`
连接 VPN。**参数:** `name` (string, 可选) **返回:** `boolean`

#### `network.disconnectVPN()`
断开 VPN。**返回:** `boolean`

#### `network.getVPNStatus()`
获取 VPN 状态。**返回:** `{ connected, name? }`

---

### 系统设置

#### `network.openSettings(section?)`
打开系统设置。**参数:** `section` (string, 可选) **返回:** `boolean`

**支持的 section:**
- `'WIFI'` - Wi-Fi 设置
- `'BLUETOOTH'` - 蓝牙设置
- `'CELLULAR'` - 蜂窝网络设置
- `'VPN'` - VPN 设置
- `'GENERAL'` - 通用设置
- `'PRIVACY'` - 隐私设置
- `'NOTIFICATION'` - 通知设置

---

## 完整示例

### 示例 1: 网络状态检测

```javascript
function checkNetwork() {
  if (!network.isReachable()) {
    console.log('网络不可用');
    return false;
  }

  const type = network.getConnectionType();
  const ip = network.getIPAddress();

  console.log('网络类型:', type);
  console.log('IP 地址:', ip);

  if (type === 'cellular') {
    console.log('当前使用蜂窝网络，注意流量消耗');
  }

  return true;
}

checkNetwork();
```

### 示例 2: URL 处理

```javascript
// 构建 API URL
const baseUrl = 'https://api.example.com/search';
const params = {
  q: '搜索关键词',
  page: 1,
  limit: 20
};

const url = network.buildURL(baseUrl, params);
console.log('完整 URL:', url);

// 解析 URL
const parsed = network.parseURL(url);
console.log('主机:', parsed.host);
console.log('路径:', parsed.path);
console.log('参数:', parsed.params);
```

### 示例 3: 网络延迟测试

```javascript
function testLatency(hosts) {
  const results = [];

  hosts.forEach(host => {
    const result = network.ping(host);
    results.push({
      host: host,
      success: result.success,
      latency: result.latency
    });
  });

  // 排序
  results.sort((a, b) => a.latency - b.latency);

  console.log('=== 延迟测试结果 ===');
  results.forEach(r => {
    if (r.success) {
      console.log(`${r.host}: ${r.latency}ms`);
    } else {
      console.log(`${r.host}: 失败`);
    }
  });

  return results;
}

testLatency(['google.com', 'baidu.com', 'github.com']);
```

### 示例 4: VPN 自动连接

```javascript
function autoConnectVPN() {
  const status = network.getVPNStatus();

  if (status.connected) {
    console.log('VPN 已连接:', status.name);
    return true;
  }

  const vpns = network.listVPNs();
  if (vpns.length === 0) {
    console.log('没有配置 VPN');
    return false;
  }

  console.log('正在连接 VPN...');
  const success = network.connectVPN();

  if (success) {
    console.log('VPN 连接成功');
    haptic.success();
  } else {
    console.log('VPN 连接失败');
    haptic.error();
  }

  return success;
}

autoConnectVPN();
```

### 示例 5: 文件下载

```javascript
function downloadFile(url, filename) {
  if (!network.isReachable()) {
    console.error('网络不可用');
    return false;
  }

  console.log('开始下载:', url);
  const result = network.download(url, filename);

  if (result.success) {
    console.log('下载成功:', result.path);
    const stat = file.stat(result.path);
    console.log('文件大小:', stat.size, '字节');

    notification.send('下载完成', filename);
    return true;
  } else {
    console.error('下载失败:', result.error);
    notification.send('下载失败', result.error);
    return false;
  }
}

downloadFile('https://example.com/file.zip', 'download.zip');
```

### 示例 6: 网络监控

```javascript
function monitorNetwork() {
  let lastType = network.getConnectionType();

  setInterval(() => {
    const currentType = network.getConnectionType();

    if (currentType !== lastType) {
      console.log(`网络变化: ${lastType} -> ${currentType}`);

      if (currentType === 'none') {
        notification.send('网络断开', '网络连接已断开');
      } else if (lastType === 'none') {
        notification.send('网络恢复', `已连接到 ${currentType}`);
      } else {
        notification.send('网络切换', `从 ${lastType} 切换到 ${currentType}`);
      }

      lastType = currentType;
    }
  }, 5000);
}

monitorNetwork();
```

---

## 最佳实践

### 1. 检查网络状态

```javascript
// ✅ 正确
if (network.isReachable()) {
  const response = http.get(url);
}

// ❌ 错误 - 不检查网络
const response = http.get(url);  // 可能失败
```

### 2. URL 编码

```javascript
// ✅ 正确 - 编码特殊字符
const keyword = network.encodeURL('搜索 关键词');
const url = `https://api.example.com/search?q=${keyword}`;

// ❌ 错误 - 不编码
const url = `https://api.example.com/search?q=搜索 关键词`;
```

### 3. 处理网络类型

```javascript
// ✅ 正确 - 根据网络类型调整行为
const type = network.getConnectionType();
if (type === 'cellular') {
  // 使用低质量设置
  downloadLowQuality();
} else if (type === 'wifi') {
  // 使用高质量设置
  downloadHighQuality();
}
```

### 4. VPN 状态检查

```javascript
// ✅ 正确
const status = network.getVPNStatus();
if (!status.connected) {
  network.connectVPN();
}

// ❌ 错误 - 不检查状态
network.connectVPN();  // 可能已经连接
```

---

## 注意事项

1. **网络权限**: 不需要特殊权限
2. **VPN 管理**: 需要用户在系统中配置 VPN
3. **下载路径**: download 方法下载到 Documents 目录
4. **Ping 超时**: ping 方法超时时间为 5 秒
5. **IP 地址**: 仅返回 Wi-Fi 接口的 IP 地址
6. **URL 编码**: 使用标准的百分号编码
7. **系统设置**: openSettings 在某些 iOS 版本上可能不可用
8. **线程安全**: 所有操作都是线程安全的
