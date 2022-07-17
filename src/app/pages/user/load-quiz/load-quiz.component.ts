import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId:any;
  quizzes:any;
  constructor(private _router:ActivatedRoute,private _quiz:QuizService) { }

  ngOnInit(): void {
  
    this._router.params.subscribe((params)=>{
      this.catId=this._router.snapshot.params.catId;
    
      if(this.catId==0)
      {
        this._quiz.getActiveQuiz().subscribe(
          (data:any)=>{
            this.quizzes=data;
          },
          (error)=>{
            Swal.fire('Error','Error loading all quiz','error');
          }
        );
      }else{
        this._quiz.getActiveQuizOfCategory(this.catId).subscribe(
          (data:any)=>{
            this.quizzes=data;
          },
          (error)=>{
            Swal.fire('Error','Error load the data','error');
          }
        );
      }
    
    });

  }

}
