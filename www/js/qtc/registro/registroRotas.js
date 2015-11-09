angular.module('starter')
.config(function($stateProvider) {
    $stateProvider.state('app.registro', {
        url: '/registro',
        views: {
            'menuContent': {
                templateUrl: 'js/qtc/registro/registro.html',
                controller: 'RegistroUsuarioCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    });
});