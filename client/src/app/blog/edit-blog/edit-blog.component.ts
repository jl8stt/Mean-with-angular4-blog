import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {

  messageClass;
  message;
  processing;
  blog;
  id;
  constructor(private _location: Location,
              private _blogService: BlogService,
              private _route: ActivatedRoute,
              private _router: Router

             ) { }
  editFormSubmit(){
    this.processing = true;
    this._blogService.updateBlog(this.blog).subscribe(data => {
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
           this._router.navigate(['blog'])
        }, 2000)
       }
    })
  }
  cancel(){
    this._location.back();
  }
  ngOnInit() {
    this._route.params.subscribe((params:Params)=>{
        this.id = params['id']
    })

    this._blogService.getSingleBlog(this.id).subscribe(data => {
      if(!data.success){
        this.messageClass="alert alert-danger";
        this.message = data.message;
      } else {
          this.blog = data.blog
      }
    })
  }
}
