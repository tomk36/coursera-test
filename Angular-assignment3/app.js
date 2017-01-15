(function() {
'use strict'

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems',FoundItems);

function FoundItems () {
	var ddo = {
		templateUrl: "foundItems.html",
		scope: {
			found: '<',
			onRemove: '&'
		}
	};
	return ddo;
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService ($http) {
	var service = this;
	service.getMenuItems = function () {
		var response = $http({
			method: 'GET',
			url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
		});
		return response;
	}

}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService) {
	var list = this;
	var searchTerm = "";
	list.found = [];

	list.getMatchedMenuItems = function () {
		var promise = MenuSearchService.getMenuItems();
		list.found = [];

		if (list.searchTerm !== "") {
			promise
				.then(function(response) {
					list.items = response.data.menu_items;
					for (var i = 0; i < list.items.length; i++) {
						// console.log(list.items[i].description)
						if (list.items[i].description.indexOf(list.searchTerm) !== -1) {
							list.found.push(list.items[i]);
						}
					}
					console.log(list.found);
					console.log(list.searchTerm);
				})
				.catch(function (error) {
	    			console.log("Something went terribly wrong.");
  			});
		}
		
	}

	list.removeItem = function (index) {
		list.found.splice(index,1);
	}


	
};


})();