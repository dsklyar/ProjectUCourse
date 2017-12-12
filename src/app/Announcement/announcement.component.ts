import { Router } from '@angular/router';
import { AnnouncementService } from './AnnouncementService/announcemenet.service';
import { Announcement } from '../models/announcement.model';


import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})

export class AnnouncementComponent {
  @Input() announcement: Announcement;

  constructor(private announcementService: AnnouncementService,
    private router: Router) { }

  onDelete() {
    this.announcementService.removeAnnouncement(this.announcement)
      .subscribe(
      //result => console.log(result)
      );
  }
  onEdit() {
    this.router.navigateByUrl('/editannouncement');
    this.announcementService.addAnnouncementToEdit(this.announcement);
  }
}