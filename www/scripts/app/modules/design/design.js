 angular.module('designApp', ['ngMaterial'])
		.config(function($mdThemingProvider) {
	  		$mdThemingProvider.theme('default')
	    	.primaryPalette('lime')
	    	// .accentPalette('orange')
		})