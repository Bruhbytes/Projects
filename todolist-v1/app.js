const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
var items = ["Buy Food", "Cook Food", "Eat Food"];

app.listen(3000, function (req, res) {
    console.log("Server running on port 3000");
})

app.get('/', function (req, res) {
    var today = new Date();
    var currentDay = today.getDay();
    // var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // var day = days[currentDay];
    
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    var day = today.toLocaleDateString('en-US', options);
    res.render('list', { 
        kindOfDay: day, 
        list_items: items 
    });
})

app.post('/', function(req, res){
    item = req.body.next_item;
    items.push(item);
    res.redirect('/');
})