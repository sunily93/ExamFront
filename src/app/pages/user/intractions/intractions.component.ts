import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-intractions',
  templateUrl: './intractions.component.html',
  styleUrls: ['./intractions.component.css']
})
export class IntractionsComponent implements OnInit {

  qId:any;
  quiz:any;

  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private router:Router) { }

  ngOnInit(): void {
   this.qId= this._route.snapshot.params.qid;
    
   this._quiz.getSingleQuize(this.qId).subscribe(
     (data:any)=>{
      this.quiz=data;
     },
     (error)=>{
       Swal.fire('Error','Error Loading data','error');
     }
   );
  }


  startQuiz()
  {
    Swal.fire(
      {
        title:'Do you want to start the quiz?',
        showCancelButton:true,
        confirmButtonText:'Start',
        icon:'info'
      }
    ).then((result)=>{
      if(result.isConfirmed)
      {
        this.router.navigate(['/start/'+this.qId]);
      }else if(result.isDenied){
        Swal.fire('Change Not save','','info');
      }
    });
  }

}
