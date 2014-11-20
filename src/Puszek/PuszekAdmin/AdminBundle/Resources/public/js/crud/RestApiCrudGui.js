angular.module('puszekApp')
    .factory('RestApiCrudGui', function RestApiCrudGuiFactory(RestApi, RestCrudGui) {
        return {
            create: function(_config) {
                _config = $.extend(true, {},
                    {
                        crud: {
                            restangular: function() {
                                return RestApi;
                            }
                        }
                    },
                    _config
                );
                return RestCrudGui.create(_config);
            }
        };
    });
