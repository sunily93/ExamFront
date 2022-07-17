import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-quetions',
  templateUrl: './view-quiz-quetions.component.html',
  styleUrls: ['./view-quiz-quetions.component.css']
})
export class ViewQuizQuetionsComponent implements OnInit {

  qId:any;
  qTitle:any;
  questions:any=[];
  constructor(private _route:ActivatedRoute,private _question:QuestionService) { }

  ngOnInit(): void {
    this.qId=this._route.snapshot.params.qid;
    this.qTitle=this._route.snapshot.params.title;
    this._question.getQuestionOfQuiz(this.qId).subscribe(
      (data:any)=>{
        this.questions=data;
      },
      (error)=>{
        Swal.fire('error','error loding question','error');
      }
    );
  
  }

  //delete question
  deleteQuestion(qid:any){
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are You sure want to delete ?'
    }).then((result)=>{
      if(result.isConfirmed)
      {
        this._question.deleteQuestion(qid).subscribe(
          (data:any)=>{
            Swal.fire('Deleted !!','Question deleted successfully','success' );
            this.questions=this.questions.filter((q:any)=>q.questionId==qid)
          },
          (error)=>{
            Swal.fire('Error','Question not deleted successfully','error' );
          }
        )
      }
    })
  }

}
