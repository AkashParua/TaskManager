const mongoose = require('mongoose') 
const Schema = mongoose.Schema 
const PostSchema = new Schema({Author: String, TaskName :String, TaskDetail : String , Priority: Number}) 
const Post = mongoose.model('Post', PostSchema) 
module.exports = Post 
