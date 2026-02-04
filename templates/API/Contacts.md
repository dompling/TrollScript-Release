# Contacts 通讯录管理

Contacts 模块提供了通讯录管理功能。你可以使用它来读取、搜索、创建和删除联系人。

> **守护进程支持**: 有限支持。requestAccess 需要 UI 交互，其他操作需要预先获得权限。

---

## 快速开始

```javascript
// 请求通讯录权限
const result = contacts.requestAccess();
if (!result.granted) {
  console.error('权限被拒绝:', result.error);
}

// 检查权限
if (contacts.isAuthorized()) {
  // 获取所有联系人
  const all = contacts.getAll();
  console.log(`共有 ${all.length} 个联系人`);

  // 搜索联系人
  const results = contacts.search('张三');
  console.log('搜索结果:', results);

  // 按电话搜索
  const byPhone = contacts.searchByPhone('138');
  console.log('电话匹配:', byPhone);
}
```

---

## API 参考

### 权限管理

#### `contacts.requestAccess()`
请求通讯录访问权限。**返回:** `{ granted: boolean, error?: string }`

```javascript
const result = contacts.requestAccess();
if (result.granted) {
  console.log('权限已授予');
} else {
  console.error('权限被拒绝:', result.error);
}
```

#### `contacts.getAccessStatus()`
获取权限状态。**返回:** `'authorized'` | `'denied'` | `'restricted'` | `'notDetermined'`

```javascript
const status = contacts.getAccessStatus();
console.log('权限状态:', status);
```

#### `contacts.isAuthorized()`
检查是否已授权。**返回:** `boolean`

```javascript
if (contacts.isAuthorized()) {
  console.log('已授权访问通讯录');
}
```

---

### 获取联系人

#### `contacts.getAll(offset?, limit?)`
获取所有联系人。**参数:** `offset` (number, 可选), `limit` (number, 可选) **返回:** `Contact[]`

**Contact 对象结构:**
```javascript
{
  id: string,              // 联系人 ID
  name: string,            // 姓名
  givenName: string,       // 名
  familyName: string,      // 姓
  nickname: string,        // 昵称
  organizationName: string,// 公司
  departmentName: string,  // 部门
  jobTitle: string,        // 职位
  phones: [                // 电话列表
    { label: string, value: string }
  ],
  emails: [                // 邮箱列表
    { label: string, value: string }
  ],
  birthday: {              // 生日
    year: number,
    month: number,
    day: number
  },
  note: string             // 备注
}
```

```javascript
// 获取所有联系人
const all = contacts.getAll();
console.log(`共有 ${all.length} 个联系人`);

// 分页获取
const page1 = contacts.getAll(0, 20);   // 前 20 个
const page2 = contacts.getAll(20, 20);  // 第 21-40 个
```

#### `contacts.getCount()`
获取联系人总数。**返回:** `number`

```javascript
const count = contacts.getCount();
console.log(`通讯录中有 ${count} 个联系人`);
```

#### `contacts.getById(id)`
根据 ID 获取联系人。**参数:** `id` (string) **返回:** `Contact | null`

```javascript
const contact = contacts.getById('ABC123');
if (contact) {
  console.log('联系人:', contact.name);
}
```

---

### 搜索联系人

#### `contacts.search(query)`
按姓名搜索联系人。**参数:** `query` (string) **返回:** `Contact[]`

```javascript
// 搜索包含"张"的联系人
const results = contacts.search('张');
console.log(`找到 ${results.length} 个结果`);
```

#### `contacts.searchByPhone(phone)`
按电话号码搜索联系人。**参数:** `phone` (string) **返回:** `Contact[]`

```javascript
// 搜索包含"138"的电话
const results = contacts.searchByPhone('138');
results.forEach(contact => {
  console.log(`${contact.name}: ${contact.phones[0].value}`);
});
```

---

### 创建和删除

#### `contacts.create(data)`
创建新联系人。**参数:** `data` (object) **返回:** `{ success: boolean, id?: string, error?: string }`

**contact 参数结构:**
```javascript
{
  givenName: string,       // 名（必填）
  familyName?: string,     // 姓
  nickname?: string,       // 昵称
  organizationName?: string,// 公司
  departmentName?: string, // 部门
  jobTitle?: string,       // 职位
  phones?: [               // 电话列表
    { label: string, value: string }
  ],
  emails?: [               // 邮箱列表
    { label: string, value: string }
  ],
  birthday?: {             // 生日
    year: number,
    month: number,
    day: number
  },
  note?: string            // 备注
}
```

```javascript
const result = contacts.create({
  givenName: '三',
  familyName: '张',
  organizationName: 'ABC 公司',
  phones: [
    { label: '手机', value: '13800138000' },
    { label: '工作', value: '010-12345678' }
  ],
  emails: [
    { label: '工作', value: 'zhangsan@abc.com' }
  ],
  birthday: { year: 1990, month: 1, day: 1 },
  note: '重要客户'
});

if (result.success) {
  console.log('联系人创建成功，ID:', result.id);
} else {
  console.error('创建失败:', result.error);
}
```

#### `contacts.delete(id)`
删除联系人。**参数:** `id` (string) **返回:** `{ success: boolean, error?: string }`

```javascript
const result = contacts.delete('ABC123');
if (result.success) {
  console.log('联系人已删除');
} else {
  console.error('删除失败:', result.error);
}
```

---

### 分组管理

#### `contacts.getGroups()`
获取所有联系人分组。**返回:** `[{ id, name }]`

```javascript
const groups = contacts.getGroups();
groups.forEach(group => {
  console.log(`分组: ${group.name} (${group.id})`);
});
```

---

## 完整示例

### 示例 1: 导出通讯录

```javascript
function exportContacts() {
  if (!contacts.isAuthorized()) {
    console.log('请先授权访问通讯录');
    const result = contacts.requestAccess();
    if (!result.granted) {
      console.error('权限被拒绝:', result.error);
      return;
    }
  }

  const all = contacts.getAll();
  const data = all.map(c => ({
    姓名: c.name,
    电话: c.phones.map(p => p.value).join(', '),
    邮箱: c.emails.map(e => e.value).join(', '),
    公司: c.organizationName,
    职位: c.jobTitle
  }));

  const json = JSON.stringify(data, null, 2);
  const path = file.documentsPath() + '/contacts_export.json';
  file.write(path, json);

  console.log(`已导出 ${all.length} 个联系人到 ${path}`);
}

exportContacts();
```

### 示例 2: 查找重复联系人

```javascript
function findDuplicates() {
  const all = contacts.getAll();
  const phoneMap = {};
  const duplicates = [];

  all.forEach(contact => {
    contact.phones.forEach(phone => {
      const number = phone.value.replace(/\D/g, '');
      if (phoneMap[number]) {
        duplicates.push({
          phone: number,
          contacts: [phoneMap[number], contact.name]
        });
      } else {
        phoneMap[number] = contact.name;
      }
    });
  });

  console.log(`找到 ${duplicates.length} 个重复电话:`);
  duplicates.forEach(d => {
    console.log(`${d.phone}: ${d.contacts.join(', ')}`);
  });
}

findDuplicates();
```

### 示例 3: 批量导入联系人

```javascript
function importContacts(data) {
  let success = 0;
  let failed = 0;

  data.forEach(item => {
    const contact = {
      givenName: item.name,
      phones: [{ label: '手机', value: item.phone }],
      emails: item.email ? [{ label: '工作', value: item.email }] : [],
      organizationName: item.company || ''
    };

    const result = contacts.create(contact);
    if (result.success) {
      success++;
    } else {
      failed++;
      console.error(`创建失败 (${item.name}):`, result.error);
    }
  });

  console.log(`导入完成: 成功 ${success}, 失败 ${failed}`);
}

const data = [
  { name: '张三', phone: '13800138000', email: 'zhangsan@example.com', company: 'ABC' },
  { name: '李四', phone: '13900139000', email: 'lisi@example.com', company: 'XYZ' }
];

importContacts(data);
```

### 示例 4: 生日提醒

```javascript
function checkBirthdays() {
  const all = contacts.getAll();
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const birthdays = all.filter(c => {
    return c.birthday &&
           c.birthday.month === month &&
           c.birthday.day === day;
  });

  if (birthdays.length > 0) {
    const names = birthdays.map(c => c.name).join(', ');
    notification.send('生日提醒', `今天是 ${names} 的生日！`);
    console.log(`今天有 ${birthdays.length} 个生日`);
  } else {
    console.log('今天没有生日');
  }
}

checkBirthdays();
```

### 示例 5: 联系人统计

```javascript
function analyzeContacts() {
  const all = contacts.getAll();

  // 统计
  const stats = {
    total: all.length,
    withPhone: 0,
    withEmail: 0,
    withCompany: 0,
    withBirthday: 0
  };

  all.forEach(c => {
    if (c.phones.length > 0) stats.withPhone++;
    if (c.emails.length > 0) stats.withEmail++;
    if (c.organizationName) stats.withCompany++;
    if (c.birthday) stats.withBirthday++;
  });

  console.log('=== 通讯录统计 ===');
  console.log(`总数: ${stats.total}`);
  console.log(`有电话: ${stats.withPhone} (${(stats.withPhone/stats.total*100).toFixed(1)}%)`);
  console.log(`有邮箱: ${stats.withEmail} (${(stats.withEmail/stats.total*100).toFixed(1)}%)`);
  console.log(`有公司: ${stats.withCompany} (${(stats.withCompany/stats.total*100).toFixed(1)}%)`);
  console.log(`有生日: ${stats.withBirthday} (${(stats.withBirthday/stats.total*100).toFixed(1)}%)`);
}

analyzeContacts();
```

---

## 最佳实践

### 1. 检查权限

```javascript
// ✅ 正确
if (contacts.isAuthorized()) {
  const all = contacts.getAll();
}

// ❌ 错误 - 不检查权限
const all = contacts.getAll();  // 可能返回空数组
```

### 2. 使用分页

```javascript
// ✅ 正确 - 大量联系人时使用分页
const pageSize = 50;
for (let i = 0; i < contacts.getCount(); i += pageSize) {
  const page = contacts.getAll(i, pageSize);
  processContacts(page);
}

// ❌ 错误 - 一次性加载所有联系人
const all = contacts.getAll();  // 可能很慢
```

### 3. 处理空值

```javascript
// ✅ 正确
const contact = contacts.getById(id);
if (contact) {
  console.log(contact.name);
}

// ❌ 错误 - 不检查空值
const contact = contacts.getById(id);
console.log(contact.name);  // 可能报错
```

### 4. 验证必填字段

```javascript
// ✅ 正确
if (name && name.trim()) {
  contacts.create({ givenName: name });
}

// ❌ 错误 - 不验证
contacts.create({ givenName: '' });  // 会失败
```

---

## 注意事项

1. **权限要求**: 首次使用需要请求通讯录权限
2. **必填字段**: 创建联系人时 `givenName` 是必填的
3. **ID 唯一性**: 联系人 ID 由系统生成，不可自定义
4. **分页性能**: 大量联系人时建议使用分页加载
5. **搜索匹配**: 搜索是模糊匹配，不区分大小写
6. **电话格式**: 电话号码保留原始格式，包含空格和符号
7. **生日格式**: 生日的 month 范围是 1-12，day 范围是 1-31
8. **线程安全**: 所有操作都是线程安全的
