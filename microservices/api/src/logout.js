var express = require('express');
var router = express.Router();
var fetchAction =  require('node-fetch');
var cookieParser = require('cookie-parser');

router.use(cookieParser());


router.get('/',function(request,response){


var url = "https://auth.absurdness87.hasura-app.io/v1/user/logout";
var temp=request.cookies.auth_token;
var auth_token = "Bearer " + temp.substr(1,48);
var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": auth_token
    }
};

fetchAction(url, requestOptions)
.then(function(response) {
	return response.json();
})
.then(function(result) {
	console.log(JSON.stringify(result));
	response.send(JSON.stringify(result));
})
.catch(function(error) {
	console.log('Request Failed:' + error);
});
});

module.exports = router;