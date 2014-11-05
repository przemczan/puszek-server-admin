angular.module('puszekApp')
    .factory('CRUDFactoryGUI', function(CRUDFactory) {

        function gui(_config) {

            /**
             * @type {Object}
             */
            var crud = CRUDFactory.create(_config.crud || {});

            /**
             * create new item
             */
            this.new = function() {

            };

            /**
             * cancel creation/edit
             */
            this.cancel = function() {

            };

            /**
             * save item
             */
            this.save = function() {

            };
        }

        return {
            create: function(_config) {
                return new gui(_config);
            }
        };
    });
