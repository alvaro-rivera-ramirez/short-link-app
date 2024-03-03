import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  formLogin=this.fb.group({
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
    password:['',[Validators.required,Validators.minLength(4)]]
  })

  ngOnInit() {}

  get email(){
    return this.formLogin.get("email");
  }
  get password(){
    return this.formLogin.get("password");
  }

  login(){
    console.log("login")
  }
}
