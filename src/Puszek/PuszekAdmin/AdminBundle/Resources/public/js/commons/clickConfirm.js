angular.module('puszekApp')
    .directive('clickConfirm', function (ModalConfirm) {
        return {
            restrict: 'A',
            priority: 1,
            compile: function(elem, attr) {
                var message = attr.clickConfirm,
                    title = attr.clickConfirmTitle || 'Confirm action',
                    click = attr.ngClick;

                delete attr.ngClick;

                return function link(scope, element) {
                    var clickEvents = angular.copy($._data(element[0], 'events').click || [], []);
                    element.off('click');
                    element.bind('click', function (e) {
                        e.preventDefault();
                        ModalConfirm.open(message, title).then(function () {
                            if (click) {
                                scope.$eval(click);
                            }
                            setTimeout(function() {
                                angular.forEach(clickEvents, function (handlerData) {
                                    handlerData.handler(e);
                                });
                            });
                        })
                    });
                };
            }
        };
    });