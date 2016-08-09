'use strict';
/*
 * Test the order of decorators(one service, multiple decorator)
 */

var app = angular.module('main', []);

app.decorator('$log', logDecoratorFn1)
	.decorator('$log', logDecoratorFn2)
	.controller('mainController', mainControllerFn);

function mainControllerFn($scope, $log){
	$scope.msg = 'test the order of decorator';
	$log.log('hello world');	// => Fn2 -> Fn1
}

function logDecoratorFn1($delegate){
	var originLogFn = $delegate.log;
	$delegate.log = function(){
		console.log('in logDecoratorFn1');
		originLogFn.apply($delegate, arguments);
	};

	return $delegate;
}

function logDecoratorFn2($delegate){
	var originLogFn = $delegate.log;
	$delegate.log = function(){
		console.log('in logDecoratorFn2');
		originLogFn.apply($delegate, arguments);
	};

	return $delegate;
}


logDecoratorFn1.$inject = ['$delegate'];
logDecoratorFn2.$inject = ['$delegate'];