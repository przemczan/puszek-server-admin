angular.module('puszekApp')
    .controller('clientsController', function($scope, Singleton, RestApiCRUDFactoryGUI) {

        $scope.crud = Singleton.get('clients.crud', function() {
            return RestApiCRUDFactoryGUI.create({
                crud: {
                    elementRoute: 'clients'
                }
            });
        });
    });
