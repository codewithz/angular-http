import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  baseUrl:string="https://ng-http-cwz-default-rtdb.firebaseio.com/"

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    console.log(postData);
    let url=this.baseUrl+'posts.json'
    this.http.post(url,postData)
    .subscribe(
      ((responseData)=>{
        console.log(responseData)
      }
    ))
  }

  onFetchPosts() {
     let url=this.baseUrl+"posts.json"
     this.http.get(url).
     pipe(
       map((responseData:{[key:string]:Post})=>{
         const postArray:Post[]=[];
         for(const key in responseData){
           postArray.push({...responseData[key],id:key})
         }
         return postArray;
       })
     ).
     subscribe(
       //.....
       (posts)=>{
         console.log(posts)
       }
     )
  }

  onClearPosts() {
    // Send Http request
  }
}
