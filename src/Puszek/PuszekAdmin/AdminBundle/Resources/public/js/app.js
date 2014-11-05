angular.module('puszekApp', ['ngRoute', 'ui.bootstrap', 'restangular', 'ui.router'])
    .config(function($interpolateProvider){
        $interpolateProvider.startSymbol('[[').endSymbol(']]');
    })
    .run(function($rootScope, AuthUser) {
        $rootScope.User = AuthUser;
    });
