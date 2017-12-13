import { CourseQuestion } from '../../models/courseQuestion.model'
import { CourseQuestionService } from '../courseQuestion-service/courseQuestion.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-courseQuestion-input',
    templateUrl: '/courseQuestion-input.component.html',
    styleUrls: ['/courseQuestion-input.component.css']
})
export class courseQuestionInputComponent implements OnInit {
    newcourseQuestionForm: FormGroup;

    constructor(private courseQuestionService: CourseQuestionService,
    private location: Location){}

    ngOnInit(){
        this.newcourseQuestionForm = new FormGroup({
            title: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.required)
        });
    }
    onSubmit(){
        this.courseQuestionService.addcourseQuestion(
            new CourseQuestion(
                this.newcourseQuestionForm.controls['title'].value,
                [],
                this.newcourseQuestionForm.controls['description'].value

            )
        );
        this.newcourseQuestionForm.reset();
        this.location.back()
    }
    onGoBack() {
        this.location.back()
    }
}