import { AssignmentQuestionStudentTemplate } from '../models/template/assignmentQuestionStudent.template';
import { AssignmentQuestionAnswer } from '../models/assignmentQuestionAnswer.model'
import { AssignmentQuestionBasicAnswerTemplate } from '../models/template/assignmentQuestionBasicAnswer.template';
import { AuthenticationService } from '../auth/authService/authentication.service';
import { MathJaxDirective } from '../directives/mathJax/mathjax.directive';
import { AssignmentQuestionService } from './assignmentQuestion-service/assignmentQuestion.service';

import { Router } from '@angular/router';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignmentQuestion',
  templateUrl: './assignmentQuestion.component.html',
  styleUrls: ['./assignmentQuestion.component.css']
})

export class AssignmentQuestionComponent implements OnInit {
  @Input() assignmentQuestionStudent: AssignmentQuestionStudentTemplate;
  answerObject: any;
  disabled: boolean = false;

  constructor(private assignmentQuestionService: AssignmentQuestionService,
    private router: Router,
    private authService: AuthenticationService) {
    // NOTE:
    // Constructor is called before ngOnInit()
    this.authService.checkIfPreviouslyLoggedIn();
  }

  ngOnInit() {
    console.log('in component after all');
    this.createAnswerObject();
    this.generateAnswer();
    if (this.isCompleted()) { this.disabled = true; }
    console.log(this.assignmentQuestionStudent);
  }

  createAnswerObject() {
    // NOTE:
    // In future using switch cases
    // here I can extend type of answers
    // this form can build

    // MULTIPLE CHOICE VERSION

    // Initiate the studentAnswerOBject to an empty array and populate with template
    if (this.assignmentQuestionStudent.assignmentQuestion.questionType != null) {
      console.log(this.assignmentQuestionStudent.assignmentQuestion.questionType);
      console.log(this.assignmentQuestionStudent.assignmentQuestionAnswer.studentAnswerObject);
      if (this.assignmentQuestionStudent.assignmentQuestionAnswer.studentAnswerObject == null) {
        switch (this.assignmentQuestionStudent.assignmentQuestion.questionType) {
          case 'multipleChoice':
            this.assignmentQuestionStudent.assignmentQuestionAnswer.studentAnswerObject = [];
            this.assignmentQuestionStudent.assignmentQuestion.questionArray.forEach((choice: any) =>
              this.assignmentQuestionStudent.assignmentQuestionAnswer.studentAnswerObject.push(
                { studentAnswer: false }));
            break;
          case 'allThatApply':
            this.assignmentQuestionStudent.assignmentQuestionAnswer.studentAnswerObject = [];
            this.assignmentQuestionStudent.assignmentQuestion.questionArray.forEach((choice: any) =>
              this.assignmentQuestionStudent.assignmentQuestionAnswer.studentAnswerObject.push(
                { studentAnswer: false }));
            break;
          case 'fillInTheBlank':
            this.assignmentQuestionStudent.assignmentQuestionAnswer.studentAnswerObject = [];
            this.assignmentQuestionStudent.assignmentQuestion.questionArray.forEach((choice: any) =>
              this.assignmentQuestionStudent.assignmentQuestionAnswer.studentAnswerObject.push(
                { studentAnswer: '' }));
            break;

          default:
            break;
        }
      }
    }
  }

  onRadioGroupChange(e) {

    // NOTE:
    // In future using switch cases
    // here I can extend type of answers
    // this form can build

    //if completed do not allow changes
    if (!this.isCompleted()) {
      if (e) {
        for (var index = 0; index < this.assignmentQuestionStudent.assignmentQuestion.numberOfChoices; index++) {
          this.assignmentQuestionStudent.assignmentQuestionAnswer.studentAnswerObject[index].studentAnswer = false;
        }
        if (this.assignmentQuestionStudent.assignmentQuestion.numberOfChoices > e.value) {
          this.assignmentQuestionStudent.assignmentQuestionAnswer.studentAnswerObject[e.value].studentAnswer = true;
        }
      }
    }
  }

  isCompleted(): boolean {
    return this.assignmentQuestionStudent.assignmentQuestionAnswer.completed;
  }
  generateAnswer() {
    switch (this.assignmentQuestionStudent.assignmentQuestion.questionType) {
      case 'multipleChoice':
        if (this.isCompleted()) {
          for (var i = 0; i < this.assignmentQuestionStudent.assignmentQuestion.questionArray.length; i++) {
            if (this.assignmentQuestionStudent.assignmentQuestion.questionArray[i].isAnswer) {
              this.answerObject = i;
              break;
            }
          }
        } else {
          for (var i = 0; i < this.assignmentQuestionStudent.assignmentQuestionAnswer.studentAnswerObject.length; i++) {
            if (this.assignmentQuestionStudent.assignmentQuestionAnswer.studentAnswerObject[i].studentAnswer) {
              this.answerObject = i;
              break;
            }
          }
        }
        break;
      case 'allThatApply':
        this.answerObject = [];
        if (this.isCompleted()) {
          for (var i = 0; i < this.assignmentQuestionStudent.assignmentQuestion.questionArray.length; i++) {
            if (this.assignmentQuestionStudent.assignmentQuestion.questionArray[i].isAnswer) {
              this.answerObject.push({ Answer: true })
            } else {
              this.answerObject.push({ Answer: false })
            }
          }
        } else {
          for (var i = 0; i < this.assignmentQuestionStudent.assignmentQuestionAnswer.studentAnswerObject.length; i++) {
            this.answerObject.push({ Answer: this.assignmentQuestionStudent.assignmentQuestionAnswer.studentAnswerObject[i].studentAnswer })
          }
        }
        break;
      case 'fillInTheBlank':
        this.answerObject = [];
        if (this.isCompleted()) {
          for (var i = 0; i < this.assignmentQuestionStudent.assignmentQuestion.questionArray.length; i++) {
            this.answerObject.push({
              Answer : this.assignmentQuestionStudent.assignmentQuestion.questionArray[i].answerText
            });
          }
        } else {
          for (var i = 0; i < this.assignmentQuestionStudent.assignmentQuestionAnswer.studentAnswerObject.length; i++) {
            this.answerObject.push({
              Answer : this.assignmentQuestionStudent.assignmentQuestionAnswer.studentAnswerObject[i].answerText
            });
          }
        }
        break;

      default:
        break;
    }
  }
  onTry() {
    this.assignmentQuestionService.gradeAssignmentQuestion(this.assignmentQuestionStudent)
      .subscribe(
      data => {
        this.assignmentQuestionStudent.assignmentQuestionAnswer = data;
        if (this.isCompleted()) {
          this.disabled = true;
          this.generateAnswer();
        }
        console.log(this.assignmentQuestionStudent);
      },
      error => console.log(error)
      );
  }
  onDelete() {

  }
  onEdit() {
    //this.router.navigateByUrl('/editannouncement');
    //this.announcementService.addAnnouncementToEdit(this.announcement);
  }

  isInstructor() {
    return this.authService.userType == 'instructor'
  }
}