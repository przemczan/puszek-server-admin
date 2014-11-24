angular.module('puszekApp')
    .controller('messagesController', function messagesController($rootScope, $scope, Singleton, RestApiCrudGui) {

        $scope.selected = null;

        $scope.selectItem = function(_item) {
            $scope.selected = $scope.isSelected(_item) ? null : _item;
        };

        $scope.isSelected = function(_item) {
            return $scope.selected === _item;
        };

        $rootScope.$on('click', function(e, _target) {
            var selectedNode = $('.messages .list').get(0);
            if (selectedNode && (!_target || (_target !== selectedNode && !$.contains(selectedNode, _target)))) {
                $scope.selectItem(null);
            }
        });

        $scope.crudGUI = Singleton.define('messages.crud', function() {
            return {
                object: RestApiCrudGui.create({
                    crud: {
                        elementRoute: 'messages'
                    }
                })
            };
        }).get('messages.crud');
    });
