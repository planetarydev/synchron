"use strict";

const deasync = require('deasync');

class Synchron {
	constructor(asyncFunc){
		// this._error = undefined;
		// this._results = undefined;
		this._finished = false;
		this._asyncFunc = asyncFunc;

		if (asyncFunc) {
			return this.run.bind(this);
		}
	}

	return(result){
		this._result = result;
		this._finished = true;
	}

	done(){
		this._finished = true;
	}

	throw(error){
		this._error = error;
		this._finished = true;
	}

	run(/*arguments*/){
		this._asyncFunc.apply(this, arguments);
		return this.wait();
	}

	wait(){
		while(!this._finished) {
    		deasync.runLoopOnce();
  		}

		if (this._error){
			throw this._error;
		} else {
			return this._result;
		}
	}
}

module.exports.Synchron = Synchron;
