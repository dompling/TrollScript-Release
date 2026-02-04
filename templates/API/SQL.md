# SQL 数据库操作

SQL 模块提供了 SQLite 数据库操作功能。你可以使用它来创建、查询、更新数据库，支持事务、参数化查询等高级特性。

> **守护进程支持**: 完全支持。在触发器模式下可正常运行。

---

## 快速开始

```javascript
// 打开数据库
sql.open('mydb');

// 创建表
sql.execute('mydb', `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER,
    email TEXT
  )
`);

// 插入数据
sql.execute('mydb',
  'INSERT INTO users (name, age, email) VALUES (?, ?, ?)',
  ['张三', 25, 'zhangsan@example.com']
);

// 查询数据
const users = sql.query('mydb', 'SELECT * FROM users');
console.log('用户列表:', users);

// 关闭数据库
sql.close('mydb');
```

---

## API 参考

### 数据库管理

#### `sql.open(name)`
打开或创建数据库。**参数:** `name` (string) **返回:** `boolean`

数据库文件存储在 Documents 目录，扩展名为 `.sqlite`。

```javascript
const success = sql.open('mydb');
if (success) {
  console.log('数据库已打开');
}
```

#### `sql.close(name)`
关闭数据库连接。**参数:** `name` (string) **返回:** `boolean`

```javascript
sql.close('mydb');
```

---

### 执行操作

#### `sql.execute(name, sql, params?)`
执行 SQL 语句（INSERT、UPDATE、DELETE、CREATE 等）。**参数:** `name` (string), `sql` (string), `params` (array, 可选) **返回:** `boolean`

**支持参数化查询**，使用 `?` 占位符防止 SQL 注入。

```javascript
// 创建表
sql.execute('mydb', `
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name TEXT,
    price REAL
  )
`);

// 插入数据（参数化）
sql.execute('mydb',
  'INSERT INTO products (name, price) VALUES (?, ?)',
  ['iPhone', 5999.00]
);

// 更新数据
sql.execute('mydb',
  'UPDATE products SET price = ? WHERE name = ?',
  [4999.00, 'iPhone']
);

// 删除数据
sql.execute('mydb',
  'DELETE FROM products WHERE price < ?',
  [1000]
);
```

#### `sql.query(name, sql, params?)`
查询数据，返回所有结果。**参数:** `name` (string), `sql` (string), `params` (array, 可选) **返回:** `array`

```javascript
// 查询所有
const all = sql.query('mydb', 'SELECT * FROM users');
console.log('所有用户:', all);

// 条件查询（参数化）
const adults = sql.query('mydb',
  'SELECT * FROM users WHERE age >= ?',
  [18]
);

// 复杂查询
const results = sql.query('mydb', `
  SELECT name, age, email
  FROM users
  WHERE age BETWEEN ? AND ?
  ORDER BY age DESC
  LIMIT ?
`, [20, 30, 10]);
```

#### `sql.queryOne(name, sql, params?)`
查询单条数据。**参数:** `name` (string), `sql` (string), `params` (array, 可选) **返回:** `object | null`

```javascript
// 查询单个用户
const user = sql.queryOne('mydb',
  'SELECT * FROM users WHERE id = ?',
  [1]
);

if (user) {
  console.log('用户名:', user.name);
}

// 统计查询
const count = sql.queryOne('mydb',
  'SELECT COUNT(*) as total FROM users'
);
console.log('总用户数:', count.total);
```

---

### 表管理

#### `sql.tableExists(name, tableName)`
检查表是否存在。**参数:** `name` (string), `tableName` (string) **返回:** `boolean`

```javascript
if (sql.tableExists('mydb', 'users')) {
  console.log('users 表存在');
}
```

#### `sql.getTables(name)`
获取所有表名。**参数:** `name` (string) **返回:** `string[]`

```javascript
const tables = sql.getTables('mydb');
console.log('数据库中的表:', tables);
```

#### `sql.getTableInfo(name, tableName)`
获取表结构信息。**参数:** `name` (string), `tableName` (string) **返回:** `array`

返回列信息数组，每个元素包含：
- `cid` - 列 ID
- `name` - 列名
- `type` - 数据类型
- `notnull` - 是否非空 (0/1)
- `dflt_value` - 默认值
- `pk` - 是否主键 (0/1)

```javascript
const info = sql.getTableInfo('mydb', 'users');
info.forEach(col => {
  console.log(`${col.name}: ${col.type} ${col.pk ? '(主键)' : ''}`);
});
```

---

### 优化与维护

#### `sql.vacuum(name)`
优化数据库，回收空间。**参数:** `name` (string) **返回:** `boolean`

```javascript
sql.vacuum('mydb');
console.log('数据库已优化');
```

---

### 事务管理

#### `sql.beginTransaction(name)`
开始事务。**参数:** `name` (string) **返回:** `boolean`

#### `sql.commit(name)`
提交事务。**参数:** `name` (string) **返回:** `boolean`

#### `sql.rollback(name)`
回滚事务。**参数:** `name` (string) **返回:** `boolean`

```javascript
// 使用事务确保数据一致性
sql.beginTransaction('mydb');

try {
  sql.execute('mydb', 'UPDATE accounts SET balance = balance - ? WHERE id = ?', [100, 1]);
  sql.execute('mydb', 'UPDATE accounts SET balance = balance + ? WHERE id = ?', [100, 2]);

  sql.commit('mydb');
  console.log('转账成功');
} catch (error) {
  sql.rollback('mydb');
  console.error('转账失败，已回滚');
}
```

---

## 完整示例

### 示例 1: 用户管理系统

```javascript
// 初始化数据库
function initDatabase() {
  sql.open('users');

  sql.execute('users', `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      email TEXT,
      created_at INTEGER
    )
  `);

  console.log('数据库初始化完成');
}

// 创建用户
function createUser(username, password, email) {
  const timestamp = Date.now();

  const success = sql.execute('users',
    'INSERT INTO users (username, password, email, created_at) VALUES (?, ?, ?, ?)',
    [username, password, email, timestamp]
  );

  if (success) {
    console.log('用户创建成功:', username);
    return true;
  } else {
    console.error('用户创建失败');
    return false;
  }
}

// 查询用户
function getUser(username) {
  return sql.queryOne('users',
    'SELECT * FROM users WHERE username = ?',
    [username]
  );
}

// 使用
initDatabase();
createUser('alice', 'pass123', 'alice@example.com');
const user = getUser('alice');
console.log('用户信息:', user);
```

### 示例 2: 日志记录系统

```javascript
function setupLogDatabase() {
  sql.open('logs');

  sql.execute('logs', `
    CREATE TABLE IF NOT EXISTS app_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      level TEXT,
      message TEXT,
      timestamp INTEGER
    )
  `);
}

function log(level, message) {
  sql.execute('logs',
    'INSERT INTO app_logs (level, message, timestamp) VALUES (?, ?, ?)',
    [level, message, Date.now()]
  );
}

function getLogs(level, limit = 100) {
  if (level) {
    return sql.query('logs',
      'SELECT * FROM app_logs WHERE level = ? ORDER BY timestamp DESC LIMIT ?',
      [level, limit]
    );
  } else {
    return sql.query('logs',
      'SELECT * FROM app_logs ORDER BY timestamp DESC LIMIT ?',
      [limit]
    );
  }
}

function clearOldLogs(daysOld = 7) {
  const cutoff = Date.now() - (daysOld * 24 * 60 * 60 * 1000);
  sql.execute('logs',
    'DELETE FROM app_logs WHERE timestamp < ?',
    [cutoff]
  );
  sql.vacuum('logs');
}

// 使用
setupLogDatabase();
log('INFO', '应用启动');
log('ERROR', '网络连接失败');

const errors = getLogs('ERROR', 50);
console.log('错误日志:', errors);
```

### 示例 3: 数据统计分析

```javascript
function analyzeData() {
  sql.open('analytics');

  // 按日期统计
  const dailyStats = sql.query('analytics', `
    SELECT
      DATE(timestamp/1000, 'unixepoch') as date,
      COUNT(*) as count,
      AVG(value) as avg_value
    FROM events
    GROUP BY date
    ORDER BY date DESC
    LIMIT 30
  `);

  console.log('每日统计:', dailyStats);

  // 按类型统计
  const typeStats = sql.query('analytics', `
    SELECT
      type,
      COUNT(*) as count,
      SUM(value) as total
    FROM events
    GROUP BY type
    ORDER BY count DESC
  `);

  console.log('类型统计:', typeStats);

  // 获取最近记录
  const recent = sql.query('analytics', `
    SELECT * FROM events
    ORDER BY timestamp DESC
    LIMIT 10
  `);

  console.log('最近事件:', recent);
}

analyzeData();
```

### 示例 4: 数据迁移

```javascript
function migrateDatabase() {
  sql.open('mydb');

  // 检查版本
  if (!sql.tableExists('mydb', 'schema_version')) {
    sql.execute('mydb', `
      CREATE TABLE schema_version (
        version INTEGER PRIMARY KEY
      )
    `);
    sql.execute('mydb', 'INSERT INTO schema_version VALUES (0)');
  }

  const versionRow = sql.queryOne('mydb', 'SELECT version FROM schema_version');
  const currentVersion = versionRow.version;

  console.log('当前数据库版本:', currentVersion);

  // 执行迁移
  if (currentVersion < 1) {
    console.log('执行迁移到版本 1...');
    sql.execute('mydb', 'ALTER TABLE users ADD COLUMN phone TEXT');
    sql.execute('mydb', 'UPDATE schema_version SET version = 1');
  }

  if (currentVersion < 2) {
    console.log('执行迁移到版本 2...');
    sql.execute('mydb', `
      CREATE TABLE user_settings (
        user_id INTEGER,
        key TEXT,
        value TEXT,
        PRIMARY KEY (user_id, key)
      )
    `);
    sql.execute('mydb', 'UPDATE schema_version SET version = 2');
  }

  console.log('数据库迁移完成');
}

migrateDatabase();
```

### 示例 5: 批量操作

```javascript
function batchInsert(data) {
  sql.open('mydb');

  sql.beginTransaction('mydb');

  try {
    let success = 0;
    let failed = 0;

    data.forEach(item => {
      const result = sql.execute('mydb',
        'INSERT INTO products (name, price, category) VALUES (?, ?, ?)',
        [item.name, item.price, item.category]
      );

      if (result) {
        success++;
      } else {
        failed++;
      }
    });

    sql.commit('mydb');
    console.log(`批量插入完成: 成功 ${success}, 失败 ${failed}`);

  } catch (error) {
    sql.rollback('mydb');
    console.error('批量插入失败，已回滚');
  }
}

const products = [
  { name: 'iPhone', price: 5999, category: '手机' },
  { name: 'iPad', price: 3999, category: '平板' },
  { name: 'MacBook', price: 9999, category: '电脑' }
];

batchInsert(products);
```

---

## 最佳实践

### 1. 使用参数化查询

```javascript
// ✅ 正确 - 使用参数化查询
sql.execute('mydb',
  'SELECT * FROM users WHERE name = ?',
  [userName]
);

// ❌ 错误 - 字符串拼接（SQL 注入风险）
sql.execute('mydb',
  `SELECT * FROM users WHERE name = '${userName}'`
);
```

### 2. 使用事务保证一致性

```javascript
// ✅ 正确 - 使用事务
sql.beginTransaction('mydb');
try {
  sql.execute('mydb', 'UPDATE ...');
  sql.execute('mydb', 'INSERT ...');
  sql.commit('mydb');
} catch (error) {
  sql.rollback('mydb');
}

// ❌ 错误 - 不使用事务
sql.execute('mydb', 'UPDATE ...');
sql.execute('mydb', 'INSERT ...');  // 可能不一致
```

### 3. 检查表是否存在

```javascript
// ✅ 正确
if (!sql.tableExists('mydb', 'users')) {
  sql.execute('mydb', 'CREATE TABLE users (...)');
}

// ❌ 错误 - 不检查
sql.execute('mydb', 'CREATE TABLE users (...)');  // 可能报错
```

### 4. 及时关闭数据库

```javascript
// ✅ 正确
sql.open('mydb');
// ... 操作
sql.close('mydb');

// ❌ 错误 - 不关闭
sql.open('mydb');
// ... 操作
// 忘记关闭
```

### 5. 定期优化数据库

```javascript
// ✅ 正确 - 定期清理和优化
function maintenance() {
  sql.execute('mydb', 'DELETE FROM logs WHERE timestamp < ?', [cutoff]);
  sql.vacuum('mydb');
}
```

---

## 注意事项

1. **数据库位置**: 数据库文件存储在 Documents 目录，文件名为 `{name}.sqlite`
2. **SQL 注入**: 必须使用参数化查询（`?` 占位符）防止 SQL 注入
3. **表名验证**: 表名会进行正则验证，仅允许字母、数字、下划线
4. **事务支持**: 支持 BEGIN、COMMIT、ROLLBACK 事务操作
5. **数据类型**: SQLite 支持 INTEGER、REAL、TEXT、BLOB、NULL
6. **并发访问**: 同一数据库可以被多次打开，但建议使用事务控制并发
7. **错误处理**: 操作失败返回 false，成功返回 true 或结果数据
8. **线程安全**: 所有操作都是线程安全的
