import { AuthenticationService } from '../auth/authService/authentication.service';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { Course } from '../models/course.model';
import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dashboard-course',
  templateUrl: './dashboardCourse.component.html',
  styles: [`
    .example-card {
      min-width: 275px;
      width: 1vw;
      max-width: 300px;
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
export class DashboardCourseComponent implements OnInit {
  // NOTE: 
  // This is used to set the HTML and creaete those beautiful boxes
  @ViewChild('imagebox') imagebox: ElementRef;
  @Input() course: Course;
  private isUserInstructor: boolean;
  colors: string[] = ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3',
                      '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd',
                      '#ccebc5', '#ffed6f'];

  colors2: string[] =['#67001f','#b2182b','#d6604d','#f4a582','#fddbc7',
                      '#f7f7f7','#d1e5f0','#92c5de','#4393c3','#2166ac',
                      '#053061']


  constructor(private dashboardService: DashboardService,
              private router: Router,
              private authService: AuthenticationService) {
    // NOTE:
    // Long story short angular likes to evaluate ngIf statements
    // like times a call for reasons I am not sure enough
    // so I made this call so that it evaluates ngIf a certain 
    // interval at a time
    // What it does is it calls the function and sets a boolean [isUserInstructor]
    // which I pass to ngIf to evaluate
    // check out this link 
    // https://stackoverflow.com/questions/39850484/angular2-ngif-afunctioncall-results-in-the-function-being-called-9-times
    // This is a terrible hack imho, if you know better please contact me if I am still programming in Angular,
    // probably not tho I since I probs turn into a monk or something...
    // setTimeout(() => {
    //   this.isInstructor();
    // }, 50000);
  }

  onDelete() {
    this.dashboardService.removeCourse(this.course)
      .subscribe(
      result => console.log(result)
      );
  }
  openCourse() {
    this.router.navigate(['courseMenu', this.course.courseID]);
  }
  isInstructor() {
    // NOTE:
    // this gets the user type from the backend
    return this.authService.isInstructor();
  }
  randomColor() {
    return this.colors[Math.random() * this.colors.length | 0]
  }
  generateImageBackground() {
    var fragment: string = '';
    for (var i = 0; i < 48; i++) {
      fragment = fragment + ("<div style='background-color:" + this.randomColor() + "; width: 24px; height: 24px;'></div> \n");
    }
    return fragment;
  }
  ngOnInit() {
    this.imagebox.nativeElement.innerHTML = this.generateImageBackground();
  }
}
