import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-delete-blog',
  templateUrl: './delete-blog.component.html',
  styleUrls: ['./delete-blog.component.scss']
})
export class DeleteBlogComponent implements OnInit {
  messageClass;
  message;
  blog;
  id;
  processing;
  constructor(private _location: Location,
              private _blogService: BlogService,
              private _route: ActivatedRoute,
              private _router: Router
             ) { }
  deleteBlog(){
    this.processing = true;
    this._blogService.deleteBlog(this.id).subscribe(data => {
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.processing = true;
          this._router.navigate(['blog'])
        }, 2000)
      }
    })
  }
  cancel(){
    this._location.back();
  }
  ngOnInit() {
    this._route.params.subscribe((params:Params) => {
      let id=params['id'];
      this.id=id
    })
    this._blogService.getSingleBlog(this.id).subscribe(data =>this.blog = data.blog)
  }

}
