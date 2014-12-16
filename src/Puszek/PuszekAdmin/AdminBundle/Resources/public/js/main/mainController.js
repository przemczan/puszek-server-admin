angular.module('puszekApp')
    .controller('mainController', function mainController($scope, $state, $mdSidenav, $mdMedia) {

        var self = this;

        self.mainMenuToggle = function() {
            $mdSidenav('mainMenu').toggle();
        };

        self.mainMenuClose = function() {
            $mdSidenav('mainMenu').close();
        };

        self.getBodyClass = function() {
            return {
                'page-lg': $mdMedia('gt-md'),
                'page-md': $mdMedia('md'),
                'page-sm': $mdMedia('sm')
            }
        };
    });
