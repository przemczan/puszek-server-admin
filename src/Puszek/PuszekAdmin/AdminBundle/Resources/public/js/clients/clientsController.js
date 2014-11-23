angular.module('puszekApp')
    .controller('clientsController', function clientsController($scope, Singleton, RestApiCrudGui, Config) {

        $scope.selected = null;

        $scope.selectItem = function(_item) {
            $scope.selected = $scope.isSelected(_item) ? null : _item;
        };

        $scope.isSelected = function(_item) {
            return $scope.selected === _item;
        };

        $scope.crudGUI = Singleton.define('clients.crud', function() {
            return {
                object: RestApiCrudGui.create({
                    crud: {
                        elementRoute: 'clients'
                    },
                    'new': {
                        title: 'New client',
                        templateUrl: Config.basePath + '/views/clients/new.html'
                    },
                    'edit': {
                        title: 'Edit client',
                        templateUrl: Config.basePath + '/views/clients/edit.html'
                    }
                })
            };
        }).get('clients.crud');
    });
