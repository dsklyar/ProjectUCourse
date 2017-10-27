import { Assignment } from '../../models/assignment.model';
import { AssignmentService } from '../assignmentService/assignment.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignment-input',
  templateUrl: './assignment-input.component.html',
  styleUrls: ['./assignment-input.component.css']
})

export class AssignmentInputComponent implements OnInit {
  checked = false;
  newAssignmentForm: FormGroup;
  constructor(private assignmentService: AssignmentService,
              private location: Location) { }
  ngOnInit() {
    this.newAssignmentForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      dateDue: new FormControl(null, Validators.required),
      timeAvailable: new FormControl(0, Validators.required),
    });
  }
  onSubmit() {
    this.assignmentService.addAssignment(
      new Assignment(
        this.newAssignmentForm.controls['title'].value,
        this.newAssignmentForm.controls['description'].value,
        this.newAssignmentForm.controls['timeAvailable'].value,
        this.newAssignmentForm.controls['dateDue'].value
      ))
      .subscribe(
      data => console.log(data),
      error => console.log(error)
      );
    this.newAssignmentForm.reset();
    this.location.back()
  }
  onGoBack() {
    this.location.back()
  }
}