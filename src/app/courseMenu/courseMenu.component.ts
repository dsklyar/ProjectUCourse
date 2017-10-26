import { switchMapTo } from 'rxjs/operator/switchMapTo';
import { AnnouncementService } from '../Announcement/AnnouncementService/announcemenet.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private thisRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap
      .subscribe(params => {
        this.courseID = params.get('courseID');
      })
    // MUST DO IT SO ANNOUNCEMENT LIST KNEW HAT COURSE IT WAS ON
    this.announcementService.setCourseID(this.courseID);
   });
  }
}