import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class BlogService {
  options;
  constructor(private _authService: AuthService,
              private _http: Http
             ){}
  domain = this._authService.domain;
  createAuthenticationHeaders(){
    this._authService.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this._authService.authToken
      })
    })
  }
  newBlog(blog){
    this.createAuthenticationHeaders();
    return this._http.post(this.domain + '/blogs/newBlog', blog, this.options)
              .map((res:Response) => res.json())
  }
  getAllBlogs(){
    this.createAuthenticationHeaders();
    return this._http.get(this.domain + '/blogs/allBlogs', this.options)
                     .map((res:Response) => res.json())
  }
  getSingleBlog(id){
    this.createAuthenticationHeaders();
    return this._http.get(this.domain + '/blogs/singleBlog/' + id, this.options)
              .map((res:Response)=> res.json())
  }
  updateBlog(blog){
    this.createAuthenticationHeaders();
    return this._http.put(this.domain + '/blogs/updateBlog', blog, this.options)
              .map((res:Response) => res.json())
  }
  deleteBlog(id){
    this.createAuthenticationHeaders();
    return this._http.delete(this.domain + '/blogs/deleteBlog/' + id, this.options)
              .map((res:Response) => res.json())
  }
  likeBlog(id){
    this.createAuthenticationHeaders();
    const blogData={id:id};
    return this._http.put(this.domain + '/blogs/likeBlog', blogData, this.options)
                     .map(res => res.json())
  }
  dislikeBlog(id){
    this.createAuthenticationHeaders();
    const blogData={id:id};
    return this._http.put(this.domain + '/blogs/dislikeBlog', blogData, this.options)
                     .map(res => res.json())
  }
  postComment(blogComment){
    this.createAuthenticationHeaders();
    return this._http.post(this.domain + '/blogs/comment', blogComment, this.options)
                     .map(res => res.json())
  }
}
