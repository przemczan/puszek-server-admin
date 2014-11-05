angular.module('puszekApp')
    .config(function($stateProvider, Config) {

        $stateProvider
            .state('clients', {
                url: '/clients',
                templateUrl: Config.basePath + '/views/clients/list.html',
                controller: 'clientsController'
            })
            .state('clients.create', {
                url: '/clients/create',
                templateUrl: Config.basePath + '/views/clients/new.html'
            });
    });
