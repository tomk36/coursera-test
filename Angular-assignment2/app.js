( function () {

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController (ShoppingListCheckOffService) {
	var order = this;
	order.items = ShoppingListCheckOffService.gettoBuyItems();
	order.buyItem = function (itemIndex) {
		ShoppingListCheckOffService.buyItem(itemIndex);
	}
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController (ShoppingListCheckOffService) {
	var shopping = this;
	shopping.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
}

function ShoppingListCheckOffService () {
	var service = this;
	var shoppingList = [
	  {
	    name: "Milk",
	    quantity: "2"
	  },
	  {
	    name: "Donuts",
	    quantity: "200"
	  },
	  {
	    name: "Cookies",
	    quantity: "300"
	  },
	  {
	    name: "Chocolate",
	    quantity: "5"
	  },
	  {
	    name: "Bismol",
	    quantity: "8"
	  }
	];
	var toBuyItems = shoppingList;
	var alreadyBoughtItems = [];

	service.gettoBuyItems = function () {
		return toBuyItems;
	};

	service.getAlreadyBoughtItems = function () {
		return alreadyBoughtItems;
	}

	service.buyItem = function (itemIndex) {
		alreadyBoughtItems.push(toBuyItems[itemIndex]);
		toBuyItems.splice(itemIndex,1);
	}
}

})();
