angular.module('home', [
    'ui.router'
])

.config(function config($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        views: {
            "main": {
                controller: 'Home',
                templateUrl: 'home/home.tpl.html'
            }
        },
        data: {
            pageTitle: 'Home'
        }
    });
})

.controller('Home', function ($scope, iosocket) {
    var processRegister, processLogin;

    processRegister = function() {

    };
});