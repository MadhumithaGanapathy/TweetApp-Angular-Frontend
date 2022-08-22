import { Component, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../api-service/auth.service';
import { ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSidenavModule } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  
  currentUser: User;
  
  constructor(private authService:AuthService,private router:Router,private observer: BreakpointObserver) {}

  loginId=sessionStorage.getItem("loginId");
  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('login');
    }
    this.currentUser = this.authService.getCurrentUser();
  }

  ngAfterViewInit() {
    this.observer.observe([]).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.open();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.close();
      }
    });
  }

  doLogOut()
  {
    console.log("--------Iniside Logout Method--------------");
    this.authService.setCurrentUser(null);
 
    this.router.navigateByUrl('/');
    
  }
}
