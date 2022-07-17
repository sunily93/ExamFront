import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
// @ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Editor=ClassicEditor;

  constructor(private _route:ActivatedRoute,private _quiz:QuestionService) { }

  qId:any;
  qTitle:any;
  question:any={
    quiz:{

    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''    
  }
  ngOnInit(): void {
    this.qId=this._route.snapshot.params.qid;
    this.qTitle=this._route.snapshot.params.title;
    this.question.quiz['qId']=this.qId;
  }

  formSubmit()
  {
    if(this.question.content.trim()=='' || this.question.content==null)
    {
      return;
    }
    if(this.question.option1.trim()=='' || this.question.option1==null)
    {
      return;
    }
    if(this.question.option2.trim()=='' || this.question.option2==null)
    {
      return;
    }
    if(this.question.answer.trim()=='' || this.question.answer==null)
    {
      return;
    }

    //form submit
    this._quiz.addQuetion(this.question).subscribe(
      (data:any)=>{
        Swal.fire("Success","Auestion added successfully",'success');
        this.question.content='',
        this.question.option1='',
        this.question.option3='',
        this.question.option4='',
        this.question.answer=''
      },
      (error)=>{
        Swal.fire("Error",'Question is not added','error');
      }
    );
  }
}
