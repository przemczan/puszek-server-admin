angular.module('puszekApp')
    .config(function($stateProvider, Config) {

        $stateProvider
            .state('clients', {
                url: '/clients',
                views: {
                    contentHeader: { template: 'Clients' },
                    content: {
                        controller: 'clientsController',
                        templateUrl: Config.basePath + '/views/clients/list.html'
                    }
                },
                data: {
                    access: {
                        all: ['ROLE_ADMIN']
                    }
                }
            })
            .state('clients_create', {
                url: '/clients/new',
                views: {
                    contentHeader: { template: 'Clients > New' },
                    content: { templateUrl: Config.basePath + '/views/clients/new.html' }
                },
                data: {
                    access: {
                        all: ['ROLE_ADMIN']
                    }
                }
            });
    });
