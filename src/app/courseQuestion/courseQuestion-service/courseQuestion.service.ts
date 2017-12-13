import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { CourseQuestion } from '../../models/courseQuestion.model';

@Injectable()
export class CourseQuestionService{
    private courseQuestionToEdit : CourseQuestion;
    public courseQuestionToDisplay : CourseQuestion;
     courseQuestions:CourseQuestion[] = []

    displaycourseQuestion(courseQuestion){
        this.courseQuestionToDisplay = courseQuestion;
    }
    addcourseQuestion(courseQuestion: CourseQuestion){
        this.courseQuestions.push(courseQuestion);
    }
    deletecourseQuestion(courseQuestion: CourseQuestion){          
        this.courseQuestions.splice(this.courseQuestions.indexOf(courseQuestion), 1);
    }
    addcourseQuestionToEdit(courseQuestionToEdit : CourseQuestion){          
        this.courseQuestionToEdit = courseQuestionToEdit; 
    }
    getcourseQuestionToEdit(){
        return this.courseQuestionToEdit;
    }
    updatecourseQuestion(courseQuestion: CourseQuestion){
    //     const body = JSON.stringify(courseQuestion);
    //     const headers = new Headers({ 'Content-Type': 'application/json' });
    //     return this.http.patch(environment.baseUrl + '/courseQuestion/' 
    //     + courseQuestion.courseQuestionID
    //     + this.getToken()
    //     , body, { headers: headers })
    //         .map((response: Response) => {
    //             const result = response.json();
    //             const updatedcourseQuestion = new CourseQuestion(
    //                 result.obj.title,
    //                 result.obj.responses,
    //                 result.obj.dateCreated,
    //                 result.obj.dateUpdated,
    //                 result.obj.courseQuestionID,
    //                 result.obj.courseID,
    //                 result.obj.userID
    //             );
    //             this.courseQuestions.splice(this.courseQuestions.indexOf(courseQuestion), 1);
    //             this.courseQuestions.unshift(updatedcourseQuestion);
    //             // NOTE: this is done to prevent errors of editing the same announ twice
    //             this.courseQuestionToEdit = null;
    //             return updatedcourseQuestion;
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