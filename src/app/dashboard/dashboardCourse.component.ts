import { DashboardService } from './dashboard.service';
import { Course } from '../models/course.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-course',
  templateUrl: './dashboardCourse.component.html',
  styles: [`
    .example-card {
      width: 300px;
      padding: 25px;
      margin: 10px;
    }
    md-card-header button {
        align-content: right;
    }
    `]
})
export class DashboardCourseComponent implements OnInit {
  @Input() course: Course;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() { }

  onDelete(){
    this.dashboardService.removeCourse(this.course)
    .subscribe(
      result => console.log(result)
    );
  }
}