# ai 智能助手

ai 模块提供了强大的人工智能能力，包括对话交互、自主任务执行和代码生成。你可以使用它来构建智能化的脚本，让 ai 帮助你完成复杂的任务。

> **守护进程支持**: 完全支持。在触发器模式下可正常运行，ai 调用会在后台执行。

---

## 目录

- [快速开始](#快速开始)
- [API 参考](#api-参考)
  - [ai.chat()](#aichat)
  - [ai.run()](#airun)
  - [ai.generate()](#aigenerate)
- [完整示例](#完整示例)
- [最佳实践](#最佳实践)

---

## 快速开始

使用 ai 模块非常简单：

```javascript
// 简单对话
const response = await ai.chat('你好，请介绍一下自己');
console.log(response);

// 让 ai 自主完成任务
const result = await ai.run('帮我发送一条通知，内容是"任务完成"');
console.log(result.summary);

// 生成代码
const code = await ai.generate('创建一个脚本，每天早上8点发送天气通知');
console.log(code);
```

---

## API 参考

### `ai.chat(prompt, options?)`

向 ai 发送对话消息并获取文本回复。适合用于简单的问答、文本生成等场景。

**参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `prompt` | `string` | 是 | 要发送的消息 |
| `options` | `object` | 否 | 配置选项 |
| `options.messages` | `array` | 否 | 对话历史记录，格式: `[{role: 'user'/'assistant', content: '...'}]` |

**返回:** `Promise<string>` - ai 的文本回复

```javascript
// 基础对话
const reply = await ai.chat('什么是 TrollScript?');
console.log(reply);

// 带上下文的多轮对话
const messages = [
  { role: 'user', content: '我想学习编程' },
  { role: 'assistant', content: '很好！你想学习哪种编程语言？' },
  { role: 'user', content: 'JavaScript' }
];

const response = await ai.chat('从哪里开始？', { messages });
console.log(response);
```

---

### `ai.run(prompt, options?)`

运行 ai 智能体，让 ai 自主调用设备 API 完成任务。这是最强大的功能，ai 会分析任务、制定计划、调用相应的 API 并执行。

**参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `prompt` | `string` | 是 | 任务描述 |
| `options` | `object` | 否 | 配置选项 |
| `options.input` | `any` | 否 | 提供给 ai 的额外输入数据 |
| `options.maxSteps` | `number` | 否 | 最大执行步骤数，默认 10 |
| `options.confirmEach` | `boolean` | 否 | 是否每步都需要确认，默认 true |
| `options.timeout` | `number` | 否 | 超时时间（秒），默认 60 |
| `options.modules` | `string[]` | 否 | 限制 ai 只能使用指定的 API 模块 |

**确认说明:**
当 `confirmEach: true` 时，涉及写入或执行的操作会弹出确认对话框，支持以下选项：
1. **本次会话信任**：本次运行中后续操作将自动放行
2. **允许并记住**：记住该 tool 的允许决策（持久化）
3. **拒绝并记住**：记住该 tool 的拒绝决策（持久化）

**返回:** `Promise<object>` - 执行结果

返回对象结构：
```javascript
{
  success: boolean,      // 是否成功完成任务
  result: string,        // 任务执行结果描述
  steps: array,          // 执行的步骤列表
  summary: string        // 任务总结
}
```

```javascript
// 简单任务
const result = await ai.run('发送一条通知，内容是"Hello World"');
if (result.success) {
  console.log('任务完成:', result.summary);
}

// 复杂任务
const result = await ai.run('查询今天的天气，如果会下雨就发送提醒通知');
console.log('执行步骤:', result.steps);

// 限制使用的 API（模块名使用小写）
const result = await ai.run('帮我整理文件', {
  modules: ['file', 'storage'],  // 只允许使用文件和存储相关 API
  maxSteps: 5
});

// 需要确认的任务（会弹出确认对话框）
const result = await ai.run('删除所有临时文件', {
  confirmEach: true  // 每一步都会弹窗确认
});

// 自动执行（不弹窗）
const result2 = await ai.run('发送一条通知，内容是"Hello World"', {
  confirmEach: false
});
```

---

### `ai.generate(prompt, options?)`

根据自然语言描述生成 TrollScript 代码。适合用于快速原型开发、学习示例生成等场景。

**参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `prompt` | `string` | 是 | 代码应该实现的功能描述 |
| `options` | `object` | 否 | 配置选项 |
| `options.modules` | `string[]` | 否 | 限制使用特定的 API 模块 |

**返回:** `Promise<string>` - 生成的 TrollScript 代码

```javascript
// 生成简单脚本
const code = await ai.generate('创建一个脚本，每次运行时显示当前时间');
console.log(code);

// 生成特定功能的代码
const code = await ai.generate('实现一个函数，输入文本并返回反转后的结果');
console.log(code);

// 限制使用的 API
const code = await ai.generate('创建一个天气查询脚本', {
  modules: ['http', 'notification']
});
console.log(code);
```

---

## 完整示例

### 示例 1: 智能助手对话

```javascript
// 创建一个简单的对话助手
const conversationHistory = [];

async function chat(userMessage) {
  // 添加用户消息到历史
  conversationHistory.push({
    role: 'user',
    content: userMessage
  });

  // 获取 ai 回复
  const reply = await ai.chat(userMessage, {
    messages: conversationHistory
  });

  // 添加 ai 回复到历史
  conversationHistory.push({
    role: 'assistant',
    content: reply
  });

  return reply;
}

// 使用
const reply1 = await chat('你好');
console.log('ai:', reply1);

const reply2 = await chat('我想学习 TrollScript');
console.log('ai:', reply2);

const reply3 = await chat('从哪里开始？');
console.log('ai:', reply3);
```

---

### 示例 2: 自动化任务执行

```javascript
// 让 ai 自动完成复杂任务
async function automate(task) {
  console.log('开始执行任务:', task);

  const result = await ai.run(task, {
    maxSteps: 15,
    timeout: 600  // 10 分钟超时
  });

  if (result.success) {
    console.log('✅ 任务完成');
    console.log('总结:', result.summary);
    console.log('执行步骤:');
    result.steps.forEach((step, index) => {
      console.log(`  ${index + 1}. ${step}`);
    });
  } else {
    console.error('❌ 任务失败:', result.result);
  }

  return result;
}

// 使用示例
await automate('查询今天的天气，如果温度低于10度就发送提醒');
await automate('整理下载文件夹，将图片移动到图片文件夹');
await automate('检查日历，如果今天有会议就提前30分钟发送提醒');
```

---

### 示例 3: 代码生成助手

```javascript
// 使用 ai 生成代码模板
async function generateScript(description) {
  console.log('正在生成代码:', description);

  const code = await ai.generate(description);

  // 保存生成的代码
  const filename = `generated_${Date.now()}.js`;
  await File.write(filename, code);

  console.log('代码已生成并保存到:', filename);
  console.log('--- 生成的代码 ---');
  console.log(code);
  console.log('--- 代码结束 ---');

  return code;
}

// 使用示例
await generateScript('创建一个定时脚本，每天早上8点发送天气通知');
await generateScript('实现一个函数，输入URL并下载文件');
await generateScript('创建一个脚本，监控剪贴板变化并记录历史');
```

---

### 示例 4: 智能工作流

```javascript
// 结合多个 ai 功能创建智能工作流
async function smartWorkflow() {
  // 1. 询问 ai 今天应该做什么
  const plan = await ai.chat('根据当前时间和日期，建议我今天应该完成哪些任务？');
  console.log('今日计划:', plan);

  // 2. 让 ai 生成执行这些任务的代码
  const code = await ai.generate(`创建一个脚本来执行以下任务: ${plan}`);
  console.log('生成的代码:', code);

  // 3. 询问用户是否执行
  const shouldExecute = await UI.confirm('是否执行生成的任务？');

  if (shouldExecute) {
    // 4. 让 ai 执行任务
    const result = await ai.run('执行今日计划中的任务', {
      input: { plan, code },
      confirmEach: true
    });

    console.log('执行结果:', result.summary);
  }
}

// 运行智能工作流
await smartWorkflow();
```

---

### 示例 5: ai 驱动的脚本调试

```javascript
// 使用 ai 帮助调试代码
async function debugWithai(code, error) {
  const prompt = `
我的代码出现了错误，请帮我分析并修复：

代码:
${code}

错误信息:
${error}

请提供修复后的代码。
  `.trim();

  const fixedCode = await ai.chat(prompt);

  console.log('ai 建议的修复:');
  console.log(fixedCode);

  return fixedCode;
}

// 使用示例
const buggyCode = `
function divide(a, b) {
  return a / b;  // 没有检查除零错误
}
`;

const error = 'Division by zero error';
const fixed = await debugWithai(buggyCode, error);
```

---

## 最佳实践

### 1. 清晰的任务描述

ai 的执行效果取决于任务描述的清晰度：

```javascript
// ✅ 正确 - 清晰具体
await ai.run('查询北京今天的天气，如果温度低于10度就发送通知提醒我穿厚衣服');

// ❌ 错误 - 模糊不清
await ai.run('天气');
```

### 2. 合理使用对话历史

保持对话历史可以让 ai 更好地理解上下文：

```javascript
// ✅ 正确 - 维护对话历史
const history = [];
history.push({ role: 'user', content: '我想学习编程' });
const reply1 = await ai.chat('我想学习编程', { messages: history });
history.push({ role: 'assistant', content: reply1 });

history.push({ role: 'user', content: '从哪里开始？' });
const reply2 = await ai.chat('从哪里开始？', { messages: history });

// ❌ 错误 - 没有上下文
await ai.chat('从哪里开始？');  // ai 不知道你在问什么
```

### 3. 设置合理的限制

使用 `maxSteps` 和 `timeout` 防止任务失控：

```javascript
// ✅ 正确 - 设置限制
await ai.run('整理文件', {
  maxSteps: 10,      // 最多执行 10 步
  timeout: 300,      // 5 分钟超时
  modules: ['file']  // 只允许使用文件 API
});

// ❌ 危险 - 没有限制
await ai.run('整理文件');  // 可能执行很长时间
```

### 4. 处理错误

始终检查执行结果并处理错误：

```javascript
// ✅ 正确 - 完整的错误处理
try {
  const result = await ai.run('发送通知');

  if (result.success) {
    console.log('成功:', result.summary);
  } else {
    console.error('失败:', result.result);
    // 尝试其他方案
  }
} catch (error) {
  console.error('执行出错:', error.message);
}

// ❌ 错误 - 没有错误处理
const result = await ai.run('发送通知');
console.log(result.summary);  // 如果失败会出错
```

### 5. 安全的任务执行

对于可能有风险的操作，使用 `confirmEach` 选项：

```javascript
// ✅ 正确 - 需要确认的危险操作
await ai.run('删除所有临时文件', {
  confirmEach: true  // 每一步都会询问
});

// ❌ 危险 - 自动执行删除操作
await ai.run('删除所有临时文件');
```

### 6. 优化生成的代码

生成代码后进行审查和测试：

```javascript
// ✅ 正确 - 审查生成的代码
const code = await ai.generate('创建一个定时脚本');

// 先检查代码
console.log('生成的代码:');
console.log(code);

// 询问用户是否使用
const shouldUse = await UI.confirm('是否使用这段代码？');

if (shouldUse) {
  // 保存并使用
  await File.write('script.js', code);
}

// ❌ 危险 - 直接使用生成的代码
const code = await ai.generate('创建一个定时脚本');
eval(code);  // 危险！
```

### 7. 提供足够的上下文

给 ai 提供足够的信息以做出更好的决策：

```javascript
// ✅ 正确 - 提供详细上下文
const currentTime = new Date().toLocaleString();
const weather = await HTTP.get('https://api.weather.com/...');

await ai.run('根据当前情况决定是否发送提醒', {
  input: {
    time: currentTime,
    weather: weather,
    userPreferences: { temperature_threshold: 10 }
  }
});

// ❌ 错误 - 缺少上下文
await ai.run('决定是否发送提醒');
```

---

## 注意事项

1. **API 密钥**: 使用 ai 功能需要在设置中配置 API 密钥
2. **网络连接**: ai 调用需要网络连接，请确保设备联网
3. **执行时间**: 复杂任务可能需要较长时间，建议设置合理的 `timeout`
4. **成本控制**: ai 调用可能产生费用，请注意控制使用频率
5. **隐私安全**: 不要将敏感信息（密码、密钥等）发送给 ai
6. **结果验证**: ai 生成的代码和执行结果应该经过验证后再使用
7. **守护进程模式**: 在 Daemon 模式下，ai 调用会在后台执行，不会阻塞其他操作
