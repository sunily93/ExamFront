import { validateVerticalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserserviceService } from 'src/app/services/userservice.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserserviceService, private snack:MatSnackBar) { }


  public user=
  {
     username:'',
     password:'',
     firstName:'',
     lastName:'',
     email:'',
     phone:''
  };

  ngOnInit(): void {
  }

  formSubmit()
  {
    //alert(this.user+"ahsh");
    if(this.user.username=='' || this.user.username==null)
    {
      //alert("User is required !!");
      this.snack.open("User name is required ","",{
        duration:3000,
      })

      return;
    }

    //validate

    //addUser
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        //success
        //alert(data+"ssssssssssss")
        //alert("success");
        // this.snack.open("User Save Successfully",'',{
        //   duration:3000
        // })
        Swal.fire('Success done !!','User id is '+data.id,'success');      
      },
      (error)=>{
        //error
        //alert("error");
        this.snack.open('Something went wrong !!','',{
          duration:3000,
        })
      }
    )

  }



}
