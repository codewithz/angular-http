import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl:string="https://ng-http-cwz-default-rtdb.firebaseio.com/"

  constructor(private http:HttpClient) {

   }

  createPost(postData:Post){
    console.log(postData);
    let url=this.baseUrl+'posts.json'
    this.http.post<{name:string}>(url,postData)
    .subscribe(
      ((responseData)=>{
        console.log(responseData)
      }
    ))
  }

  getPosts(){
 
    let url=this.baseUrl+"posts.json"
     this.http.get<{[key:string]:Post}>(url).
     pipe(
       map((responseData)=>{
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
}
