angular.module('puszekApp')
    .controller('clientsController', function($scope, Singleton, RestApiCRUDFactoryGUI, Config, RestApi) {

        RestApi.one('clients', 1);
        $scope.crudGUI = Singleton.get('clients.crud', function() {
            return RestApiCRUDFactoryGUI.create({
                crud: {
                    elementRoute: 'clients'
                },
                'new' : {
                    title: 'New client',
                    templateUrl: Config.basePath + '/views/clients/new.html'
                }
            });
        });
    });
