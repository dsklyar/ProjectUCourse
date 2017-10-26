import { AssignmentService } from './assignmentService/assignment.service';
import { Assignment } from '../models/assignment.model';
import { Router } from '@angular/router';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-assignment',
  templateUrl: '/assignment.component.html',
  styleUrls: ['/assignment.component.css']
})

export class AssignmentComponent {
  @Input() assignment: Assignment;

  constructor(private assignmentService: AssignmentService,
              private router: Router) { }

  onDelete() {

  }
  onEdit() {
    //this.router.navigateByUrl('/editannouncement');
    //this.announcementService.addAnnouncementToEdit(this.announcement);
  }
}