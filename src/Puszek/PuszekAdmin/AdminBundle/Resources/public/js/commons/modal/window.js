angular.module('puszekApp')
    .factory('ModalWindow', function ModalWindowFactory(Config, $mdDialog) {

        function open(_controller, event) {
            return $mdDialog.show({
                templateUrl: Config.basePath + '/views/commons/modal/window.html',
                controller: _controller,
                targetEvent: event
            });
        }

        return  {
            open: open,
            hide: function() {
                return $mdDialog.hide();
            }
        };
    });
