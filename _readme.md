Usage
---

```js
var ready = require('min-ready')()

ready(function() {
	console.log(1)
})
ready(function() {
	console.log(2)
})
ready.ready()
// => 1, 2
ready(function() {
	console.log(3)
})
// => 3
```


Simple Delay Execute
---

```js
// before jquery load
var ready = require('min-ready')()

ready(function($) {
	$('.class').html('some thing')
})

// after jquery load

ready.ready($)
```
