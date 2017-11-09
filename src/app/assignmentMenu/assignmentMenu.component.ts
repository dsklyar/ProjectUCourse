import { AssignmentService } from '../assignment/assignmentService/assignment.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  assignment : Assignment;

  constructor(private assignmentQuestionService : AssignmentQuestionService,
              private assignmentService : AssignmentService,
              private router : Router,
              private activatedRoute : ActivatedRoute) { }

  onDelete() {

  }
  onEdit() {

  }
  ngOnInit(){
    this.activatedRoute.paramMap
    .subscribe(params => {
      this.assignmentID = params.get('assignmentID');
    })
    this.assignmentQuestionService.setAssignmentID(this.assignmentID);

    // get name
    this.assignment = this.assignmentService.getSelectedAssignment()
  }
}