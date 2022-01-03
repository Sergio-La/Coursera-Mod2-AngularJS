(function() {
    'use strict'

    angular.module('ShoppingListCheckOff',[])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListService', ShoppingListService);

    ToBuyController.$inject = ['ShoppingListService'];

    function ToBuyController(ShoppingListService) {
        var tb = this;
        
        tb.LitsToBuy = ShoppingListService.getLitsToBuy();

        tb.removeItem = function (itemIndex) {
            try {
                ShoppingListService.removeItem(itemIndex);
            }  catch (error) {
                tb.errorMessage = error.message;
            }
            
        };
    }

    function AlreadyBoughtController (ShoppingListService) {
        var bg = this;

        bg.Bought = ShoppingListService.getBought();

        
    }



    function ShoppingListService () {
        var service = this;

        // ToBuy
        var LitsToBuy = [
            {
                name: "cookies",
                quantity: 10
            },
            {
                name: "Chips",
                quantity: 2
            },
            {
                name: "Grapes",
                quantity: 7
            },
            {
                name: "Apples",
                quantity: 12
            },
            {
                name: "Nachos",
                quantity: 22
            }
        ];


        // Already Bought
        var Bought = [];

        service.getLitsToBuy = function () {
            return LitsToBuy;
        };

        service.getBought = function () {

            return Bought;
        };

        service.aux = LitsToBuy.length;

        service.removeItem = function (itemIndex) {
            
            if (LitsToBuy.length > 0) {
                Bought.push(LitsToBuy[itemIndex]);
                LitsToBuy.splice(itemIndex, 1);
                if (LitsToBuy.length === 0){
                    throw new Error ("Everything is bought!");
                }


            }
        };

    }
    
})();