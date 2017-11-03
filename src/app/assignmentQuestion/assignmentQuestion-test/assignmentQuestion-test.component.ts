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

  constructor(private confirmDialogService: ConfirmDialogService) { this.generateStudentChoiceArray(); }

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

  studentChoiceAray: any[] = [];
  generateStudentChoiceArray() {
    const source: AssignmentQuestionSeeder[] = this.getArray();
    for (var index = 0; index < source.length; index++) {
      this.studentChoiceAray.push(
        {
          choiceText: source[index].choiceText,
          studentAnswer: '',
          answerText: source[index].answerText,
          choiceNumber: source[index].choiceNumber,
          isAnswer: source[index].isAnswer
        }
      );
    }
  }
  onRadioGroupChange(e) {
    if (e) {
      const numberOfChoices = this.numberOfChoices
      for (var index = 0; index < numberOfChoices; index++) {
        this.studentChoiceAray[index].studentAnswer = false;
      }
      if (numberOfChoices > e.value) {
        this.studentChoiceAray[e.value].studentAnswer = true;
      }
    }
  }

  getArray() {
    const arr = this.questionArray.controls;
    const retval: AssignmentQuestionSeeder[] = [];
    for (var index = 0; index < arr.length; index++) {
      retval.push(arr[index].value);
    }
    console.log(retval);
    return retval;
  }
  getAnswer() {
    const array: AssignmentQuestionSeeder[] = [];
    switch (this.questionType.value) {
      case "multipleChoice":
        for (var index = 0; index < this.questionArray.length; index++) {
          const o = this.questionArray.controls[index].value;
          if (o.isAnswer) {
            array.push(o);
          }
        }
        return array;
      case "allThatApply":
        for (var index = 0; index < this.questionArray.length; index++) {
          const o = this.questionArray.controls[index].value;
          if (o.isAnswer) {
            array.push(o);
          }
        }
        return array;
      default:
        break;
    }
    return array;
  }
  onTry() {
    const answers: AssignmentQuestionSeeder[] = this.getAnswer();
    switch (this.questionType.value) {
      case "multipleChoice":
        // if (answers.length === 1) {
        //   if (this.questionArray.controls[this.selectedAnswerIndex].value.choiceText == answers[0].choiceText) {
        //     this.wasAttempted = true;
        //     this.isCorrect = true;
        //   } else {
        //     this.wasAttempted = true;
        //     this.isCorrect = false;
        //     this.numberTriesUsed++;
        //   }
        // }
        break;
      case "allThatApply":
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
      .subscribe(res => this.dialogResult = res);
  }

}