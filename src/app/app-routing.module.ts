import { PostTweetComponent } from './post-tweet/post-tweet.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginUserComponent } from './login-user/login-user.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPassword } from './models/forgotPassword';
import { TweetListComponent } from './tweet-list/tweet-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { JwtGuard } from './api-service/jwt.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [

{
  path:"",
  redirectTo:"/login",
  pathMatch:"full"
},
{
  path:"login",
  component:LoginUserComponent
},
{
  path:"login/register",
  redirectTo:"register",
  pathMatch:"full"
},
{
  path:"register",
  component:RegisterUserComponent
},
{
  path:"login/forgotpassword",
  redirectTo:"forgotpassword",
  pathMatch:"full"
},
{
  path:"forgotpassword",
  component:ForgotPasswordComponent
},
{
  path:'home',
  component:MenuBarComponent,
  canActivate:[JwtGuard],
  children:
  [
    {
      path:"",
      component:TweetListComponent,
      canActivate:[JwtGuard]
    },
    {
      path:"tweets/all",
      component:TweetListComponent,
      canActivate:[JwtGuard]

    },
    {
      path:"logout",
      redirectTo:"/login",
      pathMatch:"full"
    },
    {
      path:"user-list",
      component:UserListComponent,
      canActivate:[JwtGuard]
    },
    {
      path:"passwordReset/:loginId",
      component:ResetPasswordComponent,
      canActivate:[JwtGuard]
    },
    {
      path:"posttweet",
      component:PostTweetComponent,
      canActivate:[JwtGuard],
      
     
    }
  ]
},

{
path:"home/posttweet/nav",
component:MenuBarComponent,
canActivate:[JwtGuard],
children:[
  { 
    path:"" , 
    component: TweetListComponent,
    canActivate:[JwtGuard],
  },
  {
    path:"tweets/:loginId",
    component: TweetListComponent,
    canActivate:[JwtGuard],
  },
  {
    path: "logout",
    redirectTo:"/login",
    pathMatch:"full"
    
  },
  { 
    path: 'user-list', 
    component: UserListComponent,
    canActivate:[JwtGuard],
  },
  { 
    path: 'passwordReset/:loginId', 
    component: ResetPasswordComponent,
    canActivate:[JwtGuard],
  }
]
},
{
  path:"home/user-list/nav",
  component:MenuBarComponent,
  canActivate:[JwtGuard],
  children:
  [

  { 
        path:"" , 
        component: TweetListComponent,
        canActivate:[JwtGuard],
      },
      {
        path:"tweets/:loginId",
        component: TweetListComponent,
        canActivate:[JwtGuard],
      },
      {
        path: "logout",
        redirectTo:"/login",
        pathMatch:"full"
        
      },
      { 
        path: 'user-list', 
        component: UserListComponent,
        canActivate:[JwtGuard],
      },
      { 
        path: 'passwordReset/:loginId', 
        component: ResetPasswordComponent,
        canActivate:[JwtGuard],
      },
      {
        path:'user-list/nav/tweets/:loginId',
        component:TweetListComponent,
      }
    ]},
   
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
