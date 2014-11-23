angular.module('puszekApp')
    .directive('pHttpLoader', function pHttpLoaderDirective($rootScope) {
        return {
            restrict: 'E',
            scope: {
                'template': '&',
                'loaderId': '@',
                'loaderClass': '@'
            },
            transclude: 'element',
            replace: true,
            template: '<div class="p-http-loader" ng-class="loaderClass" ng-show="processesCount"><div p-include="template"></div></div>',
            link: function($scope, element, attrs) {

                $scope.template = $scope.$eval(attrs.template);
                $scope.processesCount = 0;

                function showLoader(e, _config)  {
                    if ($scope.loaderId === _config.loaderId) {
                        $scope.processesCount++;
                    }
                }

                function hideLoader(e, _config)  {
                    if ($scope.processesCount > 0 && $scope.loaderId === _config.loaderId) {
                        $scope.processesCount--;
                    }
                }

                $rootScope.$on("http.start", showLoader);
                $rootScope.$on("http.stop", hideLoader);
            }
        };
    })
    .factory('pHttpLoaderHttpMethodInterceptor', function ($q, $rootScope) {
        return {
            /**
             *
             * @param _config
             * @returns {*}
             */
            request: function (_config) {
                if (!_config.disableLoader) {
                    $rootScope.$emit('http.start', _config);
                }

                return _config || $q.when(_config);
            },

            /**
             * Broadcast the loader hide event
             *
             * @param {object} _response
             *
             * @returns {object|Promise}
             */
            response: function (_response) {
                if (!_response.config.disableLoader) {
                    $rootScope.$emit('http.stop', _response.config);
                }

                return _response || $q.when(_response);
            },

            /**
             * Handle errors
             *
             * @param {object} _response
             *
             * @returns {Promise}
             */
            responseError: function (_response) {
                if (!_response.config.disableLoader) {
                    $rootScope.$emit('http.stop', _response.config);
                }

                return $q.reject(_response);
            }
        };
    })
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('pHttpLoaderHttpMethodInterceptor');
    });
