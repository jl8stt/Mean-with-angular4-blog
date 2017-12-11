const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let emailLengthChecker = (email) => {
  if(!email){
    return false;
  } else {
    if(email.length < 5 || email.length > 30){
      return false
    } else {
      return true;
    }
  }
};

let validEmailChecker =(email) => {
  if(!email){
    return false
  } else {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    return regExp.test(email)
  }
}

const emailValidators = [
  {
  validator: emailLengthChecker,
  message: 'E-mail must be at least 5 characters but less than 30'
  },
  {
  validator: validEmailChecker,
  message: 'Must be a valid e-mail'
  }
]

let usernameLengthChecker = (username) => {
  if(!username){
    return false
  } else {
    if(username.length <5 || username.length >15){
      return false
    } else {
      return true
    }
  }
}

let validUsernameChecker = (username) => {
  if(!username){
    return false
  } else {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regExp.test(username)
  }
}

const usernameValidators = [
  {
    validator: usernameLengthChecker,
    message: 'Username must be at least 5 character and less than 15 characters'
  },
  {
    validator: validUsernameChecker,
    message: 'Username must be valid'
  }
]

let passwordLengthChecker = (password) => {
  if(!password){
    return false
  } else {
    if(password.length < 6 || password.length > 16){
      return false
    } else {
      return true
    }
  }
}

let validPasswordChecker = (password) => {
  if(!password) {
    return false
  } else {
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    return regExp.test(password)
  }
}

const passwordValidators = [
  {
    validator: passwordLengthChecker,
    message: 'Password must be at least 6 characters and less than 16 characters'
  },
  {
    validator: validPasswordChecker,
    message: 'Must be at least 1 uppercase, 1 lowercase, 1 number and 1 special character'
  }
]

const userSchema = new Schema({
  username: {type: String, required: true, unique: true, lowercase: true, validate: usernameValidators},
  email: {type: String, required: true, unique: true, lowercase: true, validate: emailValidators},
  password: {type: String, required: true, validate: passwordValidators }
});

userSchema.pre('save', function(next){
  if(!this.isModified('password'))
  return next();
  bcrypt.hash(this.password, null, null, (err, hash) => {
    if(err) return next(err);
    this.password = hash;
    next();
  })
})
//bcrypt-nodejs not support ()=>{}
userSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema )
