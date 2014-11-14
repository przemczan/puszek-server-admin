angular.module('puszekApp')
    .controller('mainController', function($scope, $state) {

        var self  =this;
        this.menuOpen = true;

        self.menuToggle = function() {
            self.menuOpen = !self.menuOpen;
        }
    });
