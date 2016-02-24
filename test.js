var Ready = require('./')
var assert = require('assert')

describe('basic', function() {

	it('should work on instance', function(done) {
		var ready = Ready()
		function Ctor() {}

		Ctor.prototype.run = function(val) {
			assert(val == 'foo')
			done()
		}

		Ctor.prototype.ready = ready
		var instance = new Ctor
		instance.ready.ctx = instance	
	 	instance.ready.queue('run', 'foo')
		instance.ready.open()

	})

	it('should work on basic', function(done) {
		var ready = Ready()
		var arr = []
		ready.queue(function() {
			if (!ready.isOpen) assert(false)
			arr.push(1)
		})
		ready.queue(function() {
			if (!ready.isOpen) assert(false)
			arr.push(2)
		})
		setTimeout(function() {
			assert.deepEqual(arr, [])
			ready.open()
			ready.queue(function() {
				if (!ready.isOpen) assert(false)
				arr.push(3)
			})
			assert.deepEqual(arr, [1, 2, 3])
			done()
		}, 40)
	})
})
