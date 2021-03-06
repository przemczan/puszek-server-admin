angular.module('puszekApp')
    .factory('RestCrud', function RestCrudFactory($rootScope, Config, Restangular) {

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
                collection.getList(self.getMeta().params).then(function(_records) {
                    var index;
                    for (index in records) {
                        delete records[index];
                    }
                    for (index in _records) {
                        records[index] = _records[index];
                    }
                    records.meta.pages_count = Math.ceil(records.meta.total_count / records.meta.items_per_page);
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

            /**
             *
             * @returns {Object}
             */
            this.getMeta = function() {
                return records.meta || {
                    page_number: 0,
                    items_per_page: 20,
                    total_count: 0,
                    pages_count: 0,
                    params: {
                        page: 1
                    }
                };
            };

            /**
             * Loads a page
             * @param _page
             */
            this.setPage = function(_page) {
                if (records.meta.params.page != _page) {
                    records.meta.params.page = _page;
                    self.refresh();
                }
            };


            configure(_config);
        }

        return {
            create: function(_config) {
                return new CRUDController(_config);
            }
        };
    })
    .config(function(RestangularProvider) {
        // Now let's configure the response extractor for each request
        RestangularProvider.setResponseExtractor(function(response, operation, what, url) {
            var newResponse;
            // This is a get for a list
            if (operation === "getList") {
                // First the newResponse will be response.objects which is actually an array
                newResponse = response.items;
                // Then we add to this array a special property containing the metadata for paging for example
                newResponse.meta = response.meta;
            } else {
                // If it's an element, then we just return the "regular" response as there's no object wrapping it
                newResponse = response;
            }

            return newResponse;
        });
    })
    .filter('crudIsItem', function() {
        return function(_items) {
            return _items.filter(function(_item) {
                return typeof _item == 'object' && typeof _item.addRestangularMethod == 'function';
            });
        };
    });
