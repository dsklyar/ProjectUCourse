import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { CourseQuestion } from '../../models/courseQuestion.model';

@Injectable()
export class CourseQuestionService{
     courseQuestions:CourseQuestion[] = []
    addcourseQuestion(courseQuestion: CourseQuestion){
        this.courseQuestions.push(courseQuestion);
    }
    deletecourseQuestion(courseQuestion: CourseQuestion){
        this.courseQuestions.splice(this.courseQuestions.indexOf(courseQuestion), 1);
    }
    constructor(private http: Http) { }
}