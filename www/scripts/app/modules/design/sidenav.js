angular.module('designApp')
      .controller('sidenavCtrl', function ($scope, $timeout, $mdSidenav) {
        $scope.toggleLeft = buildToggler('left');

         var imagePath = "./../../../../images/notepadCreate.png";
        $scope.todos = [
	      {
	        icon : imagePath,
	        text : 'Календарь'
	      },
	      {
	        icon : imagePath,
	        text : 'Архив'
	      },
	      {
	        icon : imagePath,
	        text : 'Поиск'
	      },
	      {
	        icon : imagePath,
	        text : 'Тема'
	      },
	      {
	        icon : imagePath,
	        text : 'Поддержка'
	      }
	    ];

        function buildToggler(componentId) {
          return function() {
            $mdSidenav(componentId).toggle();
          };
        }
      });