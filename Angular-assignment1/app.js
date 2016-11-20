
(function () {
'use strict';

angular.module('LunchCheck',[])

.controller('LunchCheckController', function ($scope) {
	$scope.list = "";
	$scope.numberOfLunchItems=0;
	$scope.warning = "";

	$scope.displayWarning = function () {
		var LunchItemCounter = CountItems($scope.list);
		
		if (LunchItemCounter < 1) {
			$scope.warning = "Please enter data first";
		} 
		else if (LunchItemCounter < 4) {
			$scope.warning = "Enjoy!";
		}
		else {
			$scope.warning = "Too Much!";
		}
		
	};

	function CountItems(string) {
		var numberOfItems = 0;
		if ($scope.list != "") {
			numberOfItems = string.split(",").length;
		}
		
		return numberOfItems;
	}

});

})();

