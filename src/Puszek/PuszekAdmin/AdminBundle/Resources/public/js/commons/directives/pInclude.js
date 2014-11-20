angular.module('puszekApp')
    .directive('pInclude', function pIncludeDirective(Config) {
        return {
            restrict: 'A',
            template: '<ng-include src="getPath()"></ng-include>',
            link: function(scope, element, attributes) {
                scope.getPath = function() {
                    return Config.basePath + attributes.pInclude;
                }
            }
        };
    });
