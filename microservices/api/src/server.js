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
	var url = "https://data.agleam79.hasura-app.io/v1/query";
	var brandid;
	if(brand=="Giorgio Armani")
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
});
