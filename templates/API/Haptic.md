# Haptic 触觉反馈

Haptic 模块提供了触觉反馈功能。你可以使用它来创建各种类型的震动反馈，提升用户交互体验。

> **守护进程支持**: 完全支持。在触发器模式下可正常运行，使用 MainThreadHelper 确保线程安全。

---

## 目录

- [快速开始](#快速开始)
- [API 参考](#api-参考)
  - [核心方法](#核心方法)
    - [haptic.impact()](#hapticimpact)
    - [haptic.notification()](#hapticnotification)
    - [haptic.selection()](#hapticselection)
    - [haptic.vibrate()](#hapticvibrate)
  - [快捷方法](#快捷方法)
    - [haptic.light()](#hapticlight)
    - [haptic.medium()](#hapticmedium)
    - [haptic.heavy()](#hapticheavy)
    - [haptic.success()](#hapticsuccess)
    - [haptic.warning()](#hapticwarning)
    - [haptic.error()](#hapticerror)
- [完整示例](#完整示例)
- [最佳实践](#最佳实践)

---

## 快速开始

使用触觉反馈非常简单：

```javascript
// 基础冲击反馈
haptic.impact('medium');

// 通知反馈
haptic.notification('success');

// 选择反馈
haptic.selection();

// 快捷方法
haptic.success();
haptic.light();
```

---

## API 参考

### 核心方法

#### `haptic.impact(style?)`

触发冲击触觉反馈，模拟物理碰撞的感觉。

**参数:**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `style` | `string` | 否 | `'medium'` | 冲击强度: `'light'` \| `'medium'` \| `'heavy'` \| `'soft'` \| `'rigid'` |

**返回:** `void`

**冲击强度说明:**
- `light` - 轻微冲击，适合轻触操作
- `medium` - 中等冲击，适合一般按钮点击
- `heavy` - 强烈冲击，适合重要操作确认
- `soft` - 柔和冲击（iOS 13+），适合柔软物体碰撞
- `rigid` - 刚性冲击（iOS 13+），适合坚硬物体碰撞

```javascript
// 轻微冲击
haptic.impact('light');

// 中等冲击（默认）
haptic.impact();
haptic.impact('medium');

// 强烈冲击
haptic.impact('heavy');

// 柔和冲击（iOS 13+）
haptic.impact('soft');

// 刚性冲击（iOS 13+）
haptic.impact('rigid');
```

---

#### `haptic.notification(type?)`

触发通知触觉反馈，用于表示操作结果。

**参数:**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `type` | `string` | 否 | `'success'` | 通知类型: `'success'` \| `'warning'` \| `'error'` |

**返回:** `void`

**通知类型说明:**
- `success` - 成功反馈，表示操作成功完成
- `warning` - 警告反馈，表示需要注意的情况
- `error` - 错误反馈，表示操作失败

```javascript
// 成功反馈
haptic.notification('success');

// 警告反馈
haptic.notification('warning');

// 错误反馈
haptic.notification('error');
```

---

#### `haptic.selection()`

触发选择触觉反馈，用于表示选择项的变化。

**返回:** `void`

```javascript
// 选择反馈
haptic.selection();
```

**使用场景:**
- 滑动选择器时
- 切换开关时
- 在列表中滚动选择时

---

#### `haptic.vibrate()`

触发设备振动，使用系统默认的振动模式。

**返回:** `void`

```javascript
// 设备振动
haptic.vibrate();
```

**注意:** 这是最基础的振动方式，不如其他方法精细。

---

### 快捷方法

为了方便使用，模块提供了一些快捷方法，无需传递参数即可触发常用的反馈。

#### `haptic.light()`

触发轻微冲击反馈，等同于 `haptic.impact('light')`。

```javascript
haptic.light();
```

---

#### `haptic.medium()`

触发中等冲击反馈，等同于 `haptic.impact('medium')`。

```javascript
haptic.medium();
```

---

#### `haptic.heavy()`

触发强烈冲击反馈，等同于 `haptic.impact('heavy')`。

```javascript
haptic.heavy();
```

---

#### `haptic.success()`

触发成功通知反馈，等同于 `haptic.notification('success')`。

```javascript
haptic.success();
```

---

#### `haptic.warning()`

触发警告通知反馈，等同于 `haptic.notification('warning')`。

```javascript
haptic.warning();
```

---

#### `haptic.error()`

触发错误通知反馈，等同于 `haptic.notification('error')`。

```javascript
haptic.error();
```

---

## 完整示例

### 示例 1: 按钮点击反馈

```javascript
// 普通按钮点击
function onButtonClick() {
  haptic.light();
  console.log('按钮已点击');
}

// 重要按钮点击
function onImportantButtonClick() {
  haptic.medium();
  console.log('重要操作已触发');
}

// 危险操作确认
function onDangerousAction() {
  haptic.heavy();
  console.log('危险操作已执行');
}
```

---

### 示例 2: 操作结果反馈

```javascript
function saveData(data) {
  try {
    storage.write('user_data', data);
    haptic.success();
    notification.send('保存成功', '数据已保存');
  } catch (error) {
    haptic.error();
    notification.send('保存失败', error.message);
  }
}
```

---

### 示例 3: 滑动选择器

```javascript
let currentValue = 0;
const values = [0, 25, 50, 75, 100];

function onSliderChange(newIndex) {
  if (newIndex !== currentValue) {
    currentValue = newIndex;
    haptic.selection();
    console.log('当前值:', values[currentValue]);
  }
}

// 模拟滑动
onSliderChange(1);  // 触发选择反馈
onSliderChange(2);  // 触发选择反馈
onSliderChange(3);  // 触发选择反馈
```

---

### 示例 4: 表单验证反馈

```javascript
function validateForm(formData) {
  const errors = [];

  // 验证用户名
  if (!formData.username || formData.username.length < 3) {
    errors.push('用户名至少需要 3 个字符');
  }

  // 验证邮箱
  if (!formData.email || !formData.email.includes('@')) {
    errors.push('邮箱格式不正确');
  }

  // 验证密码
  if (!formData.password || formData.password.length < 6) {
    errors.push('密码至少需要 6 个字符');
  }

  if (errors.length > 0) {
    haptic.error();
    console.error('表单验证失败:', errors);
    return false;
  }

  haptic.success();
  console.log('表单验证通过');
  return true;
}

// 测试
validateForm({
  username: 'ab',
  email: 'invalid',
  password: '123'
});  // 触发错误反馈

validateForm({
  username: 'alice',
  email: 'alice@example.com',
  password: '123456'
});  // 触发成功反馈
```

---

### 示例 5: 游戏交互反馈

```javascript
// 游戏中的各种交互反馈
function gameInteraction() {
  // 收集物品
  function collectItem() {
    haptic.light();
    console.log('收集到物品');
  }

  // 升级
  function levelUp() {
    haptic.success();
    console.log('升级成功！');
  }

  // 受到伤害
  function takeDamage() {
    haptic.heavy();
    console.log('受到伤害');
  }

  // 游戏失败
  function gameOver() {
    haptic.error();
    console.log('游戏结束');
  }

  // 模拟游戏流程
  collectItem();
  collectItem();
  levelUp();
  takeDamage();
  gameOver();
}

gameInteraction();
```

---

### 示例 6: 倒计时反馈

```javascript
function countdown(seconds) {
  let remaining = seconds;

  const timer = setInterval(() => {
    if (remaining > 0) {
      console.log(`倒计时: ${remaining} 秒`);

      if (remaining <= 3) {
        // 最后 3 秒加强反馈
        haptic.heavy();
      } else {
        haptic.light();
      }

      remaining--;
    } else {
      clearInterval(timer);
      haptic.success();
      console.log('倒计时结束！');
    }
  }, 1000);
}

// 10 秒倒计时
countdown(10);
```

---

### 示例 7: 手势识别反馈

```javascript
// 模拟手势识别
function handleGesture(gesture) {
  switch (gesture) {
    case 'tap':
      haptic.light();
      console.log('轻触');
      break;

    case 'double-tap':
      haptic.medium();
      console.log('双击');
      break;

    case 'long-press':
      haptic.heavy();
      console.log('长按');
      break;

    case 'swipe':
      haptic.selection();
      console.log('滑动');
      break;

    default:
      console.log('未知手势');
  }
}

// 测试各种手势
handleGesture('tap');
handleGesture('double-tap');
handleGesture('long-press');
handleGesture('swipe');
```

---

### 示例 8: 进度反馈

```javascript
function processWithFeedback(items) {
  console.log(`开始处理 ${items.length} 个项目`);

  items.forEach((item, index) => {
    // 处理项目
    console.log(`处理项目 ${index + 1}/${items.length}: ${item}`);

    // 每处理一个项目给予轻微反馈
    haptic.light();

    // 模拟处理时间
    // 在实际使用中，这里应该是真实的处理逻辑
  });

  // 全部完成后给予成功反馈
  haptic.success();
  console.log('所有项目处理完成！');
}

// 测试
processWithFeedback(['任务1', '任务2', '任务3', '任务4', '任务5']);
```

---

### 示例 9: 警告提示

```javascript
function checkSystemStatus() {
  const battery = device.battery();
  const batteryLevel = Math.round(battery.level * 100);

  if (batteryLevel < 10) {
    haptic.error();
    notification.send('电量严重不足', `当前电量: ${batteryLevel}%`);
  } else if (batteryLevel < 20) {
    haptic.warning();
    notification.send('电量不足', `当前电量: ${batteryLevel}%`);
  } else {
    haptic.success();
    console.log(`电量充足: ${batteryLevel}%`);
  }
}

checkSystemStatus();
```

---

### 示例 10: 组合反馈模式

```javascript
// 创建自定义反馈模式
function customFeedbackPattern(pattern) {
  const patterns = {
    // 成功模式：轻-重-轻
    success: ['light', 'heavy', 'light'],

    // 警告模式：中-中-中
    warning: ['medium', 'medium', 'medium'],

    // 错误模式：重-重-重
    error: ['heavy', 'heavy', 'heavy'],

    // 通知模式：轻-轻
    notification: ['light', 'light']
  };

  const sequence = patterns[pattern] || patterns.notification;

  sequence.forEach((style, index) => {
    setTimeout(() => {
      haptic.impact(style);
    }, index * 200);  // 每个反馈间隔 200ms
  });
}

// 使用自定义模式
customFeedbackPattern('success');

// 等待 1 秒后触发警告模式
setTimeout(() => {
  customFeedbackPattern('warning');
}, 1000);
```

---

## 最佳实践

### 1. 选择合适的反馈类型

根据交互场景选择合适的反馈：

```javascript
// ✅ 正确 - 根据场景选择
haptic.light();      // 轻触、浏览
haptic.medium();     // 按钮点击
haptic.heavy();      // 重要操作
haptic.selection();  // 选择变化
haptic.success();    // 操作成功
haptic.error();      // 操作失败

// ❌ 错误 - 所有场景都用同一种反馈
haptic.medium();  // 不区分场景
```

### 2. 避免过度使用

不要在短时间内触发过多反馈：

```javascript
// ✅ 正确 - 适度使用
function processItems(items) {
  items.forEach((item, index) => {
    processItem(item);
    // 每 5 个项目反馈一次
    if ((index + 1) % 5 === 0) {
      haptic.light();
    }
  });
  haptic.success();
}

// ❌ 错误 - 过度使用
function processItems(items) {
  items.forEach(item => {
    processItem(item);
    haptic.light();  // 每个项目都反馈，太频繁
  });
}
```

### 3. 与其他反馈配合使用

触觉反馈应该与视觉、听觉反馈配合：

```javascript
// ✅ 正确 - 多种反馈配合
function showSuccess(message) {
  haptic.success();           // 触觉反馈
  notification.send('成功', message, { sound: 'default' });  // 视觉和听觉反馈
}

// ❌ 错误 - 只有触觉反馈
function showSuccess(message) {
  haptic.success();
  // 用户可能不知道发生了什么
}
```

### 4. 考虑用户设置

尊重用户的触觉反馈设置：

```javascript
// ✅ 正确 - 提供开关选项
const hapticEnabled = storage.read('haptic_enabled') !== false;

function triggerHaptic(type) {
  if (hapticEnabled) {
    haptic[type]();
  }
}

triggerHaptic('success');

// ❌ 错误 - 强制触发
haptic.success();  // 没有考虑用户偏好
```

### 5. 反馈时机要准确

在正确的时机触发反馈：

```javascript
// ✅ 正确 - 操作完成后立即反馈
function saveData(data) {
  storage.write('data', data);
  haptic.success();  // 保存完成后立即反馈
}

// ❌ 错误 - 反馈时机不对
function saveData(data) {
  haptic.success();  // 还没保存就反馈
  storage.write('data', data);
}
```

### 6. 错误处理要明确

不同的错误使用不同的反馈：

```javascript
// ✅ 正确 - 区分错误类型
function handleError(error) {
  if (error.type === 'validation') {
    haptic.warning();  // 验证错误用警告
  } else if (error.type === 'network') {
    haptic.error();    // 网络错误用错误
  } else {
    haptic.error();    // 其他错误用错误
  }
}

// ❌ 错误 - 所有错误都一样
function handleError(error) {
  haptic.error();  // 不区分错误类型
}
```

### 7. 避免在循环中使用

不要在紧密循环中触发反馈：

```javascript
// ✅ 正确 - 在循环外反馈
for (let i = 0; i < 1000; i++) {
  processItem(i);
}
haptic.success();  // 循环结束后反馈

// ❌ 错误 - 在循环中反馈
for (let i = 0; i < 1000; i++) {
  processItem(i);
  haptic.light();  // 会触发 1000 次，体验很差
}
```

---

## 注意事项

1. **设备支持**: 触觉反馈需要设备支持 Taptic Engine（iPhone 7 及以上）
2. **系统设置**: 如果用户在系统设置中关闭了触觉反馈，这些 API 可能不会产生效果
3. **电量消耗**: 频繁的触觉反馈会增加电量消耗，应适度使用
4. **线程安全**: 在 Daemon 模式下，模块使用 MainThreadHelper 确保线程安全
5. **iOS 版本**: `soft` 和 `rigid` 样式需要 iOS 13+，在旧版本会自动降级
6. **性能影响**: 触觉反馈的性能开销很小，但仍应避免在紧密循环中使用
7. **用户体验**: 过度使用触觉反馈会降低用户体验，应该有节制地使用
8. **无障碍**: 触觉反馈对视障用户特别重要，应该合理使用以提供更好的无障碍体验
