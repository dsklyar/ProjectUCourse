import { Course } from '../models/course.model';
import { DashboardService } from './dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component ({
    selector : 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styles : [`
    .example-grid {
        display: -webkit-flex;
        display: flex;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-align-content: center;
        align-content: center;
    }
    .example-card {
        width: 300px;
        padding: 25px;
        margin: 10px;
    }
    `]
})
export class DashboardComponent implements OnInit {
    courses: Course[];
    constructor(private dashboardService: DashboardService){}

    ngOnInit(){
        this.courses = this.dashboardService.getMessages();
    }
}