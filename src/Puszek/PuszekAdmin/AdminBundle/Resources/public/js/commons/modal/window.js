angular.module('puszekApp')
    .factory('ModalWindow', function ModalWindowFactory(Config, $mdDialog) {

        function open(_controller) {
            return $mdDialog.show({
                templateUrl: Config.basePath + '/views/commons/modal/window.html',
                controller: _controller
            });
        }

        return  {
            open: open,
            hide: function() {
                return $mdDialog.hide();
            }
        };
    });
