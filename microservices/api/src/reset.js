var express = require('express');
var router = express.Router();
var fetchAction =  require('node-fetch');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

router.use(cookieParser());
router.get('/',function(request,response){
	
var old_password = request.body.old_password;
var new_password = request.body.new_password;

var url = "https://auth.absurdness87.hasura-app.io/v1/providers/username/change-password";
var temp=request.cookies.auth_token;
var auth_token = "Bearer " + temp.substr(1,48);
console.log("authtoken:"+auth_token);
var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": auth_token
    }
};

var body = {
    "old_password": old_password,
    "new_password": new_password
};

requestOptions.body = JSON.stringify(body);

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