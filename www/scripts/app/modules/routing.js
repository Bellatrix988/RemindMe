var routingApp = angular.module('routingApp', ['ui.router']);

routingApp.run(function ($state, $rootScope) {
        $rootScope.$state = $state;
});

routingApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/html-part/headPage.html'
        })

        .state('createNote',{
            url: '/createNote',
            templateUrl: '/html-part/createPage.html'
        })

        .state('update', {
            url: '/update',
            templateUrl: '/html-part/updatePage.html'
        })

        .state('help', {
            url: '/help',
            templateUrl: '/html-part/headPage.html.html'
        })

        .state('delete', {
          url: '/delete',
          templateUrl: '/html-part/deletePage.html'
        })

        .state('reminder', {
            url: '/about',
            templateUrl: '/html-part/reminderPage.html'     
        });
});
