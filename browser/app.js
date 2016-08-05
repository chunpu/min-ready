var Ready = require('../')

var name = 'lib'

var ready = new Ready(global[name].q)

var ret = ''

ready.ctx = {
	create: function(x, y) {
		console.log('create', x, y)
		ret += 'create' + x + y
	},
	render: function(x) {
		console.log('render', x)
		ret += 'render' + x
	},
	track: function(x) {
		console.log('track')
		ret += 'track' + 1024
	}
}

ready.overwriteQueue(name)

ready.open()

console.log('createfoobarrenderxtrack1024' == ret, ret)

lib('create', '111')

console.log('createfoobarrenderxtrack1024create111undefined' == ret, ret)
