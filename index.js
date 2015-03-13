var _ = require('min-util')
var is = _.is

module.exports = Ready

function Ready() {
	var queue = []
	function ready(val) {
		if (is.str(val)) {
			return ready.call(this, arguments)
		}
		if (val) {
			ready.ctx = this
			queue.push(val)
		}
		if (ready.isReady) {
			var len = queue.length
			for (var i = 0; i < len; i++) {
				exec.call(ready.ctx, queue[i])
			}
			queue.length = 0
		}
	}
	ready.ready = function() {
		ready.isReady = true
		ready()
	}
	ready.queue = queue
	return ready
}

function exec(val) {
	var me = this
	if (is.fn(val)) {
		val.call(me)
	} else if (is.arraylike(val)) {
		var name = val[0]
		if (is.str(name)) {
			var fn = me[name]
			if (is.fn(fn)) {
				fn.apply(me, _.slice(val, 1))
			}
		}
	}
}
