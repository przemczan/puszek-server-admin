(function(window, $) {

    window.Puszek.WebSocketRequest = {
        TYPE_MESSAGE_MARK_AS_READ: 'message_mark_as_read',

        create: function() {
            return new WebSocketRequest();
        }
    };

    function WebSocketRequest() {

        /**
         * Empty response object
         * @type {*}
         * @private
         */
        var self = this,
            packetData = {
                type: null,
                data: null
            };

        /**
         * Sets response data
         * @param _data
         * @returns {*}
         */
        this.data = function (_data) {
            packetData.data = _data;

            return self;
        };



        /**
         * Sets response type
         * @returns {*}
         */
        this.type = function (_type) {
            packetData.type = _type;

            return self;
        };

        /**
         * @returns {*}
         */
        this.send = function (_socket) {
            console.log(packetData);
            _socket.send(JSON.stringify(packetData));

            return self;
        }
    }
})(window, jQuery);
