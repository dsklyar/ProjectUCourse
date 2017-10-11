import { AnnouncementService } from '../AnnouncementService/announcemenet.service';
import { Announcement } from '../../models/announcement.model';

import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styles: [``]
})


export class AnnouncementListComponent implements OnInit{
  private announcements : Announcement[];

  constructor(private announcementService : AnnouncementService){}

  ngOnInit(){
    this.announcements = this.announcementService.getAnnouncements(); 
  }
}

