import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    content: string;
    users:any;
    responsive = true;
    cols = 1;
    data = [];
    page = 0;
    size = 6;

  constructor(private userService: UserService) { }
 
  ngOnInit() {
 
  
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = JSON.parse(data); 
          this.getData({pageIndex: this.page, pageSize: this.size});
  
      },
      err => {
        this.users = JSON.parse(err.error).message;
      }
    );
  }
  getData(obj) {
    let index=0,
        startingIndex=obj.pageIndex * obj.pageSize,
        endingIndex=startingIndex + obj.pageSize;

    this.data = this.users.filter(() => {
      index++;
      return (index > startingIndex && index <= endingIndex) ? true : false;
    });
  }
}
