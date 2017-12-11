const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

let titleLengthChecker = (title) => {
  if(!title){
    return false
  } else {
    if(title.length < 5 || title.length > 30){
      return false
    } else {
      return true
    }
  }
}

let alphaNumericTitleChecker = (title) => {
  if(!title){
    return false
  } else {
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/)
    return regExp.test(title)
  }
}

const titleValidators = [
  {
    validator: titleLengthChecker,
    message: 'title must be 5 characters more and 30 characters less'
  },
  {
    validator: alphaNumericTitleChecker,
    message: 'title must be alphanumeric'
  }
]
 let bodyLengthChecker = (body) => {
   if(!body){
     return false
   } else {
     if(body.length < 10 || body.length > 500){
       return false
     } else {
       return true
     }
   }
 }
const bodyValidators = [
  {
    validator:bodyLengthChecker,
    message: 'body must be 10 characters more and 500 characters less'
  }
]
 let commentLengthChecker = (comment) => {
   if(!comment){
     return false
   } else {
     if(comment.length < 10 || comment.length > 200){
       return false
     } else {
       return true
     }
   }
 }
 const commentValidators = [
   {
     validator: commentLengthChecker,
     message: 'comment must be 10 character more and 200 characters less'
   }
 ]

const blogSchema = new Schema({
  title:{type:String, required:true, validate:titleValidators},
  body:{type:String, required:true, validate:bodyValidators},
  createdBy: {type:String},
  createdAt: {type:Date, default:Date.now()},
  likes: {type:Number, default:0},
  likedBy: {type:Array},
  dislikes: {type:Number, default:0},
  dislikedBy: {type:Array},
  comments: [
    {
      comment: {type:String,  validate:commentValidators},
      commentator:{type:String}
    }
  ]
})

module.exports = mongoose.model('Blog', blogSchema)
