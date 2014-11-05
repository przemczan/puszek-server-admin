angular.module('puszekApp', ['ngRoute', 'ui.bootstrap', 'restangular', 'ui.router'])
    .config(function($interpolateProvider){
        $interpolateProvider.startSymbol('[[').endSymbol(']]');
    })
    .run(function($rootScope, RestApiMe) {
        $rootScope.Routing = Routing;
        $rootScope.User = RestApiMe.get().$object;
    });
