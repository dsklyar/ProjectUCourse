import { AnnouncementService } from '../AnnouncementService/announcemenet.service';
import { Announcement } from '../../models/announcement.model';

import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.css']
})


export class AnnouncementListComponent implements OnInit {
  private announcements: Announcement[];

  constructor(private announcementService: AnnouncementService) { }

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

