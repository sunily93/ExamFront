import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  public getQuestionOfQuiz(qid:any)
  {
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  public getQuestionOfQuizForTest(qid:any)
  {
    return this._http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  //add question
  public addQuetion(question:any)
  {
    return this._http.post(`${baseUrl}/question/`,question);
  }

  //delete question
  public deleteQuestion(questionId:any)
  {
    return this._http.delete(`${baseUrl}/question/${questionId}`);
  }

  //eval Quiz
  public evalQuiz(questions:any)
  {
    return this._http.post(`${baseUrl}/question/eval-quiz`,questions);
  }

}
