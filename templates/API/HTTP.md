# HTTP 网络请求

HTTP 模块提供了 HTTP/HTTPS 请求功能。你可以使用它来发送各种类型的 HTTP 请求、下载文件等。支持自定义请求头、请求体、超时设置，以及 SSL 证书验证绕过。

> **守护进程支持**: 完全支持。在触发器模式下可正常运行。

---

## 快速开始

```javascript
// GET 请求
const response = http.get('https://api.example.com/data');
console.log(response.data);

// POST 请求
const result = http.post('https://api.example.com/users', {
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice', age: 25 })
});

// 下载文件
const download = http.download(
  'https://example.com/file.zip',
  file.documentsPath() + '/file.zip'
);
```

---

## API 参考

### HTTP 请求方法

#### `http.get(url, options?)`
发送 GET 请求。**参数:** `url` (string), `options` (object) **返回:** `{ success, status?, data?, headers?, error? }`

#### `http.post(url, options?)`
发送 POST 请求。**参数:** `url` (string), `options` (object) **返回:** `{ success, status?, data?, headers?, error? }`

#### `http.put(url, options?)`
发送 PUT 请求。**参数:** `url` (string), `options` (object) **返回:** `{ success, status?, data?, headers?, error? }`

#### `http.delete(url, options?)`
发送 DELETE 请求。**参数:** `url` (string), `options` (object) **返回:** `{ success, status?, data?, headers?, error? }`

#### `http.patch(url, options?)`
发送 PATCH 请求。**参数:** `url` (string), `options` (object) **返回:** `{ success, status?, data?, headers?, error? }`

#### `http.head(url, options?)`
发送 HEAD 请求。**参数:** `url` (string), `options` (object) **返回:** `{ success, status?, data?, headers?, error? }`

#### `http.request(url, options)`
发送自定义请求。**参数:** `url` (string), `options` (object) **返回:** `{ success, status?, data?, headers?, error? }`

**options 配置项:**
- `method` - HTTP 方法（GET、POST 等）
- `headers` - 请求头对象
- `body` - 请求体（字符串）
- `timeout` - 超时时间（秒，默认 30）
- `insecure` - 忽略 SSL 证书验证（默认 false）

**返回值:**
- `success` - 请求是否成功
- `status` - HTTP 状态码
- `data` - 响应内容（字符串）
- `headers` - 响应头对象
- `error` - 错误信息（如果失败）

---

### 文件下载

#### `http.download(url, path, options?)`
下载文件到指定路径。**参数:** `url` (string), `path` (string), `options` (object) **返回:** `{ success, path, error }`

**options 配置项:**
- `insecure` - 忽略 SSL 证书验证（默认 false）

---

## 完整示例

### 示例 1: GET 请求

```javascript
const response = http.get('https://api.github.com/users/octocat');

if (response.success) {
  const user = JSON.parse(response.data);
  console.log('用户名:', user.login);
  console.log('粉丝数:', user.followers);
} else {
  console.error('请求失败:', response.error);
}
```

### 示例 2: POST 请求

```javascript
const data = {
  title: '测试文章',
  content: '这是内容',
  author: 'Alice'
};

const response = http.post('https://api.example.com/posts', {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  },
  body: JSON.stringify(data)
});

if (response.success) {
  console.log('创建成功:', response.data);
} else {
  console.error('创建失败:', response.error);
}
```

### 示例 3: 自定义请求

```javascript
const response = http.request('https://api.example.com/data', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'X-Custom-Header': 'value'
  },
  body: JSON.stringify({ key: 'value' }),
  timeout: 60
});
```

### 示例 4: 下载文件

```javascript
const url = 'https://example.com/file.zip';
const path = file.documentsPath() + '/download.zip';

const result = http.download(url, path);

if (result.success) {
  console.log('下载成功:', result.path);
  const stat = file.stat(result.path);
  console.log('文件大小:', stat.size, '字节');
} else {
  console.error('下载失败:', result.error);
}
```

### 示例 5: 忽略 SSL 证书验证

```javascript
// 用于自签名证书或测试环境
const response = http.get('https://self-signed.example.com/api', {
  insecure: true
});

if (response.success) {
  console.log('数据:', response.data);
}
```

### 示例 6: API 封装

```javascript
class ApiClient {
  constructor(baseUrl, token) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  request(method, path, data = null) {
    const url = this.baseUrl + path;
    const options = {
      method: method,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    return http.request(url, options);
  }

  get(path) {
    return this.request('GET', path);
  }

  post(path, data) {
    return this.request('POST', path, data);
  }

  put(path, data) {
    return this.request('PUT', path, data);
  }

  delete(path) {
    return this.request('DELETE', path);
  }
}

// 使用
const api = new ApiClient('https://api.example.com', 'token123');
const response = api.get('/users/1');
```

### 示例 7: 重试机制

```javascript
function requestWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    const response = http.get(url, options);

    if (response.success) {
      return response;
    }

    console.log(`重试 ${i + 1}/${maxRetries}...`);
    util.sleep(1000 * (i + 1));
  }

  return { success: false, error: '达到最大重试次数' };
}

const response = requestWithRetry('https://api.example.com/data');
```

### 示例 8: 批量请求

```javascript
function batchRequest(urls) {
  const results = [];

  urls.forEach((url, index) => {
    console.log(`请求 ${index + 1}/${urls.length}: ${url}`);
    const response = http.get(url);
    results.push({
      url: url,
      success: response.success,
      data: response.success ? response.data : null,
      error: response.error
    });
  });

  return results;
}

const urls = [
  'https://api.example.com/users/1',
  'https://api.example.com/users/2',
  'https://api.example.com/users/3'
];

const results = batchRequest(urls);
console.log(`成功: ${results.filter(r => r.success).length}/${results.length}`);
```

---

## 最佳实践

### 1. 检查响应状态

```javascript
// ✅ 正确
const response = http.get(url);
if (response.success && response.status === 200) {
  processData(response.data);
}

// ❌ 错误 - 不检查状态
const response = http.get(url);
const data = JSON.parse(response.data);  // 可能失败
```

### 2. 设置合适的超时

```javascript
// ✅ 正确 - 根据需求设置超时
const response = http.get(url, {
  timeout: 60  // 大文件或慢速 API
});

// ❌ 错误 - 使用默认超时可能不够
const response = http.get(slowApiUrl);
```

### 3. 处理 JSON 数据

```javascript
// ✅ 正确 - 使用 try-catch
try {
  const data = JSON.parse(response.data);
  processData(data);
} catch (error) {
  console.error('JSON 解析失败:', error);
}
```

### 4. 使用正确的 Content-Type

```javascript
// ✅ 正确 - 明确指定
const response = http.post(url, {
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

// ✅ 正确 - 表单数据
const response = http.post(url, {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: 'key1=value1&key2=value2'
});
```

### 5. 谨慎使用 insecure

```javascript
// ✅ 正确 - 仅在必要时使用
const isDev = storage.get('environment') === 'development';
const response = http.get(url, {
  insecure: isDev
});

// ❌ 错误 - 生产环境使用
const response = http.get(url, {
  insecure: true  // 不安全！
});
```

---

## 注意事项

1. **同步执行**: 所有请求都是同步的，会阻塞执行
2. **超时设置**: 默认超时 30 秒，下载超时 300 秒
3. **SSL 验证**: 默认验证 SSL 证书，使用 `insecure: true` 可绕过
4. **请求头**: 支持自定义请求头，会覆盖系统默认值
5. **响应大小**: 响应内容作为字符串返回，大文件建议使用 download
6. **错误处理**: 网络错误、超时等会在返回值中包含 error 字段
7. **线程安全**: 所有操作都是线程安全的
8. **守护进程**: 在 Daemon 模式下可正常使用
