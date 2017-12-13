import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { questionResponse } from '../../models/questionResponse.model';

@Injectable()
export class questionResponseService{
    private questionResponseToEdit : questionResponse;
    public questionResponseToDisplay : questionResponse;
     questionResponses:questionResponse[] = []

    displayquestionResponse(questionResponse){
        this.questionResponseToDisplay = questionResponse;
    }
    addquestionResponse(questionResponse: questionResponse){
        this.questionResponses.push(questionResponse);
    }
    deletequestionResponse(questionResponse: questionResponse){          
        this.questionResponses.splice(this.questionResponses.indexOf(questionResponse), 1);
    }
    addquestionResponseToEdit(questionResponseToEdit : questionResponse){          
        this.questionResponseToEdit = questionResponseToEdit; 
    }
    getquestionResponseToEdit(){
        return this.questionResponseToEdit;
    }
    updatequestionResponse(questionResponse: questionResponse){
    //     const body = JSON.stringify(questionResponse);
    //     const headers = new Headers({ 'Content-Type': 'application/json' });
    //     return this.http.patch(environment.baseUrl + '/questionResponse/' 
    //     + questionResponse.questionResponseID
    //     + this.getToken()
    //     , body, { headers: headers })
    //         .map((response: Response) => {
    //             const result = response.json();
    //             const updatedquestionResponse = new questionResponse(
    //                 result.obj.title,
    //                 result.obj.responses,
    //                 result.obj.dateCreated,
    //                 result.obj.dateUpdated,
    //                 result.obj.questionResponseID,
    //                 result.obj.courseID,
    //                 result.obj.userID
    //             );
    //             this.questionResponses.splice(this.questionResponses.indexOf(questionResponse), 1);
    //             this.questionResponses.unshift(updatedquestionResponse);
    //             // NOTE: this is done to prevent errors of editing the same announ twice
    //             this.questionResponseToEdit = null;
    //             return updatedquestionResponse;
    //         })
    // .catch((error: Response) => Observable.throw(error.json()));
    }
    constructor(private http: Http) { }
    getToken() {
        const token = (localStorage.getItem('token'))
          ? '?token=' + localStorage.getItem('token')
          : '';
        return token;
    }
}