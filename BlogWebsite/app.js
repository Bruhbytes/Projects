const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
const port = process.env.PORT || 3000;

const homestarting = "Lorem ipsum dolor sit amet. Sed laborum dolorem qui aliquam voluptatem et accusantium aperiam ea incidunt provident et totam iusto sit repellat internos id reiciendis placeat. At atque dolor in autem voluptatum sed adipisci veniam et blanditiis quas et omnis impedit quo consectetur dolor. Et accusantium mollitia sed provident animi in corporis ipsam quo soluta veniam quo recusandae consequuntur et perferendis aperiam ab aliquid consequatur.";
const aboutstarting = "33 rerum aliquam a quia facere vel sint libero et pariatur nulla et quia inventore et distinctio mollitia in atque animi. Non dolore reiciendis ut autem architecto est expedita totam rem autem eaque non officiis facere sed consequatur repellat. 33 repudiandae harum nam ducimus obcaecati non quia laboriosam? Non quod amet aut alias nihil et voluptatum aperiam qui dolores distinctio.";
const contactstarting = "Et nostrum dicta eos laborum consequatur 33 molestias voluptatum est temporibus internos est iure ipsam et odio itaque. Hic ducimus omnis et porro labore aut magni aspernatur quo consequuntur quae. Non explicabo voluptatem qui magnam alias et fugit dolor aut recusandae esse aut necessitatibus omnis ad iste adipisci est deleniti veniam. Quo magni iste et repellat eligendi eum assumenda quod aut laborum galisum ea ullam dolorem ut dolorem reiciendis.";

const url = process.env.MONGODB_URL;
try {
    mongoose.connect(url);
    console.log("Successfully connected");
} catch (error) {
    console.log(error);
}

const blogSchema = new mongoose.Schema({
    "title" : String,
    "body" : String
})

const Blog = mongoose.model('blog', blogSchema);

const defaultblog = new Blog({
    title: "Test 1",
    body: "psum dolor sit amet. Sed laborum dolorem qui cdcsdvvrevd savrsbv tesb"
})

// defaultblog.save();

app.get('/', function(req, res){
    Blog.find()
    .then((blogs) => {
        res.render('home',{
            "starting" : homestarting,
            "blogs" : blogs
        });
    })
    .catch(err => console.log(err));    
})

app.get('/posts/:postTitle', async function(req, res){
    const btitle = req.params.postTitle;
    
    await Blog.findOne({title: btitle})
    .then((blog) => {
        res.render('post', {
            blogTitle : blog.title,
            blogContent : blog.body
        })
    })
    .catch((err) => {
        res.status(500).send("Internal Server Error!")
        console.log(err);
    })       
})

app.post('/delete', async function(req, res){
    
    const btitle = req.body.title;
    await Blog.deleteOne({title: btitle})
    .then(() => {
        console.log("Blog deleted");
    })
    .catch((err) => {
        res.status(500).send("Internal Server error");
        console.log(err);
    })
    
    res.redirect('/');
})

app.get('/about', function(req, res){
    res.render('about',{
        "aboutStart" : aboutstarting
    })
})

app.get('/contact', function(req, res){
    res.render('contact',{
        "contactStart" : contactstarting
    })
})

app.get('/compose', function(req, res){
    res.render('compose');
})

app.post('/compose', async function(req, res){    
    const blog = new Blog({
        title: req.body.postTitle,
        body: req.body.postContent
    })
    await blog.save();

    res.redirect('/');
})

app.listen(port, function(req, res){
    console.log(`Server up and running on port ${port}`);
})