import { AssignmentQuestion } from '../../models/assignmentQuestion.model';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';


@Injectable()
export class AssignmentQuestionService {
  private assignmentID: string;
  private assignmentQuestions: AssignmentQuestion[] = [];

  constructor(private http: Http) { }

  getAssignmentQuestions() {
    return this.assignmentQuestions;
  }
  setAssignmentID(assignmentID: string) {
    this.assignmentID = assignmentID;
  }
  addAssignmentQuestion(newAssignmentQuestion: AssignmentQuestion) {
    if (this.assignmentID != null) {
      const body = JSON.stringify(newAssignmentQuestion);
      const headers = new Headers({ 'Content-Type': 'application/json' });
      return this.http.post(environment.baseUrl + '/assignmentQuestion/'
        + this.assignmentID
        + this.getToken(), body, { headers: headers })
        .map((response: Response) => {
          const result = response.json();
          const returnedAssignmentQuestion = new AssignmentQuestion(
            result.obj.title,
            result.obj.description,
            result.obj.questionType,
            result.obj.numberOfChoices,
            result.obj.numberOfTries,
            result.obj.pointsLostPerTry,
            result.obj.pointsAvailable,
            result.obj.questionBody,
            result.obj.questionArray,
            result.obj.dateCreated,
            result.obj.dateUpdated,
            result.obj.assignmentQuestionID
          );
          console.log(returnedAssignmentQuestion);
          this.assignmentQuestions.unshift(returnedAssignmentQuestion);
          return returnedAssignmentQuestion;
        })
        .catch((error: Response) => Observable.throw(error.json()));
    }
  }
    // YOU MUST REFRESH FIRST BEFORE ADDING NEW ASSIGNMENTS
  // OTHERWISE COURSEID IS UNDEFINED
  refreshAssignmentQuestions() {
    return this.http.get(environment.baseUrl + '/assignmentQuestion/'
      + this.assignmentID
      + this.getToken())
      .map((response: Response) => {
        const assignmentQuestions = response.json().obj;    // obj is where courses stored in /courses routes
        let transformedAssignmentQuestions: AssignmentQuestion[] = [];
        for (let assignmentQuestion of assignmentQuestions) {
          var aq = new AssignmentQuestion(
            assignmentQuestion.title,
            assignmentQuestion.description,
            assignmentQuestion.questionType,
            assignmentQuestion.numberOfChoices,
            assignmentQuestion.numberOfTries,
            assignmentQuestion.pointsLostPerTry,
            assignmentQuestion.pointsAvailable,
            assignmentQuestion.questionBody,
            assignmentQuestion.questionArray,
            assignmentQuestion.dateCreated,
            assignmentQuestion.dateUpdated,
            assignmentQuestion.assignmentQuestionID
          );
          // NOTE:
          // for some reason mongodb adds id in the beginigod the array
          // so i remove here
          aq.questionArray.shift();
          transformedAssignmentQuestions.push(aq);
        }
        console.log(transformedAssignmentQuestions);
        this.assignmentQuestions = transformedAssignmentQuestions;
        return this.assignmentQuestions;
      })
      .catch((error: Response) => Observable.throw('Error in AssignmentQuestion Service'));
  }
  getToken() {
    const token = (localStorage.getItem('token'))
      ? '?token=' + localStorage.getItem('token')
      : '';
    return token;
  }
}