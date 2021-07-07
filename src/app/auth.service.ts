import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token:string='';

  constructor() { 

  }

  setToken(token:string){
    this.token=token;
    console.log('Service:'+this.token);
  }
}
