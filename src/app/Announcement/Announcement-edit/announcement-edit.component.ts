import { NgForm } from '@angular/forms/src/directives';
import { Location } from '@angular/common';
import { Announcement } from '../../models/announcement.model';
import { Router } from '@angular/router';
import { AnnouncementService } from '../AnnouncementService/announcemenet.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-announcement-edit',
  templateUrl: './announcement-edit.component.html',
  styleUrls: ['./announcement-edit.component.css']
})

export class AnnouncementEditComponent implements OnInit {
  constructor(private announcmentService: AnnouncementService,
              private location: Location,
              private router : Router) { }
  announcementToEdit : Announcement;

  ngOnInit() {
    this.announcementToEdit = this.announcmentService.getAnnouncementToEdit();
    if(this.announcementToEdit == null){
      // TODO: show error page here
      this.router.navigateByUrl('/dashboard');
    }
  }
  onSubmit(form : NgForm) {
    const updatedAnnouncement = new Announcement(
      form.value.title,
      form.value.announcement,
      this.announcementToEdit.dateCreated,
      new Date(),
      this.announcementToEdit.announcementID
    );
    this.announcmentService.updateAnnouncement(updatedAnnouncement)
      .subscribe (
      //data => console.log(data),
      //error => console.log(error)
      );
    form.reset();
    this.location.back()
  }
  onGoBack() {
    this.location.back()
  }
}