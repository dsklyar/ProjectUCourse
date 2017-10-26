import { Assignment } from '../../models/assignment.model';
import { Question } from '../../models/question.model';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';


@Injectable()
export class AssignmentService{
  private assignments : Assignment[] = [
    { title : 'Assignment 1', description : 'blah 1',
      questions : [
        new Question('Question 1','do this 1'),
        new Question('Question 2','do this 2'),
        new Question('Question 3','do this 3'),
      ]
    },
    { title : 'Assignment 2', description : 'blah 2' },
    { title : 'Assignment 3', description : 'blah 3' }
  ]

  getAssignments(){
    console.log('get!');
    return this.assignments;
  }

}