import { CourseQuestion } from '../../models/courseQuestion.model'
import { CourseQuestionService } from '../courseQuestion-service/courseQuestion.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-courseQuestion-view',
    templateUrl: '/courseQuestion-view.component.html',
    styleUrls: ['/courseQuestion-view.component.css']
})
export class courseQuestionViewComponent implements OnInit {
    private courseQuestion:CourseQuestion;
    constructor(private courseQuestionService: CourseQuestionService,
    private location: Location){}
    ngOnInit(){
     //this.getquestionToDisplay()
     this.courseQuestion = this.courseQuestionService.courseQuestionToDisplay;
    }
    onGoBack() {
        this.location.back()
    }
}