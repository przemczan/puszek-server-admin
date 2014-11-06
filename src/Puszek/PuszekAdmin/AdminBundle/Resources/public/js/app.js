angular.module('puszekApp', ['ngRoute', 'restangular', 'ui.router', 'ngMaterial'])
    .config(function($interpolateProvider){
        $interpolateProvider.startSymbol('[[').endSymbol(']]');
    })
    .run(function($rootScope, AuthUser) {
        $rootScope.User = AuthUser;
    });
