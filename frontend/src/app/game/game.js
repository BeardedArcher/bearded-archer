angular.module('game', [
    'ui.router'
])

.config(function config($stateProvider) {
    $stateProvider.state('game', {
        url: '/game',
        views: {
            "main": {
                controller: 'Game',
                templateUrl: 'game/game.tpl.html'
            }
        },
        data: {
            pageTitle: 'Game'
        }
    });
})

.controller('Game', function ($scope, iosocket) {
    $scope.$on('socket:isLogged', function(event, data) {
        if(data.isLogged === false) {
            alert();
        }
    });
    
    iosocket.emit('checkLogin', {});

});