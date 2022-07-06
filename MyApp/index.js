const express = require('express') 
const path = require('path') 
const app = express() 
const ejs = require('ejs') 
const mongoose = require('mongoose') 
const bodyParser = require('body-parser') 
app.use(express.static('Assets')) 
app.set('view engine','ejs') 
app.listen(3000,()=>{console.log( )}) 
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: false })) 
const Post = require(path.resolve(__dirname, './Models/Post.js')) 
const User = require(path.resolve(__dirname, './Models/User.js')) 