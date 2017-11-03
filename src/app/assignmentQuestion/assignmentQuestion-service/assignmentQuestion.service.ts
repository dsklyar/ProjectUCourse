import { AssignmentQuestion } from '../../models/assignmentQuestion.model';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';


@Injectable()
export class AssignmentQuestionService{
  private assignmentID : string;
  private assignmentQuestions : AssignmentQuestion[] = [];

  getAssignmentQuestions(){
    return this.assignmentQuestions;
  }
  setAssignmentID(assignmentID : string){
    this.assignmentID = assignmentID;
  }
  addAssignmentQuestion(){
    
  }
}