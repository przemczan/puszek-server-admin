angular.module('puszekApp')
    .controller('actionsMenuController', function actionsMenuController($scope, $element) {

        var self = this;

        self.open = false;

        $($element)
            .on('mouseenter', function(event) {
                self.open = true;
                $scope.$apply();
            })
            .on('mouseleave', function(event) {
                if (!$.contains(this, event.toElement)) {
                    self.open = false;
                    $scope.$apply();
                }
            });
    });
