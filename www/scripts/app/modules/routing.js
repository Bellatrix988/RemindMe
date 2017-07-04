var routingApp = angular.module('routingApp', ['ui.router']);

    // routingApp.run(function ($state, $rootScope) {
    //         $rootScope.$state = $state;
    // });

routingApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('createNote');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: './../../../html-part/headPage.html'
        })

        .state('createNote',{
            url: '/createNote',
            template: "CREATE"
            // templateUrl: './../../../html-part/createPage.html'
        })

        .state('update', {
            url: '/update',
            templateUrl: './../../../html-part/updatePage.html'
        })

        .state('help', {
            url: '/help',
            templateUrl: './../../../html-part/headPage.html.html'
        })

        .state('delete', {
          url: '/delete',
          templateUrl: './../../../html-part/deletePage.html'
        })

        .state('reminder', {
            url: '/remider',
            templateUrl: './../../../html-part/reminderPage.html'     
        });
});
