import { AnnouncementService } from '../AnnouncementService/announcemenet.service';
import { Announcement } from '../../models/announcement.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.css']
})


export class AnnouncementListComponent implements OnInit {
  private announcements: Announcement[];
  private sub : any;
  parentRouteId: number;

  constructor(private announcementService: AnnouncementService,
              private router: Router,
              private thisRoute: ActivatedRoute) { }

  ngOnInit() {
    this.announcementService.refreshAnnouncements()
      .subscribe(
      (announcements: Announcement[]) => {
        this.announcements = announcements;
      },
      error => console.log(error)
      );
  }
}

