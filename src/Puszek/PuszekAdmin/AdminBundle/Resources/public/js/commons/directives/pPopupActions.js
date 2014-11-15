angular.module('puszekApp')
    .directive('pPopupActions', function($compile) {
        return {
            restrict: 'E',
            scope: true,
            terminal: true,
            link: function(scope, element, attrs) {
                if (attrs.ngShow) {
                    return;
                }

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

                //var children = element.children().detach();
                $compile(element)(scope);
                $compile(element.contents())(scope);
            }
        };
    });
