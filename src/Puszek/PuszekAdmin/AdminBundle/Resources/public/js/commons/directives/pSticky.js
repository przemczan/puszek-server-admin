angular.module('puszekApp')
    .directive('pSticky', function pStopEventsDirective($window) {
        var stickiesHeight = 0;

        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                var holder = angular.element('<div class="p-sticky-holder"></div>'),
                    $element = $(element[0]),
                    $holder = $(holder[0]),
                    elementOriginalCss = $element.css(['position']);

                function stickIt() {
                    if ('fixed' !== $element.css('position')) {
                        $holder.height(stickiesHeight += $element.height());
                        $element
                            .css({ position: 'fixed' })
                            .after($holder);
                    }
                }

                function unstickIt() {
                    if ('fixed' === $element.css('position')) {
                        stickiesHeight -= $holder.height();
                        $holder.detach();
                        $element.css(elementOriginalCss);
                    }
                }

                // check element position each scroll event
                angular.element($window).on('scroll', function() {
                    var elementTop = $holder.parent() ? $holder.offset().top : $element.offset().top;
                    if (elementTop < $(window).scrollTop()) {
                        stickIt()
                    } else {
                        unstickIt();
                    }
                });
            }
        };
    });
