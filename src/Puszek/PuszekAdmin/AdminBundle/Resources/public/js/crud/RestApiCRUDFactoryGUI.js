angular.module('puszekApp')
    .factory('RestApiCRUDFactoryGUI', function(RestApi, CRUDFactoryGUI) {
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
                return CRUDFactoryGUI.create(_config);
            }
        };
    });
