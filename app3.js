'use strict';
/*
 * Test the order of decorator(multiple same name services, one decorator)
 */

var app = angular.module('main', []);

app.factory('myService', function(){
		return 123;
	})
	.factory('myService', function(){
		return 456;
	})
	.controller('mainController', mainControllerFn)
	.decorator('myService', myServiceDecorator);


function mainControllerFn($scope, myService){
	$scope.msg = 'test the order of decorator 2';
	console.log(myService);
}

function myServiceDecorator($delegate){
	$delegate = $delegate * 2;
	return $delegate;	//return 912
}

mainControllerFn.$inject = ['$scope', 'myService'];
myServiceDecorator.$inject = ['$delegate'];
