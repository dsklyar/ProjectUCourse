import { CurrentActivatedRouteService } from '../../sharedServices/currentActivatedRoute.service';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from '../assignmentService/assignment.service';

import { Assignment } from '../../models/assignment.model'
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})


export class AssignmentListComponent implements OnInit {
  public assignments: Assignment[];

  constructor(private assignmentService : AssignmentService,
              private thisRoute : ActivatedRoute,
              private currentActivatedRouteService : CurrentActivatedRouteService) {}

  ngOnInit() {
    console.log(this.thisRoute.snapshot.url[0].path);
    this.currentActivatedRouteService
    .setCurrentActivatedRoute(this.thisRoute.snapshot.url[0].path);
    this.assignmentService.refreshAssignments()
    .subscribe(
      (assignments: Assignment[]) => {
        this.assignments = assignments;
      },
      error => console.log(error)
    );
  }
}

