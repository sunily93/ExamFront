import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-quizes',
  templateUrl: './view-quizes.component.html',
  styleUrls: ['./view-quizes.component.css']
})
export class ViewQuizesComponent implements OnInit {

  quizzes=[
    {
      qId:'2',
      title:'w',
      description:'d',
      maxMarks:'d',
      numberOfQuestions:'f',
      active:'s',
      category:{
        title:'w'
      }
    }
  ]

  constructor(private _quiz:QuizService) { }

  ngOnInit(): void {
  
    this._quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
      },
      (error)=>{
        Swal.fire("Error","Error Loading data","error");
      }
    )
  
  }

  deleteQuiz(qId:any){
    Swal.fire({
      icon:'info',
      title:'Are you sure?',
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed)
      {
        //delete
        this._quiz.deleteQuiz(qId).subscribe(
          (data:any)=>{
            this.quizzes=this.quizzes.filter((quiz)=>quiz.qId!=qId);
            Swal.fire("Success",'Quiz deleted','success');
          },
          (error)=>{
            Swal.fire("Error",'Quiz not deleted','error');
          }
        )        
      }
    })
  }
}
