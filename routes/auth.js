 const express = require('express');
 const router = express.Router();
 const bcrypt = require('bcrypt-nodejs');

 const models = require('../models');

 // POST is register
 router.post('/register', (req, res) => {
     const login = req.body.login;
     const password = req.body.password;
     const passwordConfirm = req.body.passwordConfirm;

     if (!login || !password || !passwordConfirm) {
         const fields = [];
         if (!login) fields.push('login');
         if (!password) fields.push('password');
         if (!passwordConfirm) fields.push('passwordConfirm');

         res.json({
             ok: false,
             error: 'All fields is required',
             fields: fields
         });
     } else if (!/^[a-zA-Z0-9]+$/.test(login)) {
        res.json({
            ok: false,
            error: 'Only English charset',
            fields: ['login']
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
    } else if (password.lenght < 5) {
        res.json({
            ok: false,
            error: 'Min lenght password is 5 charset',
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
                        req.session.userId = user.id;
                        req.session.userLogin = user.login;
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

  // POST is login
  router.post('/login', (req, res) => {
    const login = req.body.login;
    const password = req.body.password;

    if (!login || !password) {
        const fields = [];
        if (!login) fields.push('login');
        if (!password) fields.push('password');

        res.json({
            ok: false,
            error: 'All fields is required',
            fields
        });
  } else {
      models.User.findOne({
          login
      }).then(user => {
        if (!user) {
            res.json({
                ok: false,
                error: 'Login or password in not valid',
                fields: ['login', 'password']
            });
        } else {
            // Load hash from your password DB.
            bcrypt.compare(password, user.password, function(err, result) {
                if (!result) {
                    res.json({
                        ok: false,
                        error: 'Login or password in not valid',
                        fields: ['login', 'password']
                    });
                } else {
                    req.session.userId = user.id;
                    req.session.userLogin = user.login;
                    res.json({
                        ok: true
                    })
                }
            }); 
        }
      }).catch(err => {
        console.log(err);
        res.json({
            ok: false,
            error: 'Error in Login proccess'
        });
    });
  }
});

// GET for logout
router.get('/logout', (req, res) => {
    if (req.session) {
        //delete session object
        req.session.destroy(() => {
            res.redirect('/');
        });
    } else {
        res.redirect('/');
    }
});

 module.exports = router;