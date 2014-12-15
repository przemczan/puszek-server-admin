angular.module('puszekApp')
    .controller('mainController', function mainController($scope, $state, $mdSidenav) {

        var self = this;

        self.mainMenuToggle = function() {
            $mdSidenav('mainMenu').toggle();
        };

        self.mainMenuClose = function() {
            $mdSidenav('mainMenu').close();
        };
    });
