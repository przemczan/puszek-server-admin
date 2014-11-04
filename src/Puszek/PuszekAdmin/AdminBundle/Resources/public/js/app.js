angular.module('puszekApp', ['ngRoute', 'ui.bootstrap', 'restangular'])
    .config(function($interpolateProvider){
        $interpolateProvider.startSymbol('[[').endSymbol(']]');
    })
    .run(function($rootScope, RestApiMe) {
        $rootScope.Routing = Routing;
        $rootScope.User = RestApiMe;
    });