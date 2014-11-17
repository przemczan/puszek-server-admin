angular.module('puszekApp')
    .directive('pPopupActions', function($compile) {
        return {
            restrict: 'E',
            scope: true,
            terminal: true,
            priority: -1,
            link: function(scope, element, attrs) {
                if (element.data('compiled')) {
                    return;
                }
                element.data('compiled', true);

                element.attr('ng-show', 'popupActionsShow');
                element.parent()
                    .on('mouseenter', function() {
                        scope.popupActionsShow = true;
                        scope.$apply();
                    })
                    .on('mouseleave', function() {
                        scope.popupActionsShow = false;
                        scope.$apply();
                    });

                $compile(element)(scope);
                $compile(element.contents())(scope);
            }
        };
    });
