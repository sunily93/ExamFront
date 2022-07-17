import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData={
    username:'',
    password:''
  };

  constructor(private snack:MatSnackBar,private login:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.loginData.username.trim()=='' ||this.loginData.username==null)
    {
      this.snack.open("User Name is required",'',{
        duration:3000,
      });
      return;
    }

    if(this.loginData.password.trim()=='' || this.loginData.password==null)
    {
      this.snack.open("Password is required",'',{
        duration:3000,
      })
    }

    //request server to genrate token
    this.login.genrateToken(this.loginData).subscribe(
      (data:any)=>{
       //login
       this.login.loginUser(data.token);
       this.login.getCurrentUser().subscribe(
         (user:any)=>{
           this.login.setUser(user);
           console.log(user);
           //redirect  ADMIN: admin-dashboard
            if(this.login.getUserRole()=="ADMIN")
            {
              this.router.navigate(['admin']);
              this.login.loginStatusSubject.next(true)
              //window.location.href='/admin';
            }else if(this.login.getUserRole()=="NORMAL"){
              //window.location.href='/user-dashboard';
              this.router.navigate(['user-dashboard/0']);
              this.login.loginStatusSubject.next(true);
            }else{
              this.login.logout();
            }
           //redirect  ADMIN: admin-dashboard
         }
       );
      },
      (error)=>{
          this.snack.open("Invalid Details try again",'',{
            duration:3000,
          })
      }
    )
  }
}
