import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from '../models/course.model';
import { DashboardService } from './dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector : 'app-dashboardCourse-input',
    templateUrl: './dashboardCourse-input.component.html',
    styleUrls: ['.././auth/cardcss/card.css']
})

export class DashboardCourseInputComponent implements OnInit{
    newCourse : FormGroup;
    constructor(private dashboardService: DashboardService,
                private router : Router) {}
    ngOnInit(){
        this.newCourse = new FormGroup({
            title : new FormControl(null, Validators.required),
            regNum : new FormControl(null, Validators.required),
            announcment : new FormControl(null, Validators.required),
            description : new FormControl(null, Validators.required)
        });
    }
    onSubmit(){
        this.dashboardService.addCourse(
            new Course(this.newCourse.controls['title'].value,
                        this.newCourse.controls['regNum'].value,
                        new Date(),
                        new Date(),
                        this.newCourse.controls['announcment'].value,
                        this.newCourse.controls['description'].value));
        this.router.navigateByUrl('dashboard');
    }
}