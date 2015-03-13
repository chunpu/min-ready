min-ready
===

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]
[![Dependency Status][david-image]][david-url]
[npm-image]: https://img.shields.io/npm/v/min-ready.svg?style=flat-square
[npm-url]: https://npmjs.org/package/min-ready
[downloads-image]: http://img.shields.io/npm/dm/min-ready.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/min-ready
[david-image]: http://img.shields.io/david/chunpu/min-ready.svg?style=flat-square
[david-url]: https://david-dm.org/chunpu/min-ready


Simple ready like jQuery(func)

Installation
---

```sh
npm i min-ready
```

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

License
---

[![License][license-image]][license-url]

[license-image]: http://img.shields.io/npm/l/min-ready.svg?style=flat-square
[license-url]: #
