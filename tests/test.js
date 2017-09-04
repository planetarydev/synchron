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
		it('should wait until async function finished with error or results', function() {
			var asyncResult = new Synchron(function() {
				setTimeout(() => {
					this.return('success');
				}, 500);
			}).run();

			expect(asyncResult).to.equal('success');
		});

		it('should wait until async function finished with error or results', function() {
			var setTimeoutSync = new Synchron(function() {
				setTimeout(() => {
					this.return('success');
				}, 500);
			});

			var ret = setTimeoutSync.run();
			
			expect(ret).to.equal('success');
		});
	});
});
