var express = require('express');
var router = express.Router();
var fetchAction =  require('node-fetch');
var bodyParser = require('body-parser');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));


router.get('/',function(request,response){
	var username = request.body.username;
	var password = request.body.password;

var url = "https://auth.absurdness87.hasura-app.io/v1/login";

var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
		
    }
};

var body = {
    "provider": "username",
    "data": {
        "username": username,
        "password": password;
    }
};

requestOptions.body = JSON.stringify(body);

fetchAction(url, requestOptions)
.then(function(response) {
	return response.json();
})
.then(function(result) {
	console.log(JSON.stringify(result));
	



			var url = "https://auth.absurdness87.hasura-app.io/v1/admin/user/create-session";

			var requestOptions = {
				"method": "POST",
				"headers": {
					"Content-Type": "application/json",
					"Authorization": "Bearer b741c215cfcb563fc41f787e746a8f5cc0acbe603c6fa13b"
				}
			};

			var body = {
				"hasura_id": 3
			};

			requestOptions.body = JSON.stringify(body);

			fetchAction(url, requestOptions)
			.then(function(response) {
				return response.json();
			})
			.then(function(result) {
				console.log(JSON.stringify(result));
			})
			.catch(function(error) {
				console.log('Request Failed:' + error);
			});
	
	
	response.cookie('auth_token',JSON.stringify(result.auth_token), { maxAge: 90000, httpOnly: true });
	response.send(JSON.stringify(result));
})
.catch(function(error) {
	console.log('Request Failed:' + error);
	response.send(error);
});
	
});

module.exports = router;