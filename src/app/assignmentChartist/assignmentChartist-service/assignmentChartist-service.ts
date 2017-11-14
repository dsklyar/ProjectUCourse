
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class AssignmentChartistService {
  assignmentID : string;
  data : any = [];

  constructor(private http: Http) { }

  refreshAssignmentChartist() {
    return this.http.get(environment.baseUrl + '/assignmentChartist/'
      + this.assignmentID
      + this.getToken())
      .map((response: Response) => {
        const assignmentQuestionAnswerNibles = response.json().obj;    // obj is where courses stored in /courses routes
        console.log(assignmentQuestionAnswerNibles);
        let transformedNibles: any= [];
        for (let nible of assignmentQuestionAnswerNibles) {
          transformedNibles.push({
            score : nible.score,
            triesUsed : nible.triesUsed,
            assignmentQuestionID : nible.assignmentQuestionID
          });
        }
        this.data = transformedNibles;
        return this.data;
      })
      .catch((error: Response) => Observable.throw('Error in AssignmentChartistService Service'));
  }
 
  getToken() {
    const token = (localStorage.getItem('token'))
      ? '?token=' + localStorage.getItem('token')
      : '';
    return token;
  }
  setAssignmentID(assignmentID : string){
    this.assignmentID = assignmentID;
  }
}