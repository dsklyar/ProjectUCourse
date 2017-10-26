import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { Course } from '../models/course.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-course',
  templateUrl: './dashboardCourse.component.html',
  styles: [`
    .example-card {
      width: 300px;
      padding: 25px;
      margin: 10px;
    }
    .menu {
      margin-left: auto;
    }
    `]
})
export class DashboardCourseComponent{
  @Input() course: Course;

  constructor(private dashboardService: DashboardService,
             private router: Router) { }

  onDelete(){
    this.dashboardService.removeCourse(this.course)
    .subscribe(
      result => console.log(result)
    );
  }
  openCourse(){
    this.router.navigate(['courseMenu',this.course.courseID]);
  }
}