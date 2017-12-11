const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Blog = require('../models/blog');

module.exports = (router) => {

   router.post('/newBlog', (req, res) => {
     if(!req.body.title){
       res.json({success:false, message:'blog title is requird'})
     } else {
       if(!req.body.body){
         res.json({success:false, message:'blog body is requird'})
       } else {
         if(!req.body.createdBy){
           res.json({success:false, message:'blog creator is requird'})
         } else {
           const blog = new Blog ({
                   title: req.body.title,
                   body: req.body.body,
                   createdBy: req.body.createdBy
                 });
            blog.save((err) => {
              if(err){
                if(err.errors){
                  if(err.errors.title){
                    res.json({success:false, message:err.errors.title.meassage})
                  } else {
                    if(err.errors.body){
                      res.json({success:false, message:err.erros.body.message})
                    } else {
                      res.json({success:false, message:err})
                    }
                  }
                } else {
                  res.json({success:false, message:err})
                }
              } else {
                res.json({success:true, message:'blog saved!'})
              }
            })
         }
       }
     }
   })
   router.get('/allBlogs', (req, res) => {
     Blog.find({}, (err, blogs) => {
       if(err){
         res.json({success:false, message: err})
       } else {
         if(!blogs){
           res.json({success:false, message: 'blogs not found'})
         } else {
           res.json({success:false, blogs: blogs})
         }
       }
     }).sort({'_id': -1})
   })
   //sort({'_id': -1}), put news blog on the top
   router.get('/singleBlog/:id', (req, res) => {
    if(!req.params.id){
       res.json({success:false, message:'id is not provided'})
     } else {
       Blog.findOne({_id: req.params.id}, (err, blog) => {
         if(err){
           res.json({success:false, message:'id not valid'})
         } else {
           if(!blog){
             res.json({success:false, message: 'blog not found'})
           } else {
             User.findOne({_id: decodedToken.userId}, (err, user) => {
               if(err){
                 res.json({success:false, message: err})
               } else {
                 if(!user){
                   res.json({success:false, message: 'user not found'})
                 } else {
                   if(user.username !==blog.createdBy){
                     res.json({success:false, message: 'You are not authorized to edit this blog'})
                   } else {
                     res.json({success:true, blog:blog})
                   }
                 }
               }
             })
            }
          }
       })
     }
   })
   router.put('/updateBlog', (req, res) => {
     if(!req.body._id){
       res.json({success:false, message: 'id not provided'})
     } else {
       Blog.findOne({_id:req.body._id}, (err, blog) => {
         if(err){
           res.json({success:false, message: err})
         } else {
           if(!blog){
             res.json({success:false, message: 'blog not found'})
           } else {
             User.findOne({_id: decodedToken.userId}, (err, user) => {
               if(err){
                 res.json({success:false, message: err})
               } else {
                 if(!user){
                   res.json({success:false, message: 'user not found'})
                 } else {
                   if(user.username !==blog.createdBy){
                     res.json({success:false, message: 'You are not authorized to edit this blog'})
                   } else {
                       blog.title = req.body.title;
                       blog.body = req.body.body;
                       blog.save((err) => {
                         if(err){
                           res.json({success:false, message: err})
                         } else {
                           res.json({success:true, message: 'blog is updated'})
                         }
                       });
                   }
                 }
               }
             })
           }
         }
       })
     }
   })
   router.delete('/deleteBlog/:id', (req, res) => {
     if(!req.params.id){
       res.json({success:false, message: 'id not provided'})
     } else {
       Blog.findOne({_id: req.params.id}, (err, blog) => {
         if(err){
           res.json({success:false, message: err})
         } else {
           if(!blog){
             res.json({success:false, message: 'blog not found'})
           } else {
             User.findOne({_id: decodedToken.userId}, (err, user) => {
               if(err){
                 res.json({success:false, message: err})
               } else {
                 if(!user){
                   res.json({success:false, message: 'user not found'})
                 } else {
                   if(user.username !==blog.createdBy){
                     res.json({success:false, message: 'you have no authorization to delete this blog'})
                   } else {
                     blog.remove((err) => {
                       if(err){
                         res.json({success:false, message: err})
                       } else {
                         res.json({success:true, message: 'blog successfully deleted'})
                       }
                     })
                   }
                 }
               }
             })
           }
         }
       })
     }
   })
   router.put('/likeBlog', (req, res) => {
     if(!req.body.id){
       res.json({success:false, message:'id not provided'})
     } else {
       Blog.findOne({_id: req.body.id}, (err, blog) => {
         if(err){
           res.json({success:false, message: err})
         } else {
           if(!blog){
             res.json({success:false, message: 'blog no found'})
           } else {
             User.findOne({_id: decodedToken.userId}, (err, user) => {
               if(err){
                 res.json({success:false, message: err})
               } else {
                 if(!user){
                   res.json({success:false, message: 'user not found'})
                 } else {
                   if(user.username === blog.createdBy){
                     res.json({success:false, message: 'can\'t like your own post'})
                   } else {
                     if(blog.likedBy.includes(user.username)){
                       res.json({success:false, message: 'you already like this post'})
                     } else {
                       if(blog.dislikedBy.includes(user.username)){
                         blog.dislikes --;
                         let index = blog.dislikedBy.indexOf(user.username, 0);
                         blog.dislikedBy.splice(index, 1);
                         blog.likes ++;
                         blog.likedBy.push(user.username);
                         blog.save((err) => {
                           if(err){
                             res.json({success:false, message: 'like can\'t save'})
                           } else {
                             res.json({success:true, message: 'like saved'})
                           }
                         })
                       } else {
                         blog.likes ++;
                         blog.likedBy.push(user.username);
                         blog.save((err) => {
                           if(err){
                             res.json({success:false, message: 'like can\'t save'})
                           } else {
                             res.json({success:true, message: 'like saved'})
                           }
                         })
                       }
                     }
                   }
                 }
               }
             })
           }
         }
       })
     }
   })
   router.put('/dislikeBlog', (req, res) => {
     if(!req.body.id){
       res.json({success:false, message:'id not provided'})
     } else {
       Blog.findOne({_id: req.body.id}, (err, blog) => {
         if(err){
           res.json({success:false, message: err})
         } else {
           if(!blog){
             res.json({success:false, message: 'blog no found'})
           } else {
             User.findOne({_id: decodedToken.userId}, (err, user) => {
               if(err){
                 res.json({success:false, message: err})
               } else {
                 if(!user){
                   res.json({success:false, message: 'user not found'})
                 } else {
                   if(user.username === blog.createdBy){
                     res.json({success:false, message: 'can\'t dislike your own post'})
                   } else {
                     if(blog.dislikedBy.includes(user.username)){
                       res.json({success:false, message: 'you already dislike this post'})
                     } else {
                       if(blog.likedBy.includes(user.username)){
                         blog.likes --;
                         let index = blog.likedBy.indexOf(user.username, 0);
                         blog.likedBy.splice(index, 1);
                         blog.dislikes ++;
                         blog.dislikedBy.push(user.username);
                         blog.save((err) => {
                           if(err){
                             res.json({success:false, message: 'dislike can\'t save'})
                           } else {
                             res.json({success:true, message: 'dislike saved'})
                           }
                         })
                       } else {
                         blog.dislikes ++;
                         blog.dislikedBy.push(user.username);
                         blog.save((err) => {
                           if(err){
                             res.json({success:false, message: 'dislike can\'t save'})
                           } else {
                             res.json({success:true, message: 'dislike saved'})
                           }
                         })
                       }
                     }
                   }
                 }
               }
             })
           }
         }
       })
     }
   })
   router.post('/comment', (req, res) => {
     if(!req.body.comment){
        res.json({success:false, message:'comment not provided'})
     } else {
       if(!req.body.id){
          res.json({success:false, message:'id npt provided'})
       } else {
         Blog.findOne({_id: req.body.id}, (err, blog) => {
           if(err){
              res.json({success:false, message: err})
           } else {
             if(!blog){
                res.json({success:false, message:'blog not found'})
             } else {
               User.findOne({_id: decodedToken.userId}, (err, user) => {
                 if(err){
                    res.json({success:false, message: err})
                 } else {
                   if(!user){
                      res.json({success:false, message: 'user not found'})
                   } else {
                     blog.comments.push(
                       {comment:req.body.comment, commentator: user.username}
                     )
                     blog.save((err) => {
                       if(err){
                          res.json({success:false, message: err})
                       } else {
                          res.json({success:true, message: 'comment saved!'})
                       }
                     });
                   }
                 }
               })
             }
           }
         })
       }
     }
   })
  return router
}
