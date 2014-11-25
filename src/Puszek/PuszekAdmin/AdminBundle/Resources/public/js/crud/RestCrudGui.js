angular.module('puszekApp')
    .factory('RestCrudGui', function RestCrudGuiFactory(RestCrud, ModalWindow) {

        function gui(_config) {

            /**
             *
             * @type {gui}
             */
            var self = this;


            /**
             * @type {Object}
             */
            var crud = RestCrud.create(_config.crud || {});

            /**
             *
             * @param _item
             */
            function openItemForm(_item) {
                var _model = _item.fromServer ? crud.getRestApi().copy(_item) : _item,
                    actionConfig = _config[_item.fromServer ? 'edit' : 'new'];

                ModalWindow.open(function($scope, $mdDialog) {
                    $scope.title = actionConfig.title;
                    $scope.contentTemplateUrl = actionConfig.templateUrl;
                    $scope.item = _model;
                    $scope.$mdDialog = $mdDialog;

                    $scope.save = function(_form) {
                        _form.$setDirty();
                        if (_form.$valid) {
                            crud.save($scope.item).then(function(_savedItem) {
                                if (_item.fromServer) {
                                    crud.getRestApi().copy(_savedItem, _item);
                                } else {
                                    crud.refresh();
                                }
                                ModalWindow.hide();
                            });
                        }
                    };

                    $scope.cancel = self.cancel;
                });
            }

            /**
             * create new item
             */
            this.new = function() {
                openItemForm({});
            };

            /**
             * edit item
             */
            this.edit = function(_item) {
                openItemForm(_item);
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
            this.delete = function(_item) {
                return crud.delete(_item);
            };

            /**
             *
             */

            this.getItems = function() {
                return crud.getItems();
            };

            this.getMeta = crud.getMeta;
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
