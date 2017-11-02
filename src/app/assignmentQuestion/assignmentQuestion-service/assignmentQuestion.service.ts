import { AssignmentQuestion } from '../../models/assignmentQuestion.model';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';


@Injectable()
export class AssignmentQuestionService{
  private assignmentID : string;
  private assignmentQuestions : AssignmentQuestion[] = [
    { title : 'Question 1', description : 'Do jumpy jacks.', dateUpdated: new Date() },
    { title : 'Question 2', description : 'Do runny runs.', dateUpdated: new Date() },
    { title : 'Question 3', description : 'Do sleepy slaps.', dateUpdated: new Date() },
  ]

  getAssignmentQuestions(){
    return this.assignmentQuestions;
  }
  setAssignmentID(assignmentID : string){
    this.assignmentID = assignmentID;
  }

}