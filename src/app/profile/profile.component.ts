import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  users:any;
  constructor(private token: TokenStorageService,private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = JSON.parse(data);
      },
      err => {
        this.users = JSON.parse(err.error).message;
      }
    );
  }
}

