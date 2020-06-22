const express = require('express')
const router = express.Router()
const passport = require('passport')
const passportconf = require('../passport')


const UserController = require('../controller/users')

router.route('/signup')
    .post(UserController.signup)

router.route('/signin')
    .post(passport.authenticate('local' , {session: false}),UserController.signin)

    // here we hold the token
router.route('/secret')
    .get(passport.authenticate('jwt' , { session: false}),UserController.secret)




module.exports = router;