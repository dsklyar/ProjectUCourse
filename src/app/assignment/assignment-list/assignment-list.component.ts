import { AssignmentService } from '../assignmentService/assignment.service';

import { Assignment } from '../../models/assignment.model'
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})


export class AssignmentListComponent implements OnInit {
  private assignments: Assignment[];

  constructor(private assignmentService : AssignmentService) { console.log('created!');}

  ngOnInit() {
    this.assignments = this.assignmentService.getAssignments();
  }
}

