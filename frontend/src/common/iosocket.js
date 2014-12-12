angular.module('iosocket', [
    'btford.socket-io'
])
.factory('iosocket', function(socketFactory) {
    var iosocket = socketFactory();
    iosocket.forward('logged');
    iosocket.forward('isLogged');

    return iosocket;
});