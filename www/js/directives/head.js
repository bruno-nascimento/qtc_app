angular.module('starter').directive('head', ['$rootScope', '$compile', '$state', 
    function ($rootScope, $compile, $state) {
        return {
            restrict: 'E',
            link: function ($scope, elem, attrs, ctrls) {

                var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" />';
                var el = $compile(html)($scope)
                elem.append(el);
                $scope.routeStyles = {};

                function applyStyles(state, action) {
                    var sheets = state ? state.css : null;
                    if (state.parent) {
                        var parentState = $state.get(state.parent)
                        applyStyles(parentState, action);
                    }
                    if (sheets) {
                        if (!Array.isArray(sheets)) {
                            sheets = [sheets];
                        }
                        angular.forEach(sheets, function (sheet) {
                            action(sheet);
                        });
                    }
                }

                $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

                    applyStyles(fromState, function(sheet) {
                        delete $scope.routeStyles[sheet];
                        console.log('>> remove >> ', sheet);
                    });

                    applyStyles(toState, function(sheet) {
                        $scope.routeStyles[sheet] = sheet;
                        console.log('>> add >> ', sheet);
                    });
                });
            }
        }
    }
]);