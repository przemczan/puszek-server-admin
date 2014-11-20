angular.module('puszekApp')
    .directive('pStopEvents', function pStopEventsDirective() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.on(attrs.pStopEvents, function(e) {
                    e.stopPropagation();
                })
            }
        };
    });
