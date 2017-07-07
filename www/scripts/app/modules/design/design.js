 angular.module('designApp', ["ngMaterial", "ngAnimate", "ngAria","mdPickers"])
		.config(function($mdThemingProvider) {
	  		$mdThemingProvider.theme('default')
	    	.primaryPalette('green')
	    	.accentPalette('grey')
		})
		.controller('generalDesignCtrl', function($scope){ //МОЖНО СДЕЛАТЬ ДИРЕКТИВУ

		})