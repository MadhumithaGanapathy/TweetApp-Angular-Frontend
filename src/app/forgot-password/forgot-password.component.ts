
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  NgForm
} from '@angular/forms';
import { AuthService } from '../api-service/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { ConfirmedValidator } from 'src/app/register-user/ConfirmedValidator';
import { ForgotPassword } from '../models/forgotPassword';
import { map} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TweetService } from '../api-service/tweet.service';
declare var $: any;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPassword: FormGroup;
  submitted: boolean = false;
  resetSubmitted: boolean = false;
  loading: boolean = false;
  invalid = false;
  resetPasswordForm: FormGroup;
  resetPasswordValue: string;
  passwordResetComplete: boolean = false;
  flag:boolean = false;
  f_user:string;
  userList:User[]=[];
  userFilter:string[]=[];

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private tweetService: TweetService,
    private router: Router
     )
     {}
  

  
     
  ngOnInit(): void {

    this.forgotPassword = this.formBuilder.group({
      loginId: ['', Validators.required],
      password: ['', [Validators.required,Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    },
    { 
      validator: ConfirmedValidator('password', 'confirmPassword')
    }
    
    );
    this.tweetService
    .getAllUsers()
    .subscribe((data: any) => (this.userList = data));
  }
     
  get f() {
    return this.forgotPassword.controls;
  }

  search_user() 
  {
    this.userFilter=[];
    this.userList.forEach(element =>
      {
          let temp = element.loginId;
          if(temp.toLowerCase()==this.f_user.toLowerCase())
          {
            this.userFilter.push(element.loginId);
          }
          if(this.userFilter.length > 0)
          {
            this.flag = false;
          }
          else
          {
            this.flag = true;
          }
      });
  }
  
  
  onSubmit() {
    console.log('Submitted');
    this.resetSubmitted = true;
    this.submitted = true;
    if (this.forgotPassword.invalid) {
      return;
    }
    let fp:ForgotPassword={
      password: this.f.password.value,
      confirmPassword: this.f.confirmPassword.value
    };
    this.loading = true;
    
    this.authService
      .forgotPassword(this.f.loginId.value,fp)
      .subscribe((data) => {
        this.loading=false;
        if (data=='Password has been reset successfully')
        {
        this.passwordResetComplete = true;
        this.submitted = false;
        this.router.navigateByUrl('login');
      }else {
        this.invalid = true;
        this.loading = false;
        this.passwordResetComplete = false;
      }});
      
  }

  

}
