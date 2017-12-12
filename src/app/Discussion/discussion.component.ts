import { Router } from '@angular/router';
import { DiscussionService } from './DiscussionService/discussion.service';
import { Discussion } from '../models/discussion.model';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})

export class DiscussionComponent {
  @Input() discussion: Discussion;

  constructor(private discussionService: DiscussionService,
    private router: Router) { }

  onDelete() {
    this.discussionService.removeDiscussion(this.discussion)
      .subscribe(
      //result => console.log(result)
      );
  }
  onEdit() {
    this.router.navigateByUrl('/editdiscussion');
    this.discussionService.addDiscussionToEdit(this.discussion);
  }
}