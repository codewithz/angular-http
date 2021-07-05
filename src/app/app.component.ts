import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching:boolean=false;

  baseUrl:string="https://ng-http-cwz-default-rtdb.firebaseio.com/"
  error=null;

  constructor(private http: HttpClient,
    private postService:PostService
    ) {

  }

  ngOnInit() {
   this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request

    this.postService.createPost(postData)
    
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
    this.deletePosts();
  }

  private fetchPosts(){
    this.isFetching=true;
    this.postService.getPosts()
    .subscribe(
     (posts)=>{
       this.isFetching=false;
       this.loadedPosts=posts;
     },
     (error)=>{
       this.error=error.message;
       console.log(error.message)
     }
 
    );
  }

  private deletePosts(){
    this.postService.deletePosts()
    .subscribe(
      ()=>{
        this.loadedPosts=[];
        this.isFetching=false;
      }
    )
  }
}
