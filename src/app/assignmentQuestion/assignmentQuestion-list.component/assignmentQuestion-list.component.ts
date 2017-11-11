import { AssignmentQuestionStudentTemplate } from '../../models/template/assignmentQuestionStudent.template';
import { AssignmentQuestionAnswer } from '../../models/assignmentQuestionAnswer.model';
import { AssignmentQuestion } from '../../models/assignmentQuestion.model';
import { AssignmentQuestionService } from '../assignmentQuestion-service/assignmentQuestion.service';

import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-assignmentQuestion-list',
  templateUrl: './assignmentQuestion-list.component.html',
  styleUrls: ['./assignmentQuestion-list.component.css']
})


export class AssignmentQuestionListComponent implements OnInit {
  public assignmentQuestions: AssignmentQuestion[] = [];
  public assignmentQuestionAnswers: AssignmentQuestionAnswer[] = [];
  public assignmentQuestionStudentArray: AssignmentQuestionStudentTemplate[] = [];

  constructor(private assignmentQuestionService: AssignmentQuestionService) { }

  ngOnInit() {
    this.assignmentQuestionService.refreshAssignmentQuestionAnswers()
      .subscribe(
      (assignmentQuestionAnswers: AssignmentQuestionAnswer[]) => {
        this.assignmentQuestionAnswers = assignmentQuestionAnswers;
        this.assignmentQuestionService.refreshAssignmentQuestions()
          .subscribe(
          (assignmentQuestions: AssignmentQuestion[]) => {
            this.assignmentQuestions = assignmentQuestions;
            this.generateAssignmentQuestionStudentArray();
          },
          error => console.log(error)
          );
      },
      error => console.log(error)
      );
  }
  generateAssignmentQuestionStudentArray() {
    // iterate true each assignmentQuestion 
    for (var i = 0; i < this.assignmentQuestions.length; i++) {
      // blank object for student answer
      var blankAnswer: any;
      var aqs = new AssignmentQuestionStudentTemplate(
        this.assignmentQuestions[i],
        new AssignmentQuestionAnswer(
          // HACK:
          // fix this
          localStorage.getItem('userId'),
          this.assignmentQuestions[i].assignmentQuestionID,
          blankAnswer,
          0,
          this.assignmentQuestions[i].pointsAvailable,
          false,
          new Date(),
          // HACK:
          // WHEN REFRESHED THIS DIES
          this.assignmentQuestionService.assignmentID,
          ''
        ));
      this.assignmentQuestionStudentArray.push(aqs);
    }
    for(var i = 0; i < this.assignmentQuestionAnswers.length; i++){
      for(var j = 0; j < this.assignmentQuestions.length; j++){
        if(this.assignmentQuestionAnswers[i].assignmentQuestionID ==
           this.assignmentQuestions[j].assignmentQuestionID){
          this.assignmentQuestionStudentArray[j].assignmentQuestionAnswer
          = this.assignmentQuestionAnswers[i];
        }
      }
    }
  }
}

