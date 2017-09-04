# Synchron

Wrapping async functions like `fibers/future` without the need of a Fiber.
Still force a synchron execution and wait til the result or an error is present **without blocking**.

## Install

```shell
npm install synchron --save
```

## Using Synchron

Create a new instance of Synchro and use the methods `return` and `throw`. The `wait` method will wait until
`return` or `throw` was executed.

```javascript
var asyncTimeout = new Synchron();

setTimeout(function(){
	asyncTimeout.return('success');
}, 500);

var ret = asyncTimeout.wait();
console.log(ret); // --> "success"
```

Create a new instance and pass a function to wrap the asnyc function into a synchron function call.
The warpped function will run in the context of Synchron, so you can use `this.return` and/or `this.throw`.
If you like to exit the async function without returning a result just call `this.return()` without a parameter or call `this.done()`.

```javascript
var readFileSync = new Synchron(function(filename) {
	var fs = require('fs');

	fs.readFile(filename, 'utf8', (err, data) => {
		if (err) {
			this.throw(err);
		} else {
			this.return(data);
		}
	});
});

try {
	var data = readFileSync('./testfile.txt');
	console.log(data);
} catch (err){
	console.log(err); // maybe an error like: "ENOENT: no such file or directory, open './testfile.txt'"
}
```
