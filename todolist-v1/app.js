const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static('public'));

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");

const itemSchema = new mongoose.Schema({
    name: String
})

const Item = new mongoose.model("item", itemSchema);

const todoItem1 = new Item({
    name: "Do Homework"
})

const todoItem2 = new Item({
    name: "DSA"
})

var defaultItems = [todoItem1, todoItem2];
const options = {ordered: true};


var workItem = '';
var workItems = [];

app.listen(3000, function (req, res) {
    console.log("Server running on port 3000");
})

app.get('/', function (req, res) {
    var day = date.getDate();

    Item.find()
    .then((items)=>{
        if(items.length == 0){
            Item.insertMany(defaultItems, options);
            res.redirect('/');
        }
        else{
            res.render('list', { 
                listType: day, 
                list_items: items 
            });
        }
    })
    .catch(err => console.log(err)) 

    
})

app.post('/', function(req, res){
    const itemName = req.body.next_item;

    const todoItem = new Item({
        name: itemName
    })
    todoItem.save();
    console.log("Successfully inserted");

    if(req.body.list == 'Work List'){
        workItems.push(workItem);
        res.redirect('/work');
    }
    
    res.redirect('/');
})

app.post("/delete", function(req, res){
    const del = req.body.deletedItem;
    
    Item.deleteOne({_id: del})
    .then(() => {
        console.log("Successfully deleted")
    })
    .catch(err => console.log(err));

    res.redirect("/");
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