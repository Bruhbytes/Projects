const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static('public'));

var items = [];
var item = '';
var workItems = [];

app.listen(3000, function (req, res) {
    console.log("Server running on port 3000");
})

app.get('/', function (req, res) {
    var day = date.getDate();
    res.render('list', { 
        listType: day, 
        list_items: items 
    });
})

app.post('/', function(req, res){
    item = req.body.next_item;
    if(req.body.list == 'Work List'){
        workItems.push(item);
        res.redirect('/work');
    }
    else{
        items.push(item);
        res.redirect('/');
    }
})

app.get('/work', function(req, res){
    res.render('list', {
        listType: 'Work List',
        list_items: workItems
    });
})

app.get('/about',function(req, res){
    res.render('about');
})