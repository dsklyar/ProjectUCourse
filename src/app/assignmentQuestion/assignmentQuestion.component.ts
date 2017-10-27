import { MathJaxDirective } from '../directives/mathJax/mathjax.directive';
import { AssignmentQuestionService } from './assignmentQuestion-service/assignmentQuestion.service';
import { AssignmentQuestion } from '../models/assignmentQuestion.model';

import { Router } from '@angular/router';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-assignmentQuestion',
  templateUrl: './assignmentQuestion.component.html',
  styleUrls: ['./assignmentQuestion.component.css']
})

export class AssignmentQuestionComponent {
  @Input() assignmentQuestion: AssignmentQuestion;
  someEq : string = '$$\\idotsint_V \\mu(u_1,\\dots,u_k) \\,du_1 \\dots du_k$$';

  constructor(private assignmentQuestionService: AssignmentQuestionService,
              private router: Router) { }

  onDelete() {

  }
  onEdit() {
    //this.router.navigateByUrl('/editannouncement');
    //this.announcementService.addAnnouncementToEdit(this.announcement);
  }
}