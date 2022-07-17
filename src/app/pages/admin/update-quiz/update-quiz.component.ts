import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  qId:any=0;
  quiz:any;
  categories: any;
  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _cate:CategoryService,private _router:Router) { }

  ngOnInit(): void {
    this.qId=this._route.snapshot.params.qId;
    
    this._quiz.getSingleQuize(this.qId).subscribe(
      (data:any)=>{
        this.quiz=data;
      },
      (error)=>{
        Swal.fire("Error",'error loading quiz','error');
      }
    );

    this._cate.categories().subscribe(
      (data:any)=>{
        this.categories=data;
      },
      (error)=>{
        Swal.fire("Error",'error loading Categories','error');
      }
    );
  }

  //update form
  public updateForm()
  {
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data:any)=>{
        Swal.fire('Success !!','Succesfully update quiz','success').then((e)=>{
          this._router.navigate(['/admin/quizzes'])
        });
      },
      (error)=>{
        Swal.fire("Error",'Not update quiz','error');
      }
    );
  }
}
