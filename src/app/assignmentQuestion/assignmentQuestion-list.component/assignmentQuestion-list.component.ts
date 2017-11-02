import { AssignmentQuestion } from '../../models/assignmentQuestion.model';
import { AssignmentQuestionService } from '../assignmentQuestion-service/assignmentQuestion.service';

import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-assignmentQuestion-list',
  templateUrl: './assignmentQuestion-list.component.html',
  styleUrls: ['./assignmentQuestion-list.component.css']
})


export class AssignmentQuestionListComponent implements OnInit {
  private assignmentQuestions: AssignmentQuestion[];

  constructor(private assignmentQuestionService : AssignmentQuestionService) {}

  ngOnInit() {
    this.assignmentQuestions = this.assignmentQuestionService.getAssignmentQuestions();
  }
}

