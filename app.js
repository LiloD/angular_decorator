'use strict';

var app = angular.module('main', []);

app.decorator('$log', logDecoratorFn)
	.decorator('$exceptionHandler', exceptionHandlerDecoratorFn)
	.controller('mainController', mainControllerFn);



function mainControllerFn($scope, $log){
	$log.log('log message');
	$log.error('log message');

	//create an error
	var undefinedObj = undefined;
	undefinedObj.foo();
}


function sendMsgToServer(msg){
	//send msg
	console.log('send this msg to logging server: ', msg);
}

function sendExceptionToServer(exception, cause){
	//send exception
	//handle the exception
	console.log('send this exception to logging server: ', exception, cause);
}

//for log function or general information function
function wrapperLogFn(logFn){
	var resultFn = function(){
		var args = Array.prototype.slice.call(arguments);
		var msg = args[0];

		sendMsgToServer(msg);

		logFn.apply(null, args);
	}

	return resultFn;
}

function wrapperExceptionHandlerFn(exceptionHandlerFn, $log){
	var resultFn = function(){
		var args = Array.prototype.slice.call(arguments);
		var exception = args[0];
		var cause = args[1];

		sendExceptionToServer(exception, cause);
		$log._error(exception);
	}

	return resultFn;
}
function exceptionHandlerDecoratorFn($delegate, $log){
	return wrapperExceptionHandlerFn($delegate, $log);
}

function logDecoratorFn($delegate){
	$delegate._log = $delegate.log;
	$delegate._info = $delegate.info;
	$delegate._debug = $delegate.debug;
	$delegate._error = $delegate.error;	

	$delegate.log = wrapperLogFn($delegate.log);
	$delegate.info = wrapperLogFn($delegate.info);
	$delegate.debug = wrapperLogFn($delegate.debug);
	$delegate.error = wrapperLogFn($delegate.error);

	return $delegate;
};

mainControllerFn.$inject = ['$scope', '$log'];
logDecoratorFn.$inject = ['$delegate'];
exceptionHandlerDecoratorFn.$inject = ['$delegate', '$log'];
