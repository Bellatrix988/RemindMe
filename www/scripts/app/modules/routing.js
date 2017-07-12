var routingApp = angular.module('routingApp', ['ui.router']);

    // routingApp.run(function ($state, $rootScope) {
    //         $rootScope.$state = $state;
    // });
routingApp.controller("updateCtrl",function($stateParams, $scope){
    $scope.note = $stateParams.note;
})
routingApp.controller("updateClockCtrl",function($stateParams, $scope){
    $scope.noteClock = $stateParams.noteClock;
})
routingApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '../../../html-part/headPage.html'
        })

        .state('create',{
            url: '/create',
            templateUrl: '../../../html-part/createPage.html'
        })

        .state('update', {
            url: '/update',
            templateUrl: '../../../html-part/updatePage.html',
            controller: 'updateCtrl',
            params:{
                note: Object
            }
        })

        .state('updatereminder', {
            url: '/remider',
            templateUrl: '../../../html-part/update__reminder.html',
            controller: 'updateClockCtrl',
            params:{
                noteClock: Object
            }   
        })

        .state('help', {
            url: '/help',
            templateUrl: '../../../html-part/headPage.html'
        })

        .state('delete', {
          url: '/delete',
          templateUrl: '../../../html-part/checkNotes.html',
        })

        .state('reminder', {
            url: '/remider',
            templateUrl: '../../../html-part/reminderPage.html'     
        });
});
