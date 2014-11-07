angular.module('puszekApp')
    .config(function($stateProvider, Config) {

        $stateProvider
            .state('homepage', {
                url: '/',
                views: {
                    contentHeader: { template: 'Dashboard' },
                    content: { templateUrl: Config.basePath + '/views/dashboard/index.html' }
                },
                data: {
                    access: {
                        all: ['ROLE_USER']
                    }
                }
            });
    });
