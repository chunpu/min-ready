var Ready = require('../')

var name = 'lib'

var ready = new Ready(global[name].q)

var ret = ''

ready.ctx = {
	create: function(x, y) {
		ret += 'create' + x + y
	},
	render: function(x) {
		ret += 'render' + x
	},
	track: function(x) {
		ret += 'track' + 1024
	}
}

ready.overwriteQueue(name)

ready.open()

console.log('createfoobarrenderxtrack1024' == ret, ret)

lib('create', '111')

console.log('createfoobarrenderxtrack1024create111undefined' == ret, ret)
