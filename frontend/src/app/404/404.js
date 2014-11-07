angular.module('error404', [
    'ui.router'
])

.config(function ($stateProvider) {
    $stateProvider.state('error404', {
        url: '/error-404',
        views: {
            "main": {
                controller: 'Error404',
                templateUrl: '404/404.tpl.html'
            }
        },
        data: {
            pageTitle: 'Error 404'
        }
    });
})

.controller('Error404', function () {

});