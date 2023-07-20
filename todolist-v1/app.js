const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');
const _ = require('lodash');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static('public'));

const port = process.env.PORT || 3000;

mongoose.connect("mongodb+srv://admin-DTS:DTS123@cluster0.enq3fzf.mongodb.net/todolistDB");

const itemSchema = new mongoose.Schema({
    name: String
})

const Item = new mongoose.model("item", itemSchema);

const todoItem1 = new Item({
    name: "Type Below to add Items"
})

const todoItem2 = new Item({
    name: "<-- Hit this to delete"
})

var defaultItems = [todoItem1, todoItem2];
const options = {ordered: true};

const listSchema = new mongoose.Schema({
    name: String,
    items: [itemSchema]
})

const List = new mongoose.model("list", listSchema);

app.listen(port, function (req, res) {
    console.log(`Server running on port ${port}`);
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
    const listName = req.body.list;

    const todoItem = new Item({
        name: itemName
    })

    if(listName == date.getDate()){
        todoItem.save();
        res.redirect('/');
    }
    else{
        List.findOne({name: listName})
        .then((list) => {
            list.items.push(todoItem);
            list.save();
            res.redirect("/list/" + listName);
        })
        .catch(err => console.log(err))
    }
    
})

app.post("/delete/:listName", function(req, res){
    const del = req.body.deletedItem;        
    const listTitle = req.params.listName;
    
    if(listTitle == date.getDate()){
        Item.deleteOne({_id: del})
        .then(() => {
            console.log("Successfully deleted")
        })
        .catch(err => console.log(err));

        res.redirect("/");
    }
    else{
        List.updateOne({name : listTitle},{$pull: {items: {_id: del}}})
        .then(() => res.redirect("/list/" + listTitle))
        .catch(err => console.log(err));        
    }
})

app.get('/list/:listName', function(req, res){
    const listTitle = _.capitalize(req.params.listName);
    

    List.findOne({name: listTitle})
    .then((list) => {
        if(!list){
            //Create a new list            
            const list = new List({
                name: listTitle,
                items: []
            })
            list.save();

            res.redirect("/list/" + listTitle);
        }
        else{
            //append into existing list            
            res.render('list', {
                listType : listTitle, 
                list_items: list.items
            })
        }
    })
    .catch(err => {
        console.log(err);
    })


});

app.get('/about',function(req, res){
    res.render('about');
})