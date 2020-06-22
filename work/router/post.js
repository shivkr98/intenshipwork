const express = require('express')
const router = express.Router()
const passport = require('passport')
const passportconf = require('../passport')

const multerConfig = require("../configration/multer")


const PostController = require('../controller/post')



router.route('/createPost')
    .post(passport.authenticate('jwt' , { session: false}),multerConfig,PostController.createPost)

   
router.route('/myPost')
    .post(passport.authenticate('jwt' , { session: false}),PostController.myposts) 

router.route('/deletePost')
    .post(passport.authenticate('jwt' , { session: false}),PostController.deletePost)
    
router.route('/commentPost')
    .post(passport.authenticate('jwt' , { session: false}),PostController.commentPost)        


module.exports = router;    