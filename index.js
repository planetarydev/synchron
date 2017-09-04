"use strict";

class Synchron {
	constructor(asyncFunc){
		//this._error = undefined;
		//this._results = undefined;
		this._asyncFunc = asyncFunc;
	}

	return(result){
		this._result = result;
	}

	throw(error){
		this._error = error;
	}

	run(/*arguments*/){
		this._asyncFunc.call(this, arguments);
		return this.wait();
	}

	wait(){
		while(this._error === undefined && this._result === undefined) {
    		require('deasync').runLoopOnce();
  		}

		if (this._error){
			throw this._error;
		} else {
			return this._result;
		}
	}
}

module.exports.Synchron = Synchron;
