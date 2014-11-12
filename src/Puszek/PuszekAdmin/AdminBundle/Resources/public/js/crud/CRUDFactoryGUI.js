angular.module('puszekApp')
    .factory('CRUDFactoryGUI', function(CRUDFactory, ModalWindow) {

        function gui(_config) {

            /**
             *
             * @type {gui}
             */
            var self = this;


            /**
             * @type {Object}
             */
            var crud = CRUDFactory.create(_config.crud || {});

            /**
             * create new item
             */
            this.new = function() {
                self.edit(crud.new());
            };

            /**
             * create new item
             */
            this.edit = function(_item) {
                var actionConfig = _config[_item.fromServer ? 'edit' : 'new'];
                ModalWindow.open(function($scope, $mdDialog) {
                    $scope.title = actionConfig.title;
                    $scope.contentTemplateUrl = actionConfig.templateUrl;
                    $scope.item = _item;
                    $scope.$mdDialog = $mdDialog;

                    $scope.save = function(_form) {
                        _form.$setDirty();
                        if (_form.$valid) {
                            self.save($scope.item).then(function() {
                                ModalWindow.hide();
                            });
                        }
                    };

                    $scope.cancel = function() {
                        self.cancel();
                    };
                });
            };

            /**
             * cancel creation/edit
             */
            this.cancel = function() {
                ModalWindow.hide();
            };

            /**
             * save item
             */
            this.save = function(_item) {
                return crud.save(_item);
            };

            /**
             * save item
             */
            this.delete = function(_item) {
                return crud.delete(_item);
            };

            /**
             *
             */

            this.getItems = function() {
                return crud.getItems();
            }
        }

        return {
            create: function(_config) {
                _config = $.extend(true, {
                    'new': {
                        title: 'New',
                        templateUrl: null
                    },
                    'edit': {
                        title: 'Edit',
                        templateUrl: null
                    }
                }, _config);
                return new gui(_config);
            }
        };
    });
