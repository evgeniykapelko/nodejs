const express = require('express');
const bodyParser = require('body-parser');

const Post = require('./models/post');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res) => {
    Post.find({}).then(posts => {
        res.render('index', {posts: posts});
    });
});

app.get('/create', (req, res) => res.render('create'));
app.post('/create', (req, res) => {
    const { title, body } = req.body;
    
    Post.create({
        title: title,
        body: body
    }).then(post => console.log(post.id));

    res.redirect('/');
});

module.exports = app;