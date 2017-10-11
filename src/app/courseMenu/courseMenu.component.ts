import { AnnouncementService } from '../Announcement/AnnouncementService/announcemenet.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../models/course.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-menu',
  templateUrl: './courseMenu.component.html',
  styleUrls: ['.././auth/cardcss/card.css']
})

export class CourseMenuComponent implements OnInit{
  courseID : string;
  constructor (private activatedRoute : ActivatedRoute,
               private announcementService : AnnouncementService){}

  ngOnInit(){
    this.activatedRoute.paramMap
    .subscribe(params => {
      this.courseID =  params.get('courseID');
      console.log(this.courseID);
    })
    this.announcementService.setCourseID(this.courseID);
  }
  refreshAnnouncements(){
    this.announcementService.refreshAnnouncements();
  }
}