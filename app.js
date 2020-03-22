//jshint esversion: 6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.post("/", function(req, res){
const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;

 const data = {
   members : [
     {
       email_address: email,
       status: "subscribed",
       merge_fields: {
         FNAME: firstName,
         LNAME: lastName
       }
     }
   ]
 };
 const jsonData =JSON.stringify(data);
 const url = "https://us19.api.mailchimp.com/3.0/lists/6a7980ca77";
 const options = {
   method : "POST",
   auth : "great1:fa698708535c3b487164dde38e326019-us19"
 };

const request = https.request(url, options, function(response){
  if(response.statusCode===200){
    res.sendFile(__dirname + "/success.html");
  }
  else{
    res.sendFile(__dirname +"/faillure.html");
  }
response.on("data", function(data){
  console.log(JSON.parse(data));
})
})
request.write(jsonData);
request.end();

});
app.post("/faillure", function(req, res){
  res.redirect("/");
});

app.listen(Process.env.PORT || 3000, function(){
  console.log("your app is runing on the port 3000");
});
