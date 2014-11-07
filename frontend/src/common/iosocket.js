angular.module('iosocket', [
    'ui.router'
])
.factory('iosocket', function() {

    var iosocket = io.connect('http://localhost:8081/');

    return iosocket;
});