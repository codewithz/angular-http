import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup=new FormGroup({});

  constructor(private formBuilder:FormBuilder,private http:HttpClient,
    private authService:AuthService) {

   }

  ngOnInit(): void {

    this.form=this.formBuilder.group({
        email:'',
        password:''
    })
  }

  submitForm(){
    console.log(this.form.getRawValue());
    let body=this.form.getRawValue();
    let url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyASd5_TOs46U0s-iq_hoEoNaHPuH5cDoLM"
    
    this.http.post(url,{...body,returnSecureToken:true}).
    subscribe(
      (responseData)=>{
        console.log(responseData)
        this.authService.setToken(responseData['idToken']);
      },
      (error)=>{
        this.authService.setToken('blank')
      });

  }

}
