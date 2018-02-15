var express = require('express');
var app = express();
var router = express.Router();
var server = require('http').Server(app);
var fetchAction=require('node-fetch');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
var resp,speech;
app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
app.post('/',jsonParser,function(req,res){
	var gender=req.body.result.contexts[1].parameters.Gender;
	var brand=req.body.result.contexts[1].parameters.Brand;
	var type=req.body.result.contexts[1].parameters.Type;
	var price=req.body.result.contexts[1].parameters.number;
	var strength=req.body.result.contexts[1].parameters.Strength;
	var ProductId=req.body.result.contexts[1].parameters.ProductId; //PRODUCTID
	var Address=req.body.result.contexts[1].parameters.Address;     // I think it will be good if we add address to the Order table
	var url = "https://data.agleam79.hasura-app.io/v1/query";
	var brandid;
	var date = new Date();
	if (ProductId==0){     // Initial assigned value of ProductId is zero, when user makes input of their choice This block will return the list 
				if(brand=="Giorgio Armani")  // of available products and after the user inputs the value of ProductId Order table will be updated.
					brandid=1;               
				else if(brand=="Gucci")
					brandid=2;
				else if(brand=="Tom Ford")
					brandid=3;
				else if(brand=="Versace")
					brandid=4;
				else if(brand=="Yves Saint Laurent")
					brandid=5;
				else
					brandid=brand;
			var requestOptions = {
				"method": "POST",
				"headers": {
					"Content-Type": "application/json",
					"Authorization": "Bearer 678b77d65186a58592ee49f0980db0ccf9d2d5a0ee28abf6"
				}
			};

			var body = {
				"type": "select",
				"args": {
					"table": "Product",
					"columns": [
						"ID",
						"NAME",
						"PRICE"
					],
					"where": {
						"$and":[
						{"BRANDID": brandid},
						{"GENDER": gender},
						{"STRENGTH": strength},
						{"PRICE": {"$lte": price}},
						{"OCCASION": type}
						]
					}
				}
			};
			requestOptions.body = JSON.stringify(body);
			fetchAction(url, requestOptions)
			.then(function(response) {
				return response.json();
			})
			.then(function(result) {
				speech=JSON.stringify(result);
				console.log(speech);
			})
			.catch(function(error) {
				console.log('Request Failed:' + error);
			});
			res.json({"speech": speech,"displayText": speech});
			}
	else{
			var requestOptions = {
				"method": "POST",
				"headers": {
					"Content-Type": "application/json",
					"Authorization": "Bearer 678b77d65186a58592ee49f0980db0ccf9d2d5a0ee28abf6"
				}
			};

			var body = {
				"type":"insert",
				"args":{
					"table":"Order",
					"objects":[
						{"CUSTOMERID":CustomerId }, //CustomerId is still not defined and also assuming that you have implemented 
						{"PRODUCTID":ProductId },   // auto increment on ID
						{"DATE":date},
						{"ADDRESS": Address}
					]
				}
			};
			requestOptions.body = JSON.stringify(body);
			fetchAction(url, requestOptions)
			.then(function(response) {
				return response.json();
			})
			.then(function(result) {
				speech="Your Order has been successfully Placed";
				console.log(JSON.stringify(result));
			})
			.catch(function(error) {
				console.log('Request Failed:' + error);
				speech="There is a problem in placing your order, Please try again";
			});
			res.json({"speech": speech,"displayText": speech});
			}		
});
