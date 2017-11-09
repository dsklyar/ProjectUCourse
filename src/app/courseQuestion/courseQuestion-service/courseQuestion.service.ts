import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { CourseQuestion } from '../../models/courseQuestion.model';

@Injectable()
export class CourseQuestionService{
    private courseQuestion:CourseQuestion[] = []
    constructor(private http: Http) { }
}