import { FormGroup } from '@angular/forms';
import { Course } from '../models/course.model';
import { DashboardService } from './dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector : 'app-dashboardCourse-input',
    templateUrl: './dashboardCourse-input.component.html',
    styles : [`

    `]
})

export class DashboardCourseInputComponent implements OnInit{
    newCourse : FormGroup;
    constructor(private dashboardService: DashboardService) {}
    ngOnInit(){
        this.newCourse = new FormGroup({

        });
    }
}