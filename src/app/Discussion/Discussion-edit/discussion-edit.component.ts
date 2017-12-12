import { NgForm } from '@angular/forms/src/directives';
import { Location } from '@angular/common';
import { Discussion } from '../../models/discussion.model';
import { Router } from '@angular/router';
import { DiscussionService } from '../DiscussionService/discussion.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discussion-edit',
  templateUrl: './discussion-edit.component.html',
  styleUrls: ['./discussion-edit.component.css']
})

export class DiscussionEditComponent implements OnInit {
  constructor(private discussionService: DiscussionService,
              private location: Location,
              private router : Router) { }
  discussionToEdit : Discussion;

  ngOnInit() {
    this.discussionToEdit = this.discussionService.getDiscussionToEdit();
    if(this.discussionToEdit == null){
      // TODO: show error page here
      this.router.navigateByUrl('/dashboard');
    }
  }
  onSubmit(form : NgForm) {
    const updatedDiscussion = new Discussion(
      form.value.title,
      form.value.discussion,
      this.discussionToEdit.dateCreated,
      new Date(),
      this.discussionToEdit.discussionID
    );
    this.discussionService.updateDiscussion(updatedDiscussion)
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