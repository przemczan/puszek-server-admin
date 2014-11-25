angular.module('puszekApp')
    .directive('pCrudPaging', function pCrudPagingirective(Config) {
        return {
            restrict: 'E',
            templateUrl: Config.basePath + '/views/crud/paging.html',
            scope: {
                crud: '='
            },
            controller: function($scope) {

                $scope.items = $scope.crud.getItems();
                $scope.pages = [];

                function regeneratePages() {

                }

                $scope.$watch(
                    function() {
                        return $scope.items.meta;
                    },
                    function (_meta) {
                        $scope.pages = new Array(_meta ? _meta.pages_count : 0);
                        regeneratePages()
                    }
                );
            }
        };
    });
