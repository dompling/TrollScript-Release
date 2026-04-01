# Timer 定时器

Timer 模块以全局函数形式提供定时能力，与浏览器风格保持一致，支持一次性定时和循环定时。

> **守护进程支持**: 完全支持。Daemon 模式下会自动对过于激进的定时频率做保护性限速。

---

## 快速开始

```javascript
const timeoutId = setTimeout(() => {
  console.log('1 秒后执行');
}, 1000);

let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log('tick', count);
  if (count >= 3) {
    clearInterval(intervalId);
  }
}, 500);
```

---

## API 参考

#### `setTimeout(callback, delay)`

在指定延迟后执行一次回调。**参数:** `callback` (function), `delay` (number, 毫秒) **返回:** `number`

```javascript
const id = setTimeout(() => {
  console.log('done');
}, 2000);
```

#### `clearTimeout(timerId)`

取消 `setTimeout` 创建的定时器。**参数:** `timerId` (number) **返回:** `void`

```javascript
const id = setTimeout(() => console.log('不会执行'), 5000);
clearTimeout(id);
```

#### `setInterval(callback, interval)`

按固定间隔重复执行回调。**参数:** `callback` (function), `interval` (number, 毫秒) **返回:** `number`

```javascript
const id = setInterval(() => {
  console.log('heartbeat');
}, 1000);
```

#### `clearInterval(timerId)`

取消 `setInterval` 创建的循环定时器。**参数:** `timerId` (number) **返回:** `void`

```javascript
const id = setInterval(() => {}, 1000);
clearInterval(id);
```

---

## 注意事项

1. 这些函数是全局函数，不属于某个对象模块。
2. Daemon 模式下会自动限制过短的定时间隔，避免高频定时器拖垮常驻进程。
3. 脚本结束或上下文清理时，相关定时器会自动释放。
