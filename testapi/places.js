angular.module("ngAutocomplete", [])
    .directive('ngAutocomplete', ['$parse',
        function ($parse) {
                	
    		function convertPlaceObject(place) {
    			
        		var FormInformation = {
        				street_number: 'short_name',
        				route: 'short_name',
        				locality: 'long_name',
        				administrative_area_level_1: 'short_name',
        				country: 'long_name',
        				postal_code: 'short_name'
            	};
    			
                var result = undefined;
                if (place) {
                    result = {};
                    for (var i = 0, l = place.address_components.length; i < l; i++) {
                        var type = place.address_components[i].types[0];
                    	if (i == 0) {
                            result.SearchedType = type;
                        }
                        result[type] = place.address_components[i][FormInformation[type]];
                        
                    }
                     result.formattedAddress = place.formatted_address;
                   result.website = place.website;
                }
                return result;
            }

            return {
                restrict: 'A',
                require: 'ngModel',
                link: function ($scope, $element, $attrs, $ctrl) {
                    if (!angular.isDefined($attrs.details)) {
                        throw '<ng-autocomplete> must have attribute [details] assigned to store full address object';
                    }

                    var getDetails = $parse($attrs.details);
                    var setDetails = getDetails.assign;
                    var getOptions = $parse($attrs.options);
                    var googleServiceTested = false;
                    var googleServiceWorks = false;

                    //options for autocomplete
                    var opts;

                    //convert the options provided to opts
                    var initOpts = function () {
                        opts = {};
                        if (angular.isDefined($attrs.options)) {
                            var options = getOptions($scope);
                            if (options.types) {
                                opts.types = [];
                                opts.types.push(options.types);
                            }
                            if (options.bounds) {
                                opts.bounds = options.bounds;
                            }
                            if (options.country) {
                                opts.componentRestrictions = {
                                    country: options.country
                                };
                            }
                        }
                    };

                 
                //create autocomplete
                    //initializes on every change of the options provided
                    var Autocomplete = function () {
                        var gPlace = new google.maps.places.Autocomplete($element[0], opts);
                        google.maps.event.addListener(gPlace, 'place_changed', function () {
                            $scope.$apply(function () {
                                var place = gPlace.getPlace();
                                var details = convertPlaceObject(place);
                                setDetails($scope, details);
                                $ctrl.$setViewValue(details.formattedAddress);
                                $ctrl.$validate();
                            });
                        if ($ctrl.$valid && angular.isDefined($attrs.validateFn)) {
                                $scope.$apply(function () {
                                    $scope.$eval($attrs.validateFn);
                                });
                            }
                        });
                    };
                    Autocomplete();

                    $ctrl.$validators.parse = function (value) {
                        var details = getDetails($scope);
                        var valid = ($attrs.required == true && details != undefined && details.website != undefined) ||
                            (!$attrs.required && (details == undefined || details.website == undefined) && $element.val() != '');
                        return valid;
                    };

                    $element.on('keypress', function (e) {
                        // prevent form submission on pressing Enter as there could be more inputs to fill out
                        if (e.which == 13) {
                            e.preventDefault();
                        }
                    });

                    //watch options provided to directive
                    if (angular.isDefined($attrs.options)) {
                        $scope.$watch($attrs.options, function() {
                            initOpts();
                            Autocomplete();
                        });
                    }

                    // user typed something in the input which means an intention to change address,that why need to null out all fields for validation
                    
                    $element.on('keyup', function (e) {
                        //          chars 0-9, a-z                        numpad 0-9                   backspace         delete           space
                        if ((e.which >= 48 && e.which <= 90) || (e.which >= 96 && e.which <= 105) || e.which == 8 || e.which == 46 || e.which == 32) {
                            var details = getDetails($scope);
                            if (details != undefined) {
                                for (var property in details) {
                                    if (details.hasOwnProperty(property) && property != 'formattedAddress') {
                                        delete details[property];
                                    }
                                }
                                setDetails($scope, details);
                            }
                            if ($ctrl.$valid) {
                                $scope.$apply(function () {
                                    $ctrl.$setValidity('parse', false);
                                });
                            }
                        }
                    });
                }
            };
        }
    ]);