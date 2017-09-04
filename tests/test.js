'use strict';

const { Synchron } = require('../index');
const expect = require('chai').expect;

describe('Synchron', function() {
	describe('return() and wait()', function() {
		it('should wait until async function finished successful', function() {
			var asyncTimeout = new Synchron();

			setTimeout(function(){
				asyncTimeout.return('success');
			}, 500);

			var ret = asyncTimeout.wait();

			expect(ret).to.equal('success');
		});
	});

	describe('throw() and wait()', function() {
		it('should wait until async function finished with error', function() {
			var asyncTimeout = new Synchron();

			setTimeout(function(){
				asyncTimeout.throw(new Error('Some error happend'));
			}, 500);

			try {
				var ret = asyncTimeout.wait();
			} catch (err){
				expect(err).to.be.instanceOf(Error);
				expect(err.message).to.equal('Some error happend');
			}
		});
	});

	describe('run()', function() {
		it('should sleep the given time', function() {
			var sleepSync = new Synchron(function(waitForMs) {
				setTimeout(() => {
					this.done();
				}, waitForMs);
			});

			var start = new Date();
			sleepSync(1000);
			var elapsed = new Date() - start;

			expect(elapsed).to.be.at.least(1000);
		});
	});

	describe('run()', function() {
		it('should read the file and return the data or throw an error', function() {
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
				var ret = readFileSync('./testfile.txt');
				expect(ret).to.equal('This is a test.\n');
			} catch (err){
				expect(err).to.be.instanceOf(Error);
				expect(err.message).to.equal('ENOENT: no such file or directory, open \'./testfile.txt\'');
			}
		});
	});

	describe('run()', function() {
		it('should sleep without blocking', function() {
			var sleepWithoutBlockingSync = new Synchron(function(waitForMs) {
				setTimeout(() => {
					this.done();
				}, waitForMs);
			});

			var counter = 0;
			var intervalId = setInterval(function () {
				counter++;
			}, 100);

			sleepWithoutBlockingSync(1000);

			clearInterval(intervalId);

			expect(counter).to.be.at.least(9);
		});
	});
});
