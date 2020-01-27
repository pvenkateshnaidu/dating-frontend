import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content = '';

  constructor(private userService: UserService) { }
users:any;
  ngOnInit() {
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
