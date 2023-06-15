const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function(req, res){
    console.log("Server running on port 3000");
})

app.get('/', function(req, res){
    res.send("<h2>Hello World</h2>");
})

