import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 matching:boolean= true;
  signupForm!:FormGroup
  repeatPass: string | undefined;
  constructor(private formbuilder:FormBuilder, private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      firstname: this.formbuilder.control("", [
        Validators.required, 
        Validators.minLength(3), 
        Validators.pattern("[a-zA-Z]*")]),
      lastname:new FormControl("",  [
        Validators.required, 
        Validators.minLength(3), 
        Validators.pattern("[a-zA-Z]*")]),
      email:new FormControl("", [Validators.required, Validators.email]),
      password:new FormControl("", [Validators.required,
      Validators.minLength(6),
    Validators.maxLength(15)]),
    confirmpwd: new FormControl("",[Validators.required])
    },[MustMatch("password", "confirmpwd")])
    
  }
  validatepwd(){
    if( this.Password.value == this.Confirmpwd.value){
      this.matching= false;
       
    }
    else{
      this.matching= true;
      this.repeatPass= 'inline'
    }
  }

  //creating user


  signUp(){
    this.validatepwd();
    console.log(this.signupForm.get("firstname"));
   this.http.post<any>("http://localhost:3000/signup", this.signupForm.value).subscribe(res=>{
    alert("Registered Successfully");
    
    this.router.navigateByUrl('/dashboard')
   },
   err=>{
    alert("something went wrong")
   })
  }

  get FirstName():FormControl{
    return this.signupForm.get('firstname') as FormControl;
  }

  get LastName():FormControl{
    return this.signupForm.get('lastname') as FormControl;
  }
  get Email():FormControl{
    return this.signupForm.get('email') as FormControl;
  }

  get Password():FormControl{
    return this.signupForm.get('password') as FormControl;
  }

  get Confirmpwd():FormControl{
    return this.signupForm.get('confirmpwd') as FormControl;
  }

}
export function MustMatch(_password: string, _confirmpwd: string) {
  return function (form: AbstractControl){
    const pwd= form.get(_password)?.value
    const cpwd= form.get(_confirmpwd)?.value

    if(pwd === cpwd){
      return null;
    }
    return {passwordMisMatchError: true}
    
  }
}

