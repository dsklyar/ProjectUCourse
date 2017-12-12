import { Location } from '@angular/common';
import { Discussion } from '../../models/discussion.model';
import { Router } from '@angular/router';
import { DiscussionService } from '../DiscussionService/discussion.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discussion-input',
  templateUrl: './discussion-input.component.html',
  styleUrls: ['./discussion-input.component.css']
})

export class DiscussionInputComponent implements OnInit {
  newDiscussionForm: FormGroup;
  constructor(private discussionService: DiscussionService,
    private location: Location) { }
  ngOnInit() {
    this.newDiscussionForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      announcement: new FormControl(null, Validators.required)
    });
  }
  onSubmit() {
    this.discussionService.addDiscussion(
      new Discussion(
        this.newDiscussionForm.controls['title'].value,
        this.newDiscussionForm.controls['discussion'].value))
      .subscribe(
      //data => console.log(data),
      error => console.log(error)
      );
    this.newDiscussionForm.reset();
    this.location.back()
  }
  onGoBack() {
    this.location.back()
  }

}