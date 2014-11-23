angular.module('puszekApp', ['ngRoute', 'restangular', 'ui.router', 'ngMaterial', 'ngAnimate', 'puszek'])
    .config(function($interpolateProvider){
        $interpolateProvider.startSymbol('[[').endSymbol(']]');
    })
    .run(function($rootScope, AuthUser, $state, Config, $mdMedia, $window) {
        $rootScope.Config = Config;
        $rootScope.User = AuthUser;
        $rootScope.State = $state;
        $rootScope.$mdMedia = $mdMedia;

        angular.element($window).on('click', function($event) {
            $rootScope.$emit('click', $event);
        });
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
    })
    .filter('path', function(Config) {
        return function(_path) {
            return Config.basePath + _path;
        };
    })
    .filter('url', function(Config) {
        return function(_path) {
            return Config.baseUrl + _path;
        };
    });
