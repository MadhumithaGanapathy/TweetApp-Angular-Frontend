import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UpdateTweetComponent } from './update-tweet/update-tweet.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DateAgoPipe } from './date-service/date-ago.pipe';
import { TweetListComponent } from './tweet-list/tweet-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TokenInterceptor } from './api-service/TokenInterceptor';
import { ErrorInterceptor } from './api-service/ErrorInterceptor';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { PostTweetComponent } from './post-tweet/post-tweet.component';
@NgModule({
  declarations: [
    AppComponent,
   
    UpdateTweetComponent,
    ForgotPasswordComponent,
    MenuBarComponent,
    RegisterUserComponent,
    ResetPasswordComponent,
    DateAgoPipe,
    TweetListComponent,
    UserListComponent,
    LoginUserComponent,
    PostTweetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
