angular.module('puszekApp')
    .controller('NotificationController', function($scope, Notification) {

        $scope.Notification = Notification;
    })
    .factory('Notification', function($rootScope, $mdToast, $timeout) {

        var messages = [],
            $notificationContainer = $('#notification');

        /**
         *
         * @param _options
         * @constructor
         */
        function Message(_options) {
            var self = this,
                hidePromise;

            if (_options.hideTimeout > 0) {
                hidePromise = $timeout(
                    function() {
                        remove(self);
                    },
                    _options.hideTimeout
                )
            }

            this.getMessage = function() {
                return _options.message;
            };

            this.getType = function() {
                return _options.type;
            };
        }

        /**
         *
         */
        function remove(_message) {
            if (messages.indexOf(_message) >= 0) {
                messages.splice(messages.indexOf(_message), 1);
            }
        }

        /**
         *
         * @param _messageOptions
         */
        function add(_messageOptions) {
            _messageOptions = $.extend(
                    true,
                    {
                        message: null,
                        type: 'info',
                        hideTimeout: 5000
                    },
                _messageOptions
            );
            messages.push(new Message(_messageOptions));
        }

        function hide() {
            messages = [];
        }

        function redraw() {
            $timeout(function() {
                var $toast = $('md-toast:first', $notificationContainer);
                $toast.css('left', (($(window).width() - $toast.outerWidth()) / 2) + 'px');
            }, 1);
        }

        return {
            add: add,

            info: function(_messageOptions) {
                _messageOptions.type = 'info';
                add(_messageOptions);
            },

            error: function(_messageOptions) {
                _messageOptions.type = 'error';
                add(_messageOptions);
            },

            getMessages: function() {
                return messages;
            },

            hide: hide,
            redraw: redraw
        };
    });