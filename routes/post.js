const express = require('express');
//const { models } = require('mongoose');
const router = express.Router();
const turndown = require('turndown');

const models = require('../models');
const TurndownService = require('turndown');

// GET for add
router.get('/add', (req, res) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;

    if (!userId || !userLogin) {
        res.redirect('/');
    } else {
        res.render('post/add', {
        user: {
           id: userId,
           login: userLogin
        }
    });
    }
});

// POST is add
router.post('/add', (req, res) => {
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;

    if (!userId || !userLogin) {
        res.redirect('/');
    } else {
        const title = req.body.title.trim().replace(/ +(?= )/g, '');
        const body = req.body.body;
        const turndownService = new TurndownService();

    if (!title || !body) {
        const fields = [];
        if (!title) fields.push('title');
        if (!body) fields.push('body');

        res.json({
            ok: false,
            error: 'All fields is required',
            fields: fields
        });
    } else if (title.lenght < 3 || title.lenght > 64) {
        res.json({
            ok: false,
            error: 'Lenght title or password is not valid.'
             + 'It will be from 3 to 64 charset and numbers.',
            fields: ['body']
        });
    } else if (body.lenght < 3 ) {
        res.json({
            ok: false,
            error: 'Lenght body or password is not valid.'
             + 'It will be from 3 charset and numbers.',
            fields: ['body']
        });
    } else {
        models.Post.create({
            title,
            body: turndownService.turndown(body),
            owner: userId
        }).then(post => {
            console.log(post)
            res.json({
                ok: true
            });
        }).catch(err => {
            console.log(err);
            res.json({
                ok: false
            });
        });      
    }
    }
});

module.exports = router;