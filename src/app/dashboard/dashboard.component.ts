import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/authService/authentication.service';
import { Course } from '../models/course.model';
import { DashboardService } from './dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styles: [`
    .example-grid {
        display: -webkit-flex;
        display: flex;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-align-content: center;
        align-content: center;
    }
    .example-card {
        min-width: 275px;
        width: 1vw;
        max-width: 300px;
        padding: 25px;
        margin: 10px;
      }
    `]
})
export class DashboardComponent implements OnInit {
    courses: Course[];
    constructor(private dashboardService: DashboardService,
        private authService: AuthenticationService,
        private router: Router) { 
            this.authService.checkIfPreviouslyLoggedIn(); }

    ngOnInit() {
        this.dashboardService.getMessages()
            .subscribe(
                (courses: Course[]) => {
                    this.courses = courses;
                },
                error => {
                    // Maybe token has expired?
                    // TODO:
                    // Go to landing page
                    this.router.navigate(['/signin']);
                }
            );
    }
    isInstructor() {
        return this.authService.userType == 'instructor'
    }
}