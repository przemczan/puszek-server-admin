angular.module('puszekApp', ['ngRoute', 'restangular', 'ui.router', 'ngMaterial'])
    .config(function($interpolateProvider){
        $interpolateProvider.startSymbol('[[').endSymbol(']]');
    })
    .run(function($rootScope, AuthUser, $state) {
        $rootScope.User = AuthUser;
        $rootScope.State = $state;
    })
    .directive('dynamicAttr', function() {
        return {
            restrict: 'A',
            scope: {
                attributes: '=dynamicAttr'
            },
            controller: function($scope, $element) {
                $scope.$watch('attributes', function(attributes) {
                    for (var name in attributes) {
                        if (attributes[name]) {
                            $element.attr(name, name);
                        } else {
                            $element.removeAttr(name);
                        }
                    }
                });
            }
        };
    });
