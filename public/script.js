// script.js
// create the module and name it travelWeb & include ngRoute for all routing needs
    var travelWeb = angular.module('travelWeb', ['ngRoute']);

    // configure our routes
    travelWeb.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/home', {
                templateUrl : 'index.html',
                controller  : 'Ctrl'
            })

            // route for the about page
            .when('/favourite', {
                templateUrl : 'favourite.html',
                controller  : 'favouriteController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'contact.html',
                controller  : 'contactController'
            })
            
            .otherwise({
                redirectTo: 'index'
            })
    });

    // create the controller and display Angular's $scope
    travelWeb.controller('Ctrl', function($scope, $window) {
        // create message to display in the view
        $scope.message = 'Use search bar below to search places';
    });

    travelWeb.controller('favouriteController', function($scope) {
        $scope.message = 'Favourite places at below';
    });

    travelWeb.controller('contactController', function($scope) {
        $scope.message = 'Drop us message for any question!';
    });