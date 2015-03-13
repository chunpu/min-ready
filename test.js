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
	 	instance.ready('run', 'foo')
		instance.ready.ready()
	})

	it('should work on basic', function(done) {
		var ready = Ready()
		var arr = []
		ready(function() {
			if (!ready.isReady) assert(false)
			arr.push(1)
		})
		ready(function() {
			if (!ready.isReady) assert(false)
			arr.push(2)
		})
		setTimeout(function() {
			assert.deepEqual(arr, [])
			ready.ready()
			ready(function() {
				if (!ready.isReady) assert(false)
				arr.push(3)
			})
			assert.deepEqual(arr, [1, 2, 3])
			done()
		}, 40)
	})
})
