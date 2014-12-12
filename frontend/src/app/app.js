angular.module('ngBoilerplate', [
    'templates-app',
    'templates-common',
    'error404',
    'home',
    'game',
    'ui.router',
    'iosocket'
])

.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/error-404');
})

.run(function run() {
    
})

.controller('AppCtrl', ['$scope', '$location', '$state', 'iosocket', function AppCtrl($scope, $location, $state, iosocket) {
    
}]);