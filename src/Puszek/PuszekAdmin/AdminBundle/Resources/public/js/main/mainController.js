angular.module('puszekApp')
    .controller('mainController', function mainController($scope, $state, $mdSidenav) {

        var self  =this;
        this.menuOpen = false;

        self.mainMenuToggle = function(_toggle) {
            self.menuOpen = typeof _toggle == 'boolean' ? _toggle : !self.menuOpen;
        };
    });
