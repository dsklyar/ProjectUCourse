import { AuthenticationService } from '../auth/authService/authentication.service';
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

  constructor(private assignmentQuestionService: AssignmentQuestionService,
    private router: Router,
    private authService: AuthenticationService) {
    this.authService.checkIfPreviouslyLoggedIn();
  }

  onDelete() {

  }
  onEdit() {
    //this.router.navigateByUrl('/editannouncement');
    //this.announcementService.addAnnouncementToEdit(this.announcement);
  }

  isInstructor() {
    return this.authService.userType == 'instructor'
  }
}