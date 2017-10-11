import { AnnouncementService } from './AnnouncementService/announcemenet.service';
import { Announcement } from '../models/announcement.model';


import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-announcement',
  templateUrl: '/announcement.component.html',
  styles: [`
  .example-card {
    margin-top : 10px;
  }
  .menu {
    margin-left: auto;
  }
  `]
})

export class AnnouncementComponent {
  @Input() announcement : Announcement;

  constructor(private announcementService : AnnouncementService){}

  onDelete(){}
}