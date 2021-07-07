import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

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
