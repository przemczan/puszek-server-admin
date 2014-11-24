angular.module('puszekApp')
    .controller('clientsController', function clientsController($rootScope, $scope, Singleton, RestApiCrudGui, Config) {

        $scope.selected = null;

        $scope.selectItem = function(_item) {
            $scope.selected = $scope.isSelected(_item) ? null : _item;
        };

        $scope.isSelected = function(_item) {
            return $scope.selected === _item;
        };

        $rootScope.$on('click', function(e, _target) {
            var selectedNode = $('.clients .list').get(0);
            if (selectedNode && (!_target || (_target !== selectedNode && !$.contains(selectedNode, _target)))) {
                $scope.selectItem(null);
            }
        });

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
