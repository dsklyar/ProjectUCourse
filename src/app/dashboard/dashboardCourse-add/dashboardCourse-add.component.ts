import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../models/course.model';
import { DashboardService } from './../dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboardCourse-add',
    templateUrl: './dashboardCourse-add.component.html',
    styleUrls: ['./dashboardCourse-add.component.css']
})

export class DashboardCourseAddComponent implements OnInit {
    addCourse: FormGroup;
    constructor(private dashboardService: DashboardService,
        private location: Location) { }
    ngOnInit() {
        this.addCourse = new FormGroup({
            regNum: new FormControl(null, Validators.required),
        });
    }
    onSubmit() {
        this.dashboardService.registerCourse(
            this.addCourse.controls['regNum'].value)
            .subscribe(
            //data => console.log(data),
            error => console.log(error)
            );
        this.addCourse.reset();
        this.location.back()
    }
    onGoBack() {
        this.location.back()
    }
}