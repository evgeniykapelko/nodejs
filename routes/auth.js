 const express = require('express');
 const router = express.Router();
 const bcrypt = require('bcrypt-nodejs');

 const models = require('../models');

 // POST is authorized
 router.post('/register', (req, res) => {
     const login = req.body.login;
     const password = req.body.password;
     const passwordConfirm = req.body.passwordConfirm;

     if (!login || !password || !passwordConfirm) {
         res.json({
             ok: false,
             error: 'All fields is required',
             fields: ['login', 'password', 'passwordConfirm']
         });
     } else if (login.lenght < 3 || login.lenght > 16) {
         res.json({
             ok: false,
             error: 'Lenght login or password is not valid.'
              + 'It will be from 3 to 16 charset and numbers.',
             fields: ['login']
         });
     } else if (password !== passwordConfirm) {
         res.json({
             ok: false,
             error: 'Password is not eq password confirm',
             fields: ['password', 'passwordConfirm']
         });
     } else {

        models.User.findOne({
            login
        }).then(user => {
            if (!user) {
                bcrypt.hash(password, null, null, (err, hash) => {
                    models.User.create({
                        login,
                        password: hash
                    }).then(user => {
                        console.log(user);
                        res.json({
                            ok: true
                        });
                    }).catch(err => {
                        console.log(err);
                        res.json({
                            ok: false,
                            error: 'Error'
                        });
                    });
                });
            } else {
                res.json({
                    ok: false,
                    error: 'Name is exists',
                    fields: ['login']
                });
            }
        })
     }
 });

 module.exports = router;