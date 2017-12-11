const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (router) => {
  router.post('/register', (req, res) => {
    if(!req.body.email){
      res.json({success: false, message: 'you must provide email'})
    } else {
      if(!req.body.username){
        res.json({success: false, message: 'you must provide username'})
      } else {
        if (!req.body.password){
          res.json({success: false, message: 'you must provide password'})
      } else {
        let user = new User ({
               email: req.body.email.toLowerCase(),
               username: req.body.username.toLowerCase(),
               password: req.body.password
           })
        user.save((err) =>{
           if(err){
              if(err.code===11000){
                res.json({success: false, message: 'username and password already exist'})
              } else {
                if (err.errors){
                  if(err.errors.email){
                    res.json({success:false, message:err.errors.email.message})
                  } else {
                    if(err.errors.username){
                      res.json({success:false, message:err.errors.username.message})
                    } else {
                      if(err.errors.password){
                        res.json({success:false, message:err.errors.password.message})
                      } else {
                        res.json({success: false, message: 'could not save user. Error', err})
                      }
                    }
                  }
                } else {
                  res.json({success: false, message: 'could not save user. Error', err})
                }
              }
          } else {
            const token = jwt.sign(
              {userId: user._id}, config.secret, {expiresIn: '24h'}
            )
            res.json({success: true, message: 'user saved!', token:token, user:{username: user.username}})
          }
        })
      }
      }
    }
  })
  router.get('/checkEmail/:email', (req, res) => {
    if(!req.params.email){
      res.json({success: false, message: 'E-mail wasn\'t provided'})
    } else {
      User.findOne({email:req.params.email}, (err, user) => {
        if(err){
          res.json({success: false, message: err})
        } else {
          if(user){
            res.json({success: false, message: 'E-mail already exist'})
          } else {
            res.json({success:true, message: 'E-mail is available'})
          }
        }
      })
    }
  })
  router.get('/checkUsername/:username', (req, res) => {
    if(!req.params.username){
      res.json({success: false, message: 'Username wasn\'t provided'})
    } else {
      User.findOne({username:req.params.username}, (err, user) => {
        if(err){
          res.json({success: false, message: err})
        } else {
          if(user){
            res.json({success: false, message: 'Username already exist'})
          } else {
            res.json({success:true, message: 'Username is available'})
          }
        }
      })
    }
  })
  router.post('/login', (req, res) => {
    if(!req.body.username){
      res.json({success:false, message:'no username is provided'})
    } else {
      if(!req.body.password){
        res.json({success:false, message:'no password is provided'})
      } else {
        User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
          if(err){
            res.json({success:false, message: err})
          } else {
            if(!user){
              res.json({success:false, message:'username not found'})
            } else {
              const validPassword = user.comparePassword(req.body.password);
              if(!validPassword){
                res.json({success:false, message:'password invalid'})
              } else {
                const token = jwt.sign(
                  {userId:user._id}, config.secret, {expiresIn:'24h'}
                );
                res.json({success:true, message:'success!', token:token, user: {username:user.username}})
              }
            }
          }
        })
      }
    }
  })
  router.use((req, res, next) => {
    const token = req.headers['authorization'];
    if(!token){
      res.json({success: false, message: 'no token provided'})
    } else {
      jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
          res.json({success: false, message: 'token invalid' + err})
        } else {
          decodedToken = decoded;
          next()
        }
      })
    }
  });
  router.get('/profile', (req, res) => {
//    res.send(decodedToken);
    User.findOne({_id: decodedToken.userId}).select('username email')
        .exec((err, user) => {
          if(err){
            res.json({success: false, message: err})
          } else {
            if(!user){
              res.json({success:false, message:'user not found'})
            } else {
              res.json({success:true, user:user})
            }
          }
    })
  })
  router.get('/publicProfile/:username', (req, res) => {
    if(!req.params.username){
      res.json({success:false, message:'username not found'})
    } else {
      User.findOne({username: req.params.username}).select('username email').exec((err, user) => {
        if(err){
          res.json({success:false, message: err})
        } else {
          if(!user){
            res.json({success:false, message:'user not found'})
          } else {
            res.json({success:true, message: 'success', user:user})
          }
        }
      })
    }
  })
  return router;
}
