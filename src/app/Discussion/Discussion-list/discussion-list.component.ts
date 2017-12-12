import { DiscussionService } from '../DiscussionService/discussion.service';
import { Discussion } from '../../models/discussion.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-discussion-list',
  templateUrl: './discussion-list.component.html',
  styleUrls: ['./discussion-list.component.css']
})


export class DiscussionListComponent implements OnInit {
  private discussions: Discussion[];

  constructor(private discussionService: DiscussionService) { }

  ngOnInit() {
    this.discussionService.refreshDiscussions()
      .subscribe(
      (discussions: Discussion[]) => {
        this.discussions = discussions;
      },
      error => console.log(error)
      );
  }
}

