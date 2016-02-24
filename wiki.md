本库实现两个场景需求

就像一个服务窗口，有两个状态，一个是 open 一个是 close

open 的时候队伍会逐渐消耗，close 的时候只能排队，越排越长

### jQuery ready 需求

当没有 ready 的时候函数被存起来，ready 之后，执行之前的函数，再之后就不会存函数了，而是直接执行

```js
$(function() {
	console.log(1)
})

$(function() {
	console.log(2)
})

hasReady()
// => 1
// => 2

$(function() {
	console.log(3
}) // => 3
```

### google analize 需求

即便没有 js 的时候，也可以先存在 global 中，等 js 来了自己读取


重要函数
---

### queue 排队

`queue(func)`

`queue(funcName, arg1, arg2, ...)`

funcName 是 ctx 的 属性， 值应该为一个函数(queue 的时候并不一定知道 ctx 是什么)


### exec 执行

内部函数

`exec(args)`

### execAll 执行全部 queue

### open 开启

`open()`

执行 queue 中队列

### close 关闭

`close()`

停止 queue 继续执行


实现逻辑

1. 构造函数 Ctor(queueList)
	1. `this.queueList = queueList || []` 一开始就可能有队伍
	1. `.close()` 默认 isOpen 为 false
1. `.queue()`
	1. 如果 isOpen 为 false
		1. `this.queueList.push(arguments)`
	1. 否则 `.exec(arguments)`
1. `.close()`
	1. 修改 isOpen 为 false
1. 手动设置 ctx `this.ctx = ctx`
1. `.open()`
	1. 修改 isOpen 为 true
	1. `.execAll()`
1. `.execAll()`
	1. 遍历 queueList, args
		1. exec(args)
		1. 从 queueList 中移出
1. `.exec(args)`
	1. define func
	1. 如果 `args[0]` 是 function，则 `func = args[0]`
	1. 否则 func 为 `_.get(ctx, args[0])`
	1. 如果 func 为 function
		1. 执行 func.apply(this.ctx, args.slice(1))
1. `overwriteQueue(name)` 专门用来覆盖像 google analize 这种需求的
	1. `global[name] = function() {this.queue.apply(this, arguments)}`
