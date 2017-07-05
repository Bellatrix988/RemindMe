angular.module('designApp')
    .config(function($mdIconProvider) {
    	$mdIconProvider
      .icon('share-arrow','../../../../images/notepadCreate.png', 24)
      .icon('upload', '../../../../images/notepadCreate.png', 24)
      .icon('copy', '../../../../images/notepadCreate.png', 24)
      .icon('print', '../../../../images/notepadCreate.png', 24)
      .icon('hangout', '../../../../images/notepadCreate.png', 24)
      .icon('mail', '../../../../images/notepadCreate.png', 24)
      .icon('message', '../../../../images/notepadCreate.png', 24)
      .icon('copy2', '../../../../images/notepadCreate.png', 24)
      .icon('facebook', '../../../../images/notepadCreate.png', 24)
      .icon('twitter', '../../../../images/notepadCreate.png', 24);
  	})
	.controller('BottomSheetExample', function($scope, $timeout, $mdBottomSheet, $mdToast) {
	  $scope.alert = '';

	  $scope.showListBottomSheet = function() {
	    $scope.alert = '';
	    $mdBottomSheet.show({
	      templateUrl: '../../../../html-part/list_toolbar.html',
	      controller: 'ListBottomSheetCtrl'
	    }).then(function(clickedItem) {
	      $scope.alert = clickedItem['name'] + ' clicked!';
	    }).catch(function(error) {
	    });
	  };
	})

	.controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
	  $scope.items = [
	    { name: 'Share', icon: 'share-arrow' },
	    { name: 'Upload', icon: 'upload' },
	    { name: 'Copy', icon: 'copy' },
	    { name: 'Print this page', icon: 'print' },
	  ];

	  $scope.listItemClick = function($index) {
	    var clickedItem = $scope.items[$index];
	    $mdBottomSheet.hide(clickedItem);
	  };
	})
	
	.run(function($templateRequest) {

	    var urls = [
	      '../../../../images/notepadCreate.png',
	      '../../../../images/notepadCreate.png',
	      '../../../../images/notepadCreate.png',
	      '../../../../images/notepadCreate.png',
	      '../../../../images/notepadCreate.png',
	      '../../../../images/notepadCreate.png',
	      '../../../../images/notepadCreate.png',
	      '../../../../images/notepadCreate.png',
	      '../../../../images/notepadCreate.png',
	      '../../../../images/notepadCreate.png',
	      '../../../../images/notepadCreate.png',
	      '../../../../images/notepadCreate.png'
	    ];

	    angular.forEach(urls, function(url) {
	      $templateRequest(url);
	    });

	  });