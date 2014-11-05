angular.module('puszekApp')
    .config(function($stateProvider, $urlRouterProvider, Config) {
        $urlRouterProvider.otherwise("/");
    });
