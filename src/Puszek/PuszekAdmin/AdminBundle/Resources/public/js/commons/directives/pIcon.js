angular.module('puszekApp')
    .directive('pIcon', function pIconDirective(Config) {
        return {
            restrict: 'E',
            scope: {
                src: '@'
            },
            template: '<ng-include src="getPath()"></ng-include>',
            transclude: true,
            link: function(scope, element, attributes) {
                scope.getPath = function() {
                    return Config.basePath + attributes.src;
                }
            }
        };
    });
