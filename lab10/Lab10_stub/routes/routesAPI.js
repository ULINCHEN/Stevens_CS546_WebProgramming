//require express, express router and bcrypt as shown in lecture code
const express = require('express');
const router = express.Router();
const { createUser, checkUser } = require('../data');
const { usernameValidation, passwordValidation } = require('../helpers');

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    if (!req.session.AuthCookie) {
      res.render('userLogin');
    }
    else {
      res.redirect('/protected');
    }
  })

router
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
    if (!req.session.AuthCookie) {
      res.render('userRegister');
    }
    else {
      res.redirect('/protected');
    }
  })
  .post(async (req, res) => {
    //code here for POST
    const username = req.body.username;
    const password = req.body.password;

    try {
      if (!username || !password) throw "username or password is empty"
      await createUser(username, password);
      res.redirect('/');
    }
    catch (e) {
      console.log(e);
      res.status(400).render('userRegister', { errorMsg: e });
    }

  })

router
  .route('/login')
  .post(async (req, res) => {
    //code here for POST
    let username = req.body.username;
    let password = req.body.password;

    try {
      if (!username || !password) throw "username or password is empty"
      const val = await checkUser(username, password);
      username = usernameValidation(username);
      if (val.authenticatedUser == true) {
        req.session.AuthCookie = username;
        res.redirect('/protected');
      } else {
        throw "Invalid User"
      }

    }
    catch (e) {
      console.log(e);
      res.status(400).render('userLogin', { errorMsg: e });
    }
  })

router
  .route('/protected')
  .get(async (req, res) => {
    //code here for GET
    res.render('private', {
      username: req.session.AuthCookie
    });
  })

router
  .route('/logout')
  .get(async (req, res) => {
    //code here for GET
    req.session.destroy();
    res.render('logout');
  })


module.exports = router;