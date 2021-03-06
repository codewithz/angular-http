import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import {map} from 'rxjs/operators'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl:string="https://ng-http-cwz-default-rtdb.firebaseio.com/"

  headers=new HttpHeaders({'custom-header':'xyz'}).
              append('header-1','zartab').
              append('header-2','nakhwa');
  

  constructor(private http:HttpClient,private authService:AuthService) {

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
    return  this.http.get<{[key:string]:Post}>(url,{
      params:new HttpParams().set('auth',this.authService.token),
      headers:this.headers
    }).
     pipe(
       map((responseData)=>{
         const postArray:Post[]=[];
         for(const key in responseData){
           postArray.push({...responseData[key],id:key})
         }
         return postArray;
       })
     );
  }

  deletePosts(){
    let url=this.baseUrl+"posts.json"
    return this.http.delete(url)
  }
}
