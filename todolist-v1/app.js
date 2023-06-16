const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.listen(3000, function (req, res) {
    console.log("Server running on port 3000");
})

app.get('/', function (req, res) {
    var today = new Date();
    var currentDay = today.getDay();
    
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var day = days[currentDay];
    
    res.render('list', { kindOfDay: day });
    
})

