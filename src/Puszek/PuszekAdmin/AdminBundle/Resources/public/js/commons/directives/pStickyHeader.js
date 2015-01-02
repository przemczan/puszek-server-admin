angular.module('puszekApp')
    .directive('pStickyHeader', function pStopEventsDirective($window) {

        var stickiesHeight = 0;

        return {
            restrict: 'A',
            scope: true,
            link: function(scope, element) {

                var holder = angular.element('<div class="p-sticky-holder"></div>'),
                    $element = $(element[0]),
                    elementHeight = 0,
                    $holder = $(holder[0]),
                    elementOriginalCss = {};

                /**
                 * Is current element sticked
                 * @returns {boolean}
                 */
                function isSticked() {
                    return !!$holder.parent().length;
                }

                /**
                 * Stick element if it is not sticked
                 */
                function stickIt() {
                    if (!isSticked()) {
                        elementOriginalCss = $element.css(['position', 'top']);
                        $holder.height(elementHeight = $element.height());
                        $element
                            .addClass('sticky-header-sticked')
                            .css({ position: 'fixed', top: stickiesHeight })
                            .after($holder);
                        stickiesHeight += elementHeight;
                    }
                }

                /**
                 * Unstick element if it is sticked
                 */
                function unstickIt() {
                    if (isSticked()) {
                        stickiesHeight -= elementHeight;
                        $holder.detach();
                        $element
                            .removeClass('sticky-header-sticked')
                            .css(elementOriginalCss);
                    }
                }

                /**
                 * Should element be sticked at this moment
                 * @returns {boolean}
                 */
                function shouldBeSticked() {
                    var viewTop = $(window).scrollTop() + stickiesHeight,
                        elementTop = $element.offset().top;

                    if (isSticked()) {
                        viewTop -= elementHeight;
                        elementTop = $holder.offset().top;
                    }

                    return elementTop < viewTop;
                }

                // check element position each scroll event
                angular.element($window).on('scroll', function() {
                    if (shouldBeSticked()) {
                        stickIt()
                    } else {
                        unstickIt();
                    }
                });
            }
        };
    });
