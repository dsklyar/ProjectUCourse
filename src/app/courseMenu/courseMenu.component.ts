import { DiscussionService } from '../Discussion/DiscussionService/discussion.service';
import { CurrentActivatedRouteService } from '../sharedServices/currentActivatedRoute.service';
import { AssignmentService } from '../assignment/assignmentService/assignment.service';
import { switchMapTo } from 'rxjs/operator/switchMapTo';
import { AnnouncementService } from '../Announcement/AnnouncementService/announcemenet.service';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Course } from '../models/course.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-menu',
  templateUrl: './courseMenu.component.html',
  styleUrls: ['.././auth/cardcss/card.css']
})

export class CourseMenuComponent implements OnInit {
  courseID: string;

  constructor(private activatedRoute: ActivatedRoute,
    private announcementService: AnnouncementService,
    private discussionService: DiscussionService,
    private assignmentService: AssignmentService,
    private router: Router,
    private thisRoute: ActivatedRoute,
    private currentActivatedRouteService: CurrentActivatedRouteService) { }

  ngOnInit() {
    this.activatedRoute.paramMap
      .subscribe(params => {
        this.courseID = params.get('courseID');
      })
    // MUST DO IT SO ANNOUNCEMENT LIST KNEW HAT COURSE IT WAS ON
    this.announcementService.setCourseID(this.courseID);
    this.assignmentService.setCourseID(this.courseID);
    this.discussionService.setCourseID(this.courseID);
    this.router.events.forEach((event) => {

      //Before Navigation
      if (event instanceof NavigationStart) {
        switch (event.url) {
          case "/app/home":
            {
              //Do Work
              break;
            }
          case "/app/About":
            {
              //Do Work
              break;
            }
        }
      }

      //After Navigation
      if (event instanceof NavigationEnd) {
        switch (event.url) {
          case "/app/home":
            {
              //Do Work
              break;
            }
          case "/app/About":
            {
              //Do Work
              break;
            }
        }
      }
    });
  }
  onLinkClick(e: any) {
    switch (e.index) {
      case 0:
        this.router.navigate(['announcements'], { relativeTo: this.thisRoute });
        break;
      case 1:
        this.router.navigate(['assignments'], { relativeTo: this.thisRoute });
        break;
      case 5:
      //this.selectedTab = 1;
      this.router.navigate(['courseQuestion'],{relativeTo : this.activatedRoute});
      case 2:
        this.router.navigate(['discussions'], { relativeTo: this.thisRoute });
        break;
      default:
        break;
    }
  }
}