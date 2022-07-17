import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories=[{
    cId:'',
    title:''
  }]

  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
     cId:''
    }
  }
  constructor(private _category:CategoryService,private _snack:MatSnackBar,private _quiz:QuizService) { }

  ngOnInit(): void {
 
    this._category.categories().subscribe(
      (data:any)=>{
        this.categories=data;
      },
      (error)=>{
        Swal.fire("Error",'Error loading data','error');
      }
    )

  }

  addQuiz()
  {
    if(this.quizData.title.trim()=='' ||  this.quizData.title==null)
    {
      this._snack.open("Title Required...",'',{
        duration:3000,
      });
      return;
    }

    //validation

    //call server
        //call server
this._quiz.addQuiz(this.quizData).subscribe(
  (data)=>{
    Swal.fire('Success','Quiz is added Successfully','success');
    this.quizData={
      title:'',
      description:'',
      maxMarks:'',
      numberOfQuestions:'',
      active:true,
      category:{
        cId:'',
      }
    }
  },
  (error)=>{
      console.log(error);
      Swal.fire('Error !!','Error while adding quiz','error');
  });
  }

}
