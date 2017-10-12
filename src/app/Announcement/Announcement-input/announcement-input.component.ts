import { Location } from '@angular/common';
import { Announcement } from '../../models/announcement.model';
import { Router } from '@angular/router';
import { AnnouncementService } from '../AnnouncementService/announcemenet.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-announcement-input',
  templateUrl: './announcement-input.component.html',
  styleUrls: ['./announcement-input.component.css']
})

export class AnnouncementInputComponent implements OnInit {
  newAnnouncementForm: FormGroup;
  constructor(private announcmentService: AnnouncementService,
    private location: Location) { }
  ngOnInit() {
    this.newAnnouncementForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      announcement: new FormControl(null, Validators.required)
    });
  }
  onSubmit() {
    this.announcmentService.addAnnouncement(
      new Announcement(
        this.newAnnouncementForm.controls['title'].value,
        this.newAnnouncementForm.controls['announcement'].value))
      .subscribe(
      //data => console.log(data),
      error => console.log(error)
      );
    this.newAnnouncementForm.reset();
    this.location.back()
  }
  onGoBack() {
    this.location.back()
  }

}