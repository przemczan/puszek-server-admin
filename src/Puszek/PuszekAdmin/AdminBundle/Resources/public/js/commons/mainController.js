angular.module('puszekApp')
    .controller('mainController', ['$scope', 'User', function($scope, User) {

        this.user = User.get();
    }]);