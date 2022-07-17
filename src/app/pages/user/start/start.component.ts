import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {


  qId:any;
  questions:any;

  marksGot=0;
  correctAnswer=0;
  attempted=0;
  isSubmit=false;
  timer:any;

  constructor(private locationSt:LocationStrategy,private _route:ActivatedRoute,private question:QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();

    this.qId= this._route.snapshot.params.qid;
    this.loadQuestion();
  }

  loadQuestion() {
    this.question.getQuestionOfQuizForTest(this.qId).subscribe(
      (data:any)=>{
        this.questions=data;

        this.timer=this.questions.length * 2 * 60;

        // this.questions.forEach((q:any) => {
        //   q['givenAnswer']='';

        // });
        this.startTimer();
      },(error)=>{
        Swal.fire("Error",'Error loading question of quiz....','error');
      }
    );
  }

  preventBackButton()
  {
    history.pushState(null,location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,location.href);
    })
  }

  submitQuiz()
  {
     Swal.fire({
      title:'Do you want to submit the quiz?',
      showCancelButton:true,
      confirmButtonText:'Submit',
      icon:'info'
    }).then((e)=>{
      if(e.isConfirmed)
      {
       this.evalQuiz();
      }
    })
  }

  // start timer
  startTimer()
  {
   let t:any= window.setInterval(()=>{
      if(this.timer<=0)
      {
        this.evalQuiz();
        //this.submitQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000)
  }

  getFormattedTime()
  {
    let mm=Math.floor(this.timer/60);
    let ss=this.timer-mm*60;
    return `${mm} min : ${ss} sec`
  }


  evalQuiz()
  {
       this.question.evalQuiz(this.questions).subscribe(
       (data:any)=>{
         this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
         this.correctAnswer=data.correctAnswer;
         this.attempted=data.attempted;

         console.log(data)
      
         this.isSubmit=true;
       },
       (error)=>{
          alert("err")
          console.log(error)
       }
     )
    // this.isSubmit=true;
       
    // this.questions.forEach((q:any) => {
    //   if(q.givenAnswer==q.answer)
    //   {
      

    //     this.correctAnswer++;
    //     let marksSingle=this.questions[0].quiz.maxMarks/this.questions.length;
    //     this.marksGot+=marksSingle;
    //   }

    //   if(q.givenAnswer.trim()!='')
    //   {
    //     this.attempted++;
    //   }
    // });
    // console.log(this.marksGot+"---"+this.attempted+"------"+this.correctAnswer)
  }

  printPage(){
    window.print();
  }

}
