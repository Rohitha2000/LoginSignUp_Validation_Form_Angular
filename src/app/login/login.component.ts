import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm:any ;

  constructor(private formBuilder:FormBuilder, private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
   /* this.loginForm= this.formBuilder.group({
      email:[''],
      password:['']

    })  */

    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control("", [
        Validators.required, 
        Validators.minLength(3), 
        Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]),
        password:new FormControl("", [Validators.required,
          Validators.minLength(6),
        Validators.maxLength(15)])
  })}

  get Email(){
    return this.loginForm.get('email') as FormControl;
  }
  get Password():FormControl{
    return this.loginForm.get('password') as FormControl;
  }

  logindata(){
    this.http.get<any>("http://localhost:3000/signup").subscribe(res=>{
      const user= res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
      })
      if(user){
        alert("Login successfull")
        this.router.navigateByUrl('/dashboard')
      }
      else{
        alert("User Not Found !")
      }
    },
    err=>{
      alert("something went wrong")
    })
  }

}
