import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  private roles: string[];

  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  isLog = false;
  isLoggedIn$: Observable<boolean>;
  constructor(private authService :AuthService,private tokenStorageService: TokenStorageService,private router: Router) { }

  ngOnInit() {
  
    this.isLoggedIn$ = this.authService.isLoggedIn;
 
    this.isLog = !!this.tokenStorageService.getToken();

    if (this.isLog) {

      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  logout() {
    this.tokenStorageService.signOut();
   this.authService.logout();
  }
 
  

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}
