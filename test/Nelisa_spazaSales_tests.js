var assert = require("assert");
var productsSoldReader = require('../modules/Nelisa_Spaza_Sales');
var purchasedProductsReader = require('../modules/Nelisa_Spaza_Sales_earnings');
var SalesFileProcessing = require('../modules/sales_file_utilities');

describe("Nelisa's spaza sales processing", function(){

    it('should find all the sales rows in the file', function(){

    	var reader = SalesFileProcessing.getSales('./files/NelisaSalesHistory.csv');
    	assert.equal(448, reader.length);

    });

   it('should find the most popular product plus qty', function(){
        var reader = productsSoldReader.findMostPopularProduct('./files/NelisaSalesHistory.csv');
        assert.deepEqual({"productName":"Mixed Sweets 5s","qty":172},reader);
    });

    it('should find most popular category name plus qty', function(){
            var salesPerProduct = productsSoldReader.findMostPopularCategory('./files/NelisaSalesHistory.csv');
             assert.deepEqual(salesPerProduct, {"categoryName" : "Short_Life_Groceries", "qty" : 397}); 

        });

    it('should find least popular product name plus qty', function(){
            var salesPerProduct = productsSoldReader.findLeastPopularProduct('./files/NelisaSalesHistory.csv');
             assert.deepEqual(salesPerProduct,{"productName":"Rose (plastic)","qty":14} ); 

        });

    it('should find least popular category name plus qty', function(){
            var salesPerProduct = productsSoldReader.findLeastPopularCategory('./files/NelisaSalesHistory.csv');
             assert.deepEqual(salesPerProduct, {"categoryName" : "Novelty_Goods", "qty" : 28}); 

        });

});
   describe("Nelisa's spaza sales earnings file processing", function(){

    it('should find the total earnings per product', function(){
        var salesPerProduct = productsSoldReader.getSalesPerProduct('./files/NelisaSalesHistory.csv');
        
        console.log(salesPerProduct);

        assert.equal(1420, salesPerProduct["Milk 1l"]); 
        assert.equal(1410, salesPerProduct["Iwisa Pap 5kg"]); 
        assert.equal(700, salesPerProduct["Heart Chocolates"]); 

    });

    it('should find the total earnings per category', function(){
        var salesPerProduct = SalesFileProcessing.getSalesPerProductsCategory('./files/NelisaSalesHistory.csv');                     
                    

                         assert.equal(6105, salesPerProduct['Short_Life_Groceries']);
                         assert.equal(1714, salesPerProduct['Tinned_Food']);
                         assert.equal(2207, salesPerProduct['Beverages']);
                         assert.equal(2586, salesPerProduct['Long_Life_Groceries']);
                         assert.equal(1080, salesPerProduct['Toiletries']);
                         assert.equal(456, salesPerProduct['Fruit']);
                         assert.equal(1155, salesPerProduct['Luxuries']);
                         assert.equal(266, salesPerProduct['Novelty_Goods']);

             //assert.equal(earningsPerProductsCategory ,result); 
         });

});

describe("Nelisa's spaza sales purchases file processing",function(){

    it('should find the purchases rows in the file to get the length of lines from csv', function(){
           var purchasedProducts = SalesFileProcessing.getSales("./files/NelisaPurchases.csv");
             assert.equal(153, purchasedProducts.length); 
        });

    it('should find the purchased products rows', function(){
            var earningsPerProduct = purchasedProductsReader.findSalesEarningsRows('./files/NelisaPurchases.csv');
             assert.equal(earningsPerProduct); 

        });

    it('should find the earnings per product from Nelisas purchases file', function(){
//var purchasedProductsReader = require('../modules/Nelisa_Spaza_Sales_earnings');
            var salesPerProduct = purchasedProductsReader.getTotalCostPerProduct('./files/NelisaPurchases.csv');
             assert.equal(2238, salesPerProduct["Imasi"]);
             assert.equal(2070, salesPerProduct["Mixed Sweets 5s"]);
             assert.equal(1270, salesPerProduct["Bread"]);  
             assert.equal(1061.5, salesPerProduct["Milk 1l"]);
             assert.equal(1020, salesPerProduct["Iwisa Pap 5kg"]);
             assert.equal(808, salesPerProduct["Top Class Soy Mince"]);  
             assert.equal(500, salesPerProduct["Heart Chocolates"]);
             assert.equal(676, salesPerProduct["Chakalaka Can"]); 
             assert.equal(598.5, salesPerProduct["Coke 500ml"]);
             assert.equal(520, salesPerProduct["Shampoo 1 litre"]);
             assert.equal(200, salesPerProduct["Rose (plastic)"]); 
             assert.equal(479, salesPerProduct["Gold Dish Vegetable Curry Can"]);
             assert.equal(433.5, salesPerProduct["Fanta 500ml"]);  
             assert.equal(357, salesPerProduct["Cream Soda 500ml"]); 
             assert.equal(156, salesPerProduct["Soap Bar"]); 
             assert.equal(72, salesPerProduct["Bananas - loose"]);
             assert.equal(40, salesPerProduct["Valentine Cards"]); 
        });

    it('should find the most profitable product',function(){
              var mostProfitableProduct = productsSoldReader.getMostProfitableProduct("./files/NelisaPurchases.csv");
             assert.equal(476,mostProfitableProduct['Milk']);
        });

});

