const JWT = require('jsonwebtoken')



const Post  = require('../model/post')
const User = require('../model/users')


const cloud = require("../cloudinary")
const fs = require("fs")

const multer = require("multer")

const {JWT_SECRET} = require('../configration/index') 

const passport = require('passport')
const passportconf = require('../passport')


var jwt_Decode = require('jwt-decode');
var url = require('url')








module.exports = {


    createPost : async function (req ,res) {

        const {
            title , body
        } =req.body;

        createdAt = new Date()

        const token = req.headers['authorization'];

        var decoded = jwt_Decode(token);
        _id = decoded.sub.i
        console.log(_id)
        const user = await User.findById(_id)
        console.log(user)

       // photo
       
       const result = await cloud.uploads(req.files[0].path)
       photo = result.url
      

        const post = new Post({
            title,
            body,
            photo,
            postedBy : user.email,
            createdAt
        })
        post.save().then(results => {
            res.json(
                    { post : results }
                )
        }).catch(
            err => console.log(err))
        

    },

    myposts: async (req ,res)=>{

        const token = req.headers['authorization'];

        var decoded = jwt_Decode(token);
        _id = decoded.sub.i;
        console.log(_id)

        const user = await User.findById(_id)
        console.log(user)

        const post = await Post.find({postedBy :user.email })

        if(post.length == 0){
            res.json({
                message : "no post "
            })
        }else{
            res.json({post: post})
        
        
        }
}, 

    deletePost: async (req ,res)=>{

        var {_id} = req.body;

        const token = req.headers['authorization'];

        var decoded = jwt_Decode(token);
        id = decoded.sub.i;
        console.log(id)

        const user = await User.findById(id)
        console.log(user)

        email = user.email;

        const post = await Post.findById(_id)
        console.log(post)

        postemail = post.postedBy
        console.log(postemail)
        console.log(email)

        if(postemail == email){

           await Post.findOne({_id : _id } , function(err ,post) {
               post.isActive = false
               post.save()
               res.json({message : "post deleted succesfully"})
           })



        }else{
            res.json({message : "you are not authorized to delete this post"})
        }
    },

    commentPost :async (req,res)=>{

        var {_id, text} = req.body;

        const token = req.headers['authorization'];

        var decoded = jwt_Decode(token);
        id = decoded.sub.i;
        console.log(id)

        const user = await User.findById(id)
        console.log(user)

        email = user.email;
        name = user.firstName+ " " + user.lastName;
        console.log(name)


        const comment ={
            text,
            postedBy : name,
        }

        console.log(comment)

       const post =await Post.findById(_id)
       console.log(post)

        comments = post.comments
        
        comments.push(comment)

        await Post.findOne({_id : _id } , function(err ,post) {
            post.comments = comments
            post.save()
            res.json({message : post})
        })


    }


}