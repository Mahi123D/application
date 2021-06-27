import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../service/register.service';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userStatus: any;
  error: any;
  token: any;
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    });
  constructor(private formBuilder: FormBuilder, private route: Router, private regiService: RegisterService) { }

  ngOnInit() { 
  }

  submitForm(){

    if (this.loginForm.invalid) {
      return;
    }

    this.regiService.onLogin(this.loginForm.value).subscribe(res=>{
      console.log('res',res);
       this.userStatus = res;
      if(this.userStatus.statuscode == "200"){
        this.route.navigate(['/details']);
      }else{
        this.error= this.userStatus.message;
      }
    })
  }
}
