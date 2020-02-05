import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  isLoggedIn$: Observable<boolean>;
  constructor(private authService :AuthService,private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
  
    this.isLoggedIn$ = this.authService.isLoggedIn;
 
   
  }
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

}
