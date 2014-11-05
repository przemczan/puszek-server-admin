angular.module('puszekApp')
    .factory('CRUDFactory', function(Config, Restangular) {

        function CRUDController(_config)
        {
            /**
             * Configuration
             */
            var config = {
                parentElementCallback: null,
                elementRoute: null,
                elementPk: 'id'
            };

            /**
             * Self reference
             * @type {CRUDController}
             */
            var self = this, $self = $(this);

            /**
             * Restangular instance
             */
            var RestApi;

            /**
             * Elements array
             * @type {Array}
             */
            var records = [];

            /**
             * Parent Element
             */
            var parentElement = null;

            /**
             *
             * @param _config
             */
            function configure(_config) {
                config = jQuery.extend(true, config, _config);

                RestApi = _config.restangular || Restangular;

                if (typeof config.configureRestangular == 'function') {
                    config.configureRestangular.call(self, RestApi);
                    config.configureRestangular = null;
                }

                if (typeof config.parentElementCallback == 'function') {
                    parentElement = config.parentElementCallback.call(self, RestApi);
                } else {
                    parentElement = RestApi;
                }
                parentElement.all(config.elementRoute).getList().then(function(_records) {
                    records = _records;
                });
            }

            /**
             *
             */
            this.new = function() {
                var item = {};
                Restangular.restangularizeElement(parentElement, item, config.elementRoute);

                return item;
            };

            /**
             *
             * @param _item
             */
            this.edit = function(_item) {
                var editedItem = {};
                RestApi.copy(_item, editedItem);

                return editedItem;
            };

            /**
             *
             * @param _item
             */
            this.cancel = function (_item) {
            };

            /**
             *
             * @param _item
             */
            this.save = function(_item) {
                _item.save().then(
                    function (_savedItem) {
                        parentElement.one(config.elementRoute, _savedItem[config.elementPk]).get().then(function (_realItem) {
                            RestApi.copy(_realItem, _item);
                        });
                    }
                );
            };

            /**
             *
             * @param _item
             */
            this.delete = function(_item) {
                _item.remove().then(
                    function () {
                        var index = records.indexOf(_item);
                        if (index >= 0) {
                            records.splice(index, 1);
                        }
                    }
                );

            };

            /**
             * Elements list
             * @returns {Array}
             */
            this.getItems = function() {
                return records;
            };


            configure(_config);
        }

        return {
            create: function(_config) {
                return new CRUDController(_config);
            }
        };
    });
