angular.module('puszekApp')
    .factory('ModalConfirm', function ModalConfirmFactory(Config, $mdDialog) {

        function open(_content, _title, event) {
            return $mdDialog.show({
                templateUrl: Config.basePath + '/views/commons/modal/confirm.html',
                targetEvent: event,
                controller: function ($scope, title, content) {
                    $scope.title = title;
                    $scope.content = content;
                    $scope.$mdDialog = $mdDialog;
                },
                locals: {
                    title: _title || 'Confirmation',
                    content: _content
                }
            });
        }

        return  {
            open: open
        };
    });