angular.module('puszekApp')
    .controller('mainController', function($scope, $state) {
        $state.go('homepage');
    });
