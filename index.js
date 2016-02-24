var _ = require('min-util')
var is = _.is

var open = 1
var close = 0

module.exports = Ctor

function Ctor(queueList) {
	var me = this
	if (!(me instanceof Ctor)) return new Ctor(queueList)
	me.queueList = queueList || []
	me.close()
}

var proto = Ctor.prototype

proto.queue = function() {
	var me = this
	var args = arguments
	if (me.isOpen) {
		me.exec(args)
	} else {
		me.queueList.push(args)
	}
}

proto.close = function() {
	this.isOpen = false
}

proto.open = function() {
	this.isOpen = true
	this.execAll()
}

proto.execAll = function() {
	var me = this
	var queue = me.queueList
	_.each(queue, function(args) {
		me.exec(args)
	})
	queue.length = 0
}

proto.exec = function(args) {
	var func
	var first = _.first(args)
	var ctx = this.ctx
	if (is.fn(first)) {
		func = first
	} else {
		func = _.get(ctx, first)
	}
	if (is.fn(func)) {
		try {
			func.apply(ctx, _.slice(args, 1))
		} catch (ignore) {}
	}
}

proto.overwriteQueue = function(name) {
	var me = this
	global[name] = function() {
		me.queue.apply(me, arguments)
	}
}
