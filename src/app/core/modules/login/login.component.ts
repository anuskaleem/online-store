import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { Subject, retry, takeUntil } from 'rxjs';
import { UsersLoginData } from '../../data/login.Interface';
import { appConstants } from 'src/app/constants/appConstants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public isAdmin: boolean = false;
  readonly appConstants = appConstants;
  isLoggedIn: boolean = false;
  destroyed$ = new Subject();
  loginUserData: UsersLoginData = {"users": []};
  message: string = "";


  constructor(
    public commonService: CommonService
  ){}


  ngOnInit(): void {
    
  }

  loginUser() {
    this.commonService.getUserLoginData().pipe(takeUntil(this.destroyed$), retry(3)).subscribe(
      (data: UsersLoginData) => {
        this.loginUserData = JSON.parse(JSON.stringify(data));
        const username = document.getElementById("username") as HTMLInputElement;
        const password = document.getElementById("password") as HTMLInputElement;
        let loggedInUser = this.loginUserData.users.find((user) => user.username == username.value);
        if(!password.value && !username.value) {
          alert("Please enter Username and Password");
        }
        else if(!username.value) {
          alert("Please enter Username");
        }
        else if(!password.value) {
          alert("Please enter Password");
        }
        else{
          if(loggedInUser) {
            if(password.value == loggedInUser.password) {
              this.isLoggedIn = true;
              this.isAdmin = loggedInUser.userType == appConstants.ADMIN_USER_TYPE;
            }
            else {
              this.isLoggedIn = false;
              this.isAdmin = false;
              alert("Invalid Credentials");
            }
          }
          else {
            alert("Invalid Credentials");
          }
        }
      },
      (error)=>{
        console.log(error)
      }
    );
  }
  logout() {
    this.isLoggedIn = false;
    this.isAdmin = false;
  }
}
