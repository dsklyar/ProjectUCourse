import { AuthenticationService } from '../auth/authService/authentication.service';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { Course } from '../models/course.model';
import { Component, Input, OnInit,ViewChild, ElementRef } from '@angular/core';

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
    .color-fill {
      min-height: auto;
      width: calc(100% + 48px);
      margin: 0 -24px 16px -24px;
      display: inline-flex;
    }
    `]
})
export class DashboardCourseComponent implements OnInit{
  @ViewChild('imagebox') imagebox: ElementRef;
  @Input() course: Course;
  colorbox: string;
  colors: string[] = ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', 
                      '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', 
                      '#ccebc5', '#ffed6f']

  constructor(private dashboardService: DashboardService,
              private router: Router,
              private authService: AuthenticationService) { }

  onDelete(){
    this.dashboardService.removeCourse(this.course)
    .subscribe(
      result => console.log(result)
    );
  }
  openCourse(){
    this.router.navigate(['courseMenu',this.course.courseID]);
  }
  isInstructor(){
    return this.authService.isInstructor();
  }
  randomColor(){
    
    return this.colors[Math.random() * this.colors.length | 0]
  }
  generateImageBackground(){
    var fragment : string = '';
    for (var i = 0; i < 48; i++) {
      fragment = fragment + ("<div style='background-color:" + this.randomColor() + "; width: 24px; height: 24px;'></div> \n");
    }
    return fragment;
  }
  ngOnInit(){
    this.imagebox.nativeElement.innerHTML = this.generateImageBackground();
  }
}
