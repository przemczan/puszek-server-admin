angular.module('puszekApp')
    .config(function($routeProvider, Config) {
        $routeProvider
            .when('/clients', {
                templateUrl: Config.basePath + '/views/clients/list.html',
                controller: 'clientsController'
            })
            .when('/clients/create', {
                templateUrl: Config.basePath + '/views/clients/new.html',
                controller: 'clientsController'
            });
    });