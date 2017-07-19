// Code goes here

var app = angular.module('app', ['ngMessages', 'ngAutocomplete'])
  .controller('Ctrl', ['$scope', function($scope) {
    $scope.details = {
      address: { }
      
    }; 
  }]);