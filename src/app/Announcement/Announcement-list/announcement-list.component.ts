import { CurrentActivatedRouteService } from '../../sharedServices/currentActivatedRoute.service';
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

  constructor(private announcementService: AnnouncementService,
              private thisRoute : ActivatedRoute,
              private currentActivatedRouteService : CurrentActivatedRouteService) { }

  ngOnInit() {
    console.log(this.thisRoute.snapshot.url[0].path);
    this.currentActivatedRouteService
    .setCurrentActivatedRoute(this.thisRoute.snapshot.url[0].path);
    this.announcementService.refreshAnnouncements()
      .subscribe(
      (announcements: Announcement[]) => {
        this.announcements = announcements;
      },
      error => console.log(error)
      );
  }
}

