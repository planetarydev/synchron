# Synchron

Wrapping an async function into a synchron function call **without blocking**.

## Install

```shell
npm install synchron --save
```

## Using Synchron

Create a new instance of Synchro and use the methods `return` and `throw`. The `wait` method will wait until
`return` or `throw` was called.

```javascript
const { Synchron } = require('synchron');

var asyncTimeout = new Synchron();

setTimeout(function(){
	// do something
	console.log('inside setTimeout');
	// and than call done
	asyncTimeout.done();
}, 500);

// non-blocking wait until done was called
asyncTimeout.wait();
console.log('back in main');

// output:
// -------
// inside setTimeout
// back in main
```

Create a new instance and pass a function to wrap the asnyc call into a synchron function.
The warpped function will run in the context of `Synchron`, so you can use `this.return` and/or `this.throw`.
If you like to exit the async function without returning a result just call `this.return()` without a parameter or call `this.done()`.

```javascript
const { Synchron } = require('synchron');

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
	// here is the synchron function call
	var data = readFileSync('./testfile.txt');
	console.log(data);
} catch (err){
	// if an error occours the function will throw it and you can catch it
	console.log(err); // maybe an error like: "ENOENT: no such file or directory, open './testfile.txt'"
}
```
