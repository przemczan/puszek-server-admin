angular.module('puszekApp')
    .controller('clientsController', function($scope, RestApiCRUDFactoryGUI) {

        $scope.crud = RestApiCRUDFactoryGUI.create({
            crud: {
                elementRoute: 'clients'
            }
        });
    });
