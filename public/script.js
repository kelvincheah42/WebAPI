    var travelWeb = angular.module('travelWeb', ['ngRoute']);

    // configure our routes
    travelWeb.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/home', {
                templateUrl : 'index.html',
                controller  : 'Ctrl'
            })
            
            .otherwise({
                redirectTo: 'index'
            })
    });

    // create the controller and display Angular's $scope
    travelWeb.controller('Ctrl', function($scope, $window) {
        // create message to display in the view
        $scope.message = 'TESTING 123';
    });

  