angular.module('starter')
.factory('$socket', ['$q', 'socketFactory', function($q, socketFactory) {
	var qtc_socket = io.connect('http://server-qtcapp.rhcloud.com:8000/'); //io.connect('http://localhost:8080');
    var socket = socketFactory({
        ioSocket: qtc_socket
    });
    return socket;
}]);