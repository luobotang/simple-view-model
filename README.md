# simple-view-model

A simple view model.

## demo

See ```demo/demo.html```.

## usage

With HTML like this:

```html
<div id="card-edit">
	<p>Name: <input type="text" data-bind="name"></p>
	<p>Email: <input type="text" data-bind="email"></p>
</div>
```

Init with JavaScript:

```javascript```
var vm = new ViewModel({name: 'luobo'}, document.querySelector('#card-edit'))
vm.on('change', function (model) {
	console.log('model changed: ' + JSON.stringify(model))
})
```

Also see demo for more.

### api

- ViewModel(model, scopeElement)
- vm.on()
- vm.off()
- vm.trigger()
- vm.set()
- vm.get()
- vm.getData()
