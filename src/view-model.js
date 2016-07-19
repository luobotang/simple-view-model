var elementBindHandlers = {
	'input_text': function (el, vm) {
		var key = el.getAttribute('data-bind')
		vm.on(key + ':change', function (data) {
			el.value = data.value
		})

		// init value
		var value = vm.get(key)
		if (value != null) {
			el.value = value
		}
	},
	'span': function (el, vm) {
		var key = el.getAttribute('data-bind')
		vm.on(key + ':change', function (data) {
			el.textContent = data.value
		})

		var value = vm.get(key)
		if (value != null) {
			el.textContent = value
		}
	}
}

function ViewModel(model, scope) {
	this.model = model || {}
	this.scope = scope || document
	this._events = {}
	this.init()
}

ViewModel.prototype.init = function () {
	var els = this.scope.querySelectorAll('[data-bind]')
	var el
	var i = 0
	var attrVal
	while ((el = els[i++])) {
		this.bindDataTo(el, attrVal)
	}

	this.scope.addEventListener('change', function (e) {
		var target = e.target
		if (target.matches('input[type="text"][data-bind]')) {
			this.set(target.getAttribute('data-bind'), target.value)
		}
	}.bind(this))
}

ViewModel.prototype.getData = function () {
	return this.model
}

ViewModel.prototype.get = function (key) {
	return this.model[key]
}

ViewModel.prototype.set = function (key, value) {
	var oldValue = this.model[key]
	if (oldValue !== value) {
		this.model[key] = value
		this.trigger(key + ':change', {
			oldValue: oldValue,
			value: value
		})
		this.trigger('change', this.model)
	}
}

ViewModel.prototype.bindDataTo = function (el) {
	// 暂时只支持部分类型的标签
	if (el.matches('input[type="text"]')) {
		elementBindHandlers['input_text'](el, this)
	} else if (el.matches('span')) {
		elementBindHandlers['span'](el, this)
	} else {
		// 不处理
	}
}

ViewModel.prototype.trigger = function (event, data) {
	var handlers = this._events[event]
	if (handlers) {
		var i = 0
		var handler
		while ((handler = handlers[i++])) {
			handler(data)
		}
	}
}

ViewModel.prototype.on = function (event, handler) {
	var handlers = this._events[event]
	if (!handlers) {
		handlers = this._events[event] = []
	}
	handlers.push(handler)
}

ViewModel.prototype.off = function (event, handler) {
	var handlers = this._events[event]
	if (handlers) {
		var i = handlers.indexOf(handler)
		if (i > -1) {
			handlers.splice(i, 1)
		}
		if (handlers.lenght === 0) {
			delete this._events[event]
		}
	}
}