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

.controller('Home', function ($scope, iosocket, $state) {

    $scope.loginInput = 'asd';
    $scope.passwordInput = 'zxc';

    $scope.processRegister = function() {
    };

    $scope.processLogin = function(login, password) {
        iosocket.emit('login', {
            login: login,
            password: password
        });
    };

    $scope.$on('socket:logged', function(event, data) {
        if (data.logged === true) {
            $state.go('game');
        } else {
            $scope.error = 'Wrong login and/or password.';
        }
    });
});