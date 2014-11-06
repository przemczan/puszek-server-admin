angular.module('puszekApp')
    .factory('ModalConfirm', function (Config, $modal) {

        function open(_content, _title) {
            return $modal.open({
                templateUrl: Config.basePath + '/views/commons/modalConfirm.html',
                controller: function ($scope, $modalInstance, vars) {
                    angular.forEach(vars, function(value, key) {
                        $scope[key] = value;
                    })
                },
                resolve: {
                    vars: function() {
                        return {
                            title: _title || 'Confirmation',
                            content: _content
                        };
                    }
                }
            });
        }

        return  {
            open: open
        };
    })
    /*.directive('clickConfirm', function (ModalConfirm) {
        return {
            restrict: 'A',
            compile: function(element, attr) {
                var message = attr.clickConfirm,
                    title = attr.clickConfirmTitle || 'Confirm action',
                    click = attr.ngClick;

                attr.ngClick = "";

                return {
                    pre: function(scope, element) {
                        element.bind('click', function() {
                            ModalConfirm.open(message, title).result.then(function() {
                                scope.$eval(click);
                            })
                        });
                    }
                }
            }
        };
    })*/;
