import { AssignmentQuestion } from '../../models/assignmentQuestion.model';
import { AssignmentQuestionService } from '../assignmentQuestion-service/assignmentQuestion.service';
import { AssignmentQuestionSeeder } from '../../models/seeders/assignmentQuestion.seeder';

import { FormArray, FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ConfirmDialogService } from '../../dialog/confirmDialog.service';

import { Router } from '@angular/router';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-assignmentQuestion-test',
  templateUrl: './assignmentQuestion-test.component.html',
  styleUrls: ['./assignmentQuestion-test.component.css']
})
export class AssignmentQuestionTestComponent {
  @Input() questionForm: FormGroup;
  numberTriesUsed: number = 0;
  wasAttempted: boolean = false;
  isCorrect: boolean = false;

  constructor(private confirmDialogService: ConfirmDialogService,
    private assignmentQuestionService: AssignmentQuestionService) { }

  get pointsAvailable(): number {
    return this.questionForm.get('questionProperties.pointsAvailable').value as number;
  }
  get pointsLostPerTry(): number {
    return this.questionForm.get('questionProperties.pointsLostPerTry').value as number;
  }
  get numberOfTries(): number {
    return this.questionForm.get('questionProperties.numberOfTries').value as number;
  }
  get numberOfChoices(): number {
    return this.questionForm.get('questionProperties.numberOfChoices').value as number;
  }
  get questionType(): FormControl {
    return this.questionForm.get('questionProperties.questionType') as FormControl;
  }
  get questionTitle(): string {
    return this.questionForm.get('questionHeader.questionTitle').value as string;
  }
  get qustionDescription(): string {
    return this.questionForm.get('questionHeader.qustionDescription').value as string;
  }
  get questionBody(): string {
    return this.questionForm.get('questionBody.body').value as string;
  }
  get questionArray(): FormArray {
    console.log(this.questionForm.get('questionStructure.questionArray'));
    return this.questionForm.get('questionStructure.questionArray') as FormArray;
  };

  onRadioGroupChange(e) {
    if (e) {
      const numberOfChoices = this.numberOfChoices
      for (var index = 0; index < numberOfChoices; index++) {
        this.questionArray.controls[index].value.studentAnswer = false;
      }
      if (numberOfChoices > e.value) {
        this.questionArray.controls[e.value].value.studentAnswer = true;
      }
    }
  }

  isAnswer() {
    switch (this.questionType.value) {
      case "multipleChoice":
        for (var index = 0; index < this.numberOfChoices; index++) {
          if (this.questionArray.controls[index].value.isAnswer &&
            this.questionArray.controls[index].value.studentAnswer as boolean) {
            return true;
          }
        }
        break;
      case "allThatApply":
        for (var index = 0; index < this.numberOfChoices; index++) {
          if (this.questionArray.controls[index].value.isAnswer !=
            this.questionArray.controls[index].value.studentAnswer) {
            if (this.questionArray.controls[index].value.studentAnswer != null) {
              return false;
            }
          }
        }
        return true;
      case "fillInTheBlank":
        for (var index = 0; index < this.numberOfChoices; index++) {
          if (this.questionArray.controls[index].value.answerText !=
            this.questionArray.controls[index].value.studentAnswer) {
            return false;
          }
        }
        return true;
      default:
        return false;
    }
    return false;
  }
  onTry() {
    switch (this.questionType.value) {
      case "multipleChoice":
        if (this.isAnswer()) {
          this.wasAttempted = true;
          this.isCorrect = true;
        } else {
          this.wasAttempted = true;
          this.isCorrect = false;
          this.numberTriesUsed++;
        }
        break;
      case "allThatApply":
        if (this.isAnswer()) {
          this.wasAttempted = true;
          this.isCorrect = true;
        } else {
          this.wasAttempted = true;
          this.isCorrect = false;
          this.numberTriesUsed++;
        }
        break;
      case "fillInTheBlank":
        if (this.isAnswer()) {
          this.wasAttempted = true;
          this.isCorrect = true;
        } else {
          this.wasAttempted = true;
          this.isCorrect = false;
          this.numberTriesUsed++;
        }
        break;
      case "freeResponse":
        this.wasAttempted = true;
        this.isCorrect = true;
        break;
      default:
        break;
    }
  }
  onReset() {
    this.numberTriesUsed = 0;
    this.wasAttempted = false;
    this.isCorrect = false;
    this.numberTriesUsed = 0;
  }

  dialogResult: any;
  openDialog() {
    this.confirmDialogService
      .confirm('Confirm Dialog', 'Are you sure you want to do this?')
      .subscribe(res => {
        this.dialogResult = res;
        if (this.dialogResult == true) {
          const newaq = new AssignmentQuestion(
            this.questionForm.get('questionHeader.questionTitle').value,
            this.questionForm.get('questionHeader.qustionDescription').value,
            this.questionForm.get('questionProperties.questionType').value,
            this.questionForm.get('questionProperties.numberOfChoices').value,
            this.questionForm.get('questionProperties.numberOfTries').value,
            this.questionForm.get('questionProperties.pointsLostPerTry').value,
            this.questionForm.get('questionProperties.pointsAvailable').value,
            this.questionForm.get('questionBody.body').value,
            [{}],
            new Date(),
            new Date()
          )
          const arr = this.questionArray.controls;
          for (var index = 0; index < this.numberOfChoices; index++) {
            const choice = arr[index].value;
            newaq.questionArray.push({
              choiceText: choice.choiceText,
              answerText: choice.answerText,
              isAnswer: choice.isAnswer,
              choiceNumber: choice.choiceNumber
            });
          }
          console.log(newaq);
          this.assignmentQuestionService.addAssignmentQuestion(newaq)
            .subscribe(
            data => console.log(data),
            error => console.log(error)
            );
        }
      });
  }
}