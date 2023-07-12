const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

const homestarting = "Lorem ipsum dolor sit amet. Sed laborum dolorem qui aliquam voluptatem et accusantium aperiam ea incidunt provident et totam iusto sit repellat internos id reiciendis placeat. At atque dolor in autem voluptatum sed adipisci veniam et blanditiis quas et omnis impedit quo consectetur dolor. Et accusantium mollitia sed provident animi in corporis ipsam quo soluta veniam quo recusandae consequuntur et perferendis aperiam ab aliquid consequatur.";
const aboutstarting = "33 rerum aliquam a quia facere vel sint libero et pariatur nulla et quia inventore et distinctio mollitia in atque animi. Non dolore reiciendis ut autem architecto est expedita totam rem autem eaque non officiis facere sed consequatur repellat. 33 repudiandae harum nam ducimus obcaecati non quia laboriosam? Non quod amet aut alias nihil et voluptatum aperiam qui dolores distinctio.";
const contactstarting = "Et nostrum dicta eos laborum consequatur 33 molestias voluptatum est temporibus internos est iure ipsam et odio itaque. Hic ducimus omnis et porro labore aut magni aspernatur quo consequuntur quae. Non explicabo voluptatem qui magnam alias et fugit dolor aut recusandae esse aut necessitatibus omnis ad iste adipisci est deleniti veniam. Quo magni iste et repellat eligendi eum assumenda quod aut laborum galisum ea ullam dolorem ut dolorem reiciendis.";
const posts = [];

app.get('/', function(req, res){
    res.render('home',{
        "starting" : homestarting,
        "blogs" : posts
    });
})

app.get('/posts/:postTitle', function(req, res){
    posts.forEach((post)=>{
        if (_.lowerCase(req.params.postTitle) == _.lowerCase(post.title)){
            res.render('post',{
                "blogTitle" : post.title,
                "blogContent" : post.body
            })
        }        
    })           
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

app.post('/compose', function(req, res){
    const post = {
        title: req.body.postTitle,
        body: req.body.postContent
    };
    posts.push(post);
    res.redirect('/');
})

app.listen(process.env.PORT || 3000, function(req, res){
    console.log("Server up and running on port 3000");
})