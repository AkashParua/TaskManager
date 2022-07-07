const express = require('express') 
const path = require('path') 
const app = express() 
const md5 = require('md5')
const ejs = require('ejs') 
const mongoose = require('mongoose') 
const bodyParser = require('body-parser') 
const { sign } = require('crypto')
const { findById } = require('./Models/User')
app.use(express.static('Assets')) 
app.set('view engine','ejs') 
app.listen(3000,()=>{console.log('connected to port 3000')}) 
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 
const Post = require(path.resolve(__dirname, './Models/Post.js')) 
const User = require(path.resolve(__dirname, './Models/User.js')) 
mongoose.connect('mongodb://0.0.0.0/DataBase_TS',{useNewUrlParser:true})
app.get('/',(req,res)=>{res.render('homepage')})
app.get('/signin',(req,res)=>{res.render('signin')})
app.post('/newuser',async (req,res)=>{
      var name =await req.body.username           //storing the hashed input for safety 
      var password = await md5(req.body.password)     //storing the hashed input for safety
      var Users = await User.find({Name:name})        //searching whether same Name exists
      if(Users.length != 0)                            //if the seach is not empty then the name already exists 
      {
        res.send('The username is taken')
      }else{
      User.create({Name : name , Password : password},(error,User)=>{console.log(error)}) //empty Array will contain id of the posts
      res.redirect('/')}
      }
)
//note : calling another callback within async function casues error
app.get('/login',(req,res)=>{res.render('login')})
//using dynamic url to go to respective posts
app.post('/login/authenticate',async (req,res)=>{
    var name = await req.body.username
    var password = await md5(req.body.password)
    var Users = await User.find({Name:name,Password:password})
    if(Users.length == 0)
    {
        res.send('Invalid creds ,Log in to create account')
    }else{
         res.redirect(`/tasks/${Users[0].id}`)
    }
})
app.get('/tasks/:id',async (req,res)=>{
var AuthorId = req.params.id
var userPosts = await Post.find({Author:AuthorId})
res.render('tasks',{userPosts,AuthorId})
}
)

app.post('/tasks/:id/add',async (req,res)=>{

    var AuthorId = req.params.id         //author id is stored
    var title = req.body.task
    var description = req.body.desc
    var priority = req.body.prior
    await Post.create({Author:AuthorId,TaskName:title,TaskDetail:description,Priority:priority},(err,Post)=>{console.log(Post)})
    res.redirect(`/tasks/${AuthorId}`)
})  
app.get('/tasks/:userId/delete/:postId',async(req,res)=>{
    var userid = req.params.userId
    var postid = req.params.postId
    await Post.findByIdAndDelete(postid)
    res.redirect(`/tasks/${userid}`)

})