angular.module('starter')
.config(function($stateProvider) {
    $stateProvider.state('app.chat', {
        url: '/chat?room&room_name',
        views: {
            'menuContent': {
                templateUrl: 'js/qtc/chat/chat.html',
                controller: 'ChatCtrl'
            },
            'fabContent': {
                template: ''
            },
            css: 'css/chat.css'
        },
    });
});