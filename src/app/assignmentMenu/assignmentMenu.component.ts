import { Router } from '@angular/router';
import { AssignmentQuestionService } from '../assignmentQuestion/assignmentQuestion-service/assignmentQuestion.service';
import { Assignment } from '../models/assignment.model';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-assignmentMenu',
  templateUrl: './assignmentMenu.component.html',
  styleUrls: ['/assignmentMenu.component.css']
})

export class AssignmentMenuComponent implements OnInit {
  assignmentID : string;

  constructor(private assignmentQuestionService : AssignmentQuestionService,
              private router : Router) { }

  onDelete() {

  }
  onEdit() {

  }
  ngOnInit(){
    this.assignmentQuestionService.setAssignmentID(this.assignmentID);
  }
}