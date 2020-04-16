import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
// const AUTH_API = 'http://springbootrestapi-env.mvmbkrpny3.ap-south-1.elasticbeanstalk.com/api/auth/';
const AUTH_API = 'http://localhost:5000/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
data:any;
  constructor(private http: HttpClient,private router:Router) { }

  get isLoggedIn() {
    if(sessionStorage.getItem("auth-token"))     
      this.loggedIn.next(true);
      return this.loggedIn.asObservable(); // {2}
 
  }
  login(credentials): Observable<any> {
   
   this.data= this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
    this.data.subscribe(
      res => {
         this.loggedIn.next(true);
      });
    return this.data;
  }

  register(user): Observable<any> {
  
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password,
      dob:user.dob,
      profilefor:user.profilefor,
      religion:user.religion,
      gender:user.gender,
      maritalStatus:user.maritalstatus,
      file:user.file

    }, httpOptions);
  }
  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
 
}
