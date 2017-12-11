import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators}  from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  messageClass;
  message;
  newPost = false;
  loadingBlogs = false;
  processing;
  username;
  allBlogs;
  newComment = [];
  enabledComments = [];

  constructor(private _formBuilder: FormBuilder,
              private _blogService: BlogService,
              private _authService: AuthService
             ) { }
  newBlogForm(){
    this.newPost = true;
  }
  reloadBlogs(){
    this.loadingBlogs = true;
    this.getAllBlogs();
    setTimeout(() => {
      this.loadingBlogs = false;
    }, 4000)
  }
  blogForm = this._formBuilder.group({
    title:['', [Validators.required, Validators.minLength(5), Validators.maxLength(30), this.alphaNumericValidation]],
    body:['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
  })
  alphaNumericValidation(controls){
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/)
    if(regExp.test(controls.value)){
      return null
    } else {
      return {alphaNumericValidation: true}
    }
  }
  disableblogForm(){
    this.blogForm.controls['title'].disable();
    this.blogForm.controls['body'].disable()
  }
  enableblogForm(){
    this.blogForm.controls['title'].enable();
    this.blogForm.controls['body'].enable()
  }

  blogSubmit(value){
    this.processing = true;
    const blog = {
      title: value.title,
      body: value.body,
      createdBy: this.username
    };
    this._blogService.newBlog(blog).subscribe(data => {
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableblogForm()
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.getAllBlogs();
        setTimeout(() => {
          this.newPost = false;
          this.processing = false;
          this.message = false;
          this.blogForm.reset();
          this.enableblogForm()
        },2000)
        //reset() will remove the old input in blogForm
        //this.message = false; clean the message alert
       // setTimeout 2000 means delay 2 second to execute the command
       //setInterval 2000 means execute command every 2 second
      }
    })
  }
  goBack(){
    window.location.reload();
  }
  getAllBlogs(){
    this._blogService.getAllBlogs().subscribe(data => {
      this.allBlogs = data.blogs
    })
  }
  likeBlog(id){
    this._blogService.likeBlog(id).subscribe(data => {
      this.getAllBlogs()
    })
  }
  dislikeBlog(id){
    this._blogService.dislikeBlog(id).subscribe(data => {
      this.getAllBlogs()
    })
  }
  ngOnInit() {
    this.reloadBlogs();
    this._authService.getProfile().subscribe(data => this.username=data.user.username)
  }
  commentForm = this._formBuilder.group({
    comment: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]]
  })
  enableCommentForm(){
    this.commentForm.get('comment').enable();
  }
  disableCommentForm(){
    this.commentForm.get('comment').disable();
  }

  draftComment(id){
    this.newComment = [];
    this.newComment.push(id);
  }
  postComment(id, value){
    this.processing = true;
    this.disableCommentForm();
    const blogComment = {
      id: id,
      comment: value.comment
    }
    this._blogService.postComment(blogComment).subscribe(data => {
       this.getAllBlogs();
       const index = this.newComment.indexOf(id);
       this.newComment.splice(index, 1);
       this.enableCommentForm();
       this.processing = false;
       this.commentForm.reset();
       if(this.enabledComments.indexOf(id)<0){
         this.expand(id);
       }
    })
  }
  expand(id){
    this.enabledComments.push(id)
  }
  collapse(id){
    const index = this.enabledComments.indexOf(id);
    this.enabledComments.splice(index, 1)
  }
  cancel(id){
    const index = this.newComment.indexOf(id, 0);
    this.newComment.splice(index, 1);
    this.commentForm.reset();
    this.enableCommentForm();
    this.processing = false
  }

}
