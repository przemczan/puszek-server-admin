angular.module('puszekApp')
    .controller('messagesController', function messagesController($scope, ModalWindow, Config) {

        $scope['new'] = function() {
            ModalWindow.open(function($scope, $mdDialog, $http) {
                $scope.title = 'New message';
                $scope.contentTemplateUrl = Config.basePath + '/views/messages/new.html';
                $scope.message = {};
                $scope.$mdDialog = $mdDialog;

                $scope.send = function() {
                    $http.post(Config.baseUrl + '/messages/send', $scope.message).then(function(response) {
                        if (response.data.success) {
                            $mdDialog.cancel();
                        }
                    });
                }
            });
        }
    });
