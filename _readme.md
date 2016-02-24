Usage
---

```js
var ready = require('min-ready')()

ready.queue(function() {
	console.log(1)
})
ready.queue(function() {
	console.log(2)
})
ready.open()
// => 1, 2
ready.queue(function() {
	console.log(3)
})
// => 3
```


Simple Delay Execute
---

```js
// before jquery load
var ready = require('min-ready')()

ready.queue(function() {
	var $ = this
	$('.class').html('some thing')
})

ready.queue('ajax', 'http://foo.bar.com', {success: function() {}})
// after jquery load
ready.ctx = $ // set context
ready.open()
```
