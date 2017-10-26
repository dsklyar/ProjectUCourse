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

<<<<<<< HEAD
export class CourseMenuComponent implements OnInit {
  courseID: string;
=======
export class CourseMenuComponent implements OnInit{
  selectedTab : number  = 0;
  courseID : string;
  constructor (private activatedRoute : ActivatedRoute,
               private announcementService : AnnouncementService,
               private router : Router){}
>>>>>>> cc07fd13f102d2f36bfbb39dc3f1b334853dbf60

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
  onLinkClick($event : any){
    switch ($event.index) {
      case 0:
      this.selectedTab = 0;
      this.router.navigate(['announcements'], {relativeTo : this.activatedRoute});
        break;
      case 1:
      this.selectedTab = 1;
      this.router.navigate(['syllabus'], {relativeTo : this.activatedRoute});
        break;
      default:
        break;
    }
    
  }
}