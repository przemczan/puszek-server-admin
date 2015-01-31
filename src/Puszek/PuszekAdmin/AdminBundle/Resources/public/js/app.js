angular.module('puszekApp', ['ngRoute', 'restangular', 'ui.router', 'ngMaterial', 'ngAnimate', 'puszek', 'angularUtils.directives.dirPagination'])
    .config(function($interpolateProvider, paginationTemplateProvider, Config, $mdThemingProvider){
        $interpolateProvider.startSymbol('[[').endSymbol(']]');
        paginationTemplateProvider.setPath(Config.basePath + '/views/crud/paging.html');
        $mdThemingProvider.theme('default');
    })
    .run(function($rootScope, AuthUser, $state, Config, $mdMedia, $window) {
        $rootScope.Config = Config;
        $rootScope.User = AuthUser;
        $rootScope.State = $state;
        $rootScope.$mdMedia = $mdMedia;

        angular.element($window).on('click', function($event) {
            $rootScope.$emit('click', $event.target);
            $rootScope.$apply();
        });

        $rootScope.$$apply = function(callback) {
            var phase = this.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (typeof(callback) === 'function') {
                    callback();
                }
            } else {
                this.$apply(callback);
            }
        };
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
