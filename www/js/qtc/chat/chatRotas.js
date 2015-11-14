angular.module('starter')
.config(function($stateProvider) {
    $stateProvider.state('app.chat', {
        url: '/chat?room',
        views: {
            'menuContent': {
                templateUrl: 'templates/chat.html',
                controller: 'ChatCtrl'
            },
            'fabContent': {
                template: ''
            },
            css: 'css/chat.css'
        }
    });
});