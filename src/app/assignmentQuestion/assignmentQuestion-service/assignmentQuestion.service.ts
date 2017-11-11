import { AssignmentQuestionStudentTemplate } from '../../models/template/assignmentQuestionStudent.template';
import { AssignmentQuestionAnswer } from '../../models/assignmentQuestionAnswer.model';
import { AssignmentQuestion } from '../../models/assignmentQuestion.model';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';


@Injectable()
export class AssignmentQuestionService {
  assignmentID: string;
  private assignmentQuestions: AssignmentQuestion[] = [];
  private assignmentQuestionAnswers: AssignmentQuestionAnswer[] = [];

  constructor(private http: Http) { }

  gradeAssignmentQuestion(toGrade: AssignmentQuestionStudentTemplate) {
    console.log(toGrade)
    if (toGrade != null) {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      switch (toGrade.assignmentQuestion.questionType) {
        case 'multipleChoice':
          if (this.isAnswer(toGrade)) { // CORRECT
            if (!toGrade.assignmentQuestionAnswer.completed) {
              if (toGrade.assignmentQuestionAnswer.triesUsed == 0) {  // FIRST TIME CORRECT
                
                console.log('correct first time');

                toGrade.assignmentQuestionAnswer.score = toGrade.assignmentQuestion.pointsAvailable;
                toGrade.assignmentQuestionAnswer.completed = true;
                toGrade.assignmentQuestionAnswer.dateSaved = new Date();
                const body = JSON.stringify(toGrade.assignmentQuestionAnswer);
                return this.http.post(environment.baseUrl + '/assignmentQuestionAnswer'
                  + this.getToken(), body, { headers: headers })
                  .map((response: Response) => {
                    const result = response.json();
                    const returnedAssignmentQuestionAnswer = new AssignmentQuestionAnswer(
                      result.obj.userID,
                      result.obj.assignmentQuestionID,
                      result.obj.studentAnswerObject,
                      result.obj.triesUsed,
                      result.obj.score,
                      result.obj.completed,
                      result.obj.dateSaved,
                      result.obj.assignmentID,
                      result.obj._id,
                    );
                    this.assignmentQuestionAnswers.splice(this.assignmentQuestionAnswers.indexOf(toGrade.assignmentQuestionAnswer),1)
                    this.assignmentQuestionAnswers.unshift(returnedAssignmentQuestionAnswer);
                    return returnedAssignmentQuestionAnswer;
                  })
                  .catch((error: Response) => Observable.throw('Error in AssignmentQuestion Service gradeAssignmentQuestion()'));
              } else {                                                // NOT THE FIRST TIME CORRECT

                console.log('correct not first time');

                toGrade.assignmentQuestionAnswer.score = toGrade.assignmentQuestion.pointsAvailable
                  - (toGrade.assignmentQuestion.pointsLostPerTry * toGrade.assignmentQuestionAnswer.triesUsed);
                toGrade.assignmentQuestionAnswer.completed = true;
                toGrade.assignmentQuestionAnswer.dateSaved = new Date();
                const body = JSON.stringify(toGrade.assignmentQuestionAnswer);
                return this.http.patch(environment.baseUrl + '/assignmentQuestionAnswer/'
                  + toGrade.assignmentQuestionAnswer.assignmentQuestionAnswerID
                  + this.getToken(), body, { headers: headers })
                  .map((response: Response) => {
                    const result = response.json();
                    const returnedAssignmentQuestionAnswer = new AssignmentQuestionAnswer(
                      result.obj.userID,
                      result.obj.assignmentQuestionID,
                      result.obj.studentAnswerObject,
                      result.obj.triesUsed,
                      result.obj.score,
                      result.obj.completed,
                      result.obj.dateSaved,
                      result.obj.assignmentID,
                      result.obj._id,
                    );
                    this.assignmentQuestionAnswers.splice(this.assignmentQuestionAnswers.indexOf(toGrade.assignmentQuestionAnswer),1)
                    this.assignmentQuestionAnswers.unshift(returnedAssignmentQuestionAnswer);
                    return returnedAssignmentQuestionAnswer;
                  })
                  .catch((error: Response) => Observable.throw('Error in AssignmentQuestion Service gradeAssignmentQuestion()'));
              }
            }
          } else {                    // WRONG
            if (!toGrade.assignmentQuestionAnswer.completed) {
              if (toGrade.assignmentQuestionAnswer.triesUsed == 0) {  // FIRST TIME WRONG

                console.log('wrong first time');

                toGrade.assignmentQuestionAnswer.triesUsed++;
                toGrade.assignmentQuestionAnswer.score = toGrade.assignmentQuestion.pointsAvailable
                  - (toGrade.assignmentQuestion.pointsLostPerTry * toGrade.assignmentQuestionAnswer.triesUsed);
                toGrade.assignmentQuestionAnswer.completed = !(toGrade.assignmentQuestion.numberOfTries > toGrade.assignmentQuestionAnswer.triesUsed);
                toGrade.assignmentQuestionAnswer.dateSaved = new Date();
                const body = JSON.stringify(toGrade.assignmentQuestionAnswer);
                return this.http.post(environment.baseUrl + '/assignmentQuestionAnswer'
                  + this.getToken(), body, { headers: headers })
                  .map((response: Response) => {
                    const result = response.json();
                    const returnedAssignmentQuestionAnswer = new AssignmentQuestionAnswer(
                      result.obj.userID,
                      result.obj.assignmentQuestionID,
                      result.obj.studentAnswerObject,
                      result.obj.triesUsed,
                      result.obj.score,
                      result.obj.completed,
                      result.obj.dateSaved,
                      result.obj.assignmentID,
                      result.obj._id,
                    );
                    this.assignmentQuestionAnswers.splice(this.assignmentQuestionAnswers.indexOf(toGrade.assignmentQuestionAnswer),1)
                    this.assignmentQuestionAnswers.unshift(returnedAssignmentQuestionAnswer);
                    return returnedAssignmentQuestionAnswer;
                  })
                  .catch((error: Response) => Observable.throw('Error in AssignmentQuestion Service gradeAssignmentQuestion()'));
              } else {                                              // NOT THE FIRST TIME WRONG

                console.log('wrong not first time');

                toGrade.assignmentQuestionAnswer.triesUsed++;
                toGrade.assignmentQuestionAnswer.score = toGrade.assignmentQuestion.pointsAvailable
                  - (toGrade.assignmentQuestion.pointsLostPerTry * toGrade.assignmentQuestionAnswer.triesUsed);
                toGrade.assignmentQuestionAnswer.completed = !(toGrade.assignmentQuestion.numberOfTries > toGrade.assignmentQuestionAnswer.triesUsed);
                toGrade.assignmentQuestionAnswer.dateSaved = new Date();
                const body = JSON.stringify(toGrade.assignmentQuestionAnswer);
                return this.http.patch(environment.baseUrl + '/assignmentQuestionAnswer/'
                  + toGrade.assignmentQuestionAnswer.assignmentQuestionAnswerID
                  + this.getToken(), body, { headers: headers })
                  .map((response: Response) => {
                    const result = response.json();
                    const returnedAssignmentQuestionAnswer = new AssignmentQuestionAnswer(
                      result.obj.userID,
                      result.obj.assignmentQuestionID,
                      result.obj.studentAnswerObject,
                      result.obj.triesUsed,
                      result.obj.score,
                      result.obj.completed,
                      result.obj.dateSaved,
                      result.obj.assignmentID,
                      result.obj._id,
                    );
                    this.assignmentQuestionAnswers.splice(this.assignmentQuestionAnswers.indexOf(toGrade.assignmentQuestionAnswer),1)
                    this.assignmentQuestionAnswers.unshift(returnedAssignmentQuestionAnswer);
                    return returnedAssignmentQuestionAnswer;
                  })
                  .catch((error: Response) => Observable.throw('Error in AssignmentQuestion Service gradeAssignmentQuestion()'));
              }

            }
          }
          break;

        default:
          break;
      }
    }
  }

  isAnswer(toGrade: AssignmentQuestionStudentTemplate) {
    // NOTE:
    // if assignmentQuestion is set to any, this can extend question implenetation

    switch (toGrade.assignmentQuestion.questionType) {
      case 'multipleChoice':
        for (var index = 0; index < toGrade.assignmentQuestion.numberOfChoices; index++) {
          if (toGrade.assignmentQuestion.questionArray[index].isAnswer &&
            toGrade.assignmentQuestionAnswer.studentAnswerObject[index].studentAnswer) {
            return true;
          }
        }
        return false;

      default:
        break;
    }
  }

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
        const assignmentQuestions = response.json().obj;
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
            assignmentQuestion._id
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
      .catch((error: Response) => Observable.throw('Error in AssignmentQuestion Service refreshAssignmentQuestions()'));
  }
  // YOU MUST REFRESH FIRST BEFORE ADDING NEW ASSIGNMENTS
  // OTHERWISE COURSEID IS UNDEFINED
  refreshAssignmentQuestionAnswers() {
    return this.http.get(environment.baseUrl + '/assignmentQuestionAnswer/'
      // HACK:
      // FIX IT
      + localStorage.getItem('userId')
      + '/'
      + this.assignmentID
      + this.getToken())
      .map((response: Response) => {
        const assignmentQuestionAnswers = response.json().obj;
        console.log(assignmentQuestionAnswers);
        let transformedAssignmentQuestionAnswers: AssignmentQuestionAnswer[] = [];
        for (let assignmentQuestionAnswer of assignmentQuestionAnswers) {
          const aqa = new AssignmentQuestionAnswer(
            assignmentQuestionAnswer.userID,
            assignmentQuestionAnswer.assignmentQuestionID,
            assignmentQuestionAnswer.studentAnswerObject,
            assignmentQuestionAnswer.triesUsed,
            assignmentQuestionAnswer.score,
            assignmentQuestionAnswer.completed,
            assignmentQuestionAnswer.dateSaved,
            assignmentQuestionAnswer.assignmentID,
            assignmentQuestionAnswer._id
          );
          transformedAssignmentQuestionAnswers.push(aqa);
        }
        console.log(transformedAssignmentQuestionAnswers);
        this.assignmentQuestionAnswers = transformedAssignmentQuestionAnswers;
        return this.assignmentQuestionAnswers;
      })
      .catch((error: Response) => Observable.throw('Error in AssignmentQuestion Service refreshAssignmentQuestionAnswers()'));
  }
  getToken() {
    const token = (localStorage.getItem('token'))
      ? '?token=' + localStorage.getItem('token')
      : '';
    return token;
  }
}