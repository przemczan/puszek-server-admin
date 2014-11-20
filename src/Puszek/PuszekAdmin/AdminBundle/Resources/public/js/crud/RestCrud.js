angular.module('puszekApp')
    .factory('RestCrud', function RestCrudFactory(Config, Restangular) {

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
            var self = this;

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
             * @type {Object}
             */
            var collection = null;

            /**
             *
             * @param _config
             */
            function configure(_config) {
                config = jQuery.extend(true, config, _config);

                if (typeof config.restangular == 'function') {
                    config.restangular = config.restangular.call(self);
                }
                RestApi = config.restangular || Restangular;

                if (typeof config.configureRestangular == 'function') {
                    config.configureRestangular.call(self, RestApi);
                    config.configureRestangular = null;
                }

                if (typeof config.parentElementCallback == 'function') {
                    parentElement = config.parentElementCallback.call(self, RestApi);
                } else {
                    parentElement = RestApi;
                }
                collection = parentElement.all(config.elementRoute);
                self.refresh();
            }

            /**
             *
             */
            this.refresh = function(_callback) {
                collection.getList().then(function(_records) {
                    records = _records;
                    (_callback || angular.noop)(_records);
                });
            };

            /**
             *
             * @param _item
             */
            this.save = function(_item) {
                if (_item.fromServer) {
                    return _item.save();
                }
                return collection.post(_item);
            };

            /**
             *
             * @param _item
             */
            this.delete = function(_item) {
                return _item.remove().then(function() {
                    self.refresh();
                });
            };

            /**
             * Elements list
             * @returns {Array}
             */
            this.getItems = function() {
                return records;
            };

            /**
             * Restangular object
             * @returns {*}
             */
            this.getRestApi = function() {
                return RestApi;
            };


            configure(_config);
        }

        return {
            create: function(_config) {
                return new CRUDController(_config);
            }
        };
    });
