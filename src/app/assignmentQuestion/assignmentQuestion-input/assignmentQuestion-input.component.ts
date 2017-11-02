import { AssignmentQuestionSeeder } from '../../models/seeders/assignmentQuestion.seeder';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ConfirmDialogService } from '../../dialog/confirmDialog.service';

import { Router } from '@angular/router';

import { Component } from '@angular/core';

@Component({
  selector: 'app-assignmentInputQuestion',
  templateUrl: './assignmentQuestion-input.component.html',
  styleUrls: ['./assignmentQuestion-input.component.css']
})

export class AssignmentQuestionInputComponent {
  questionForm: FormGroup;


  correctAnswer: string;
  selectedType: string;
  questionBody: string;
  numberOfChocies: number = 1;
  numberOfTries: number = 1;
  pointsLostPerTry: number = 1;
  pointsAvailable: number = 1;
  choiceArray = [];
  questionType = [
    { value: 'multipleChoice', viewValue: 'Multiple Choice' },
    { value: 'allThatApply', viewValue: 'All That Apply' },
    { value: 'fillInTheBlank', viewValue: 'Fill In The Blank' },
    { value: 'freeResponse', viewValue: 'Free Response' }
  ];
  step = 0;
  selectedAnswer: string;
  numberTriesUsed: number = 0;
  isCorrect: boolean = false;
  wasAttempted: boolean = false;

  dialogResult: any;

  constructor(private confirmDialogService: ConfirmDialogService,
    private formBuilder: FormBuilder) { this.createForm(); }

  createForm() {
    this.questionForm = this.formBuilder.group({

      questionProperties: this.formBuilder.group({
        questionType: ['', Validators.required],
        numberOfChoices: [1, Validators.min(1)],
        numberOfTries: [1, Validators.min(1)],
        pointsLostPerTry: [0, Validators.min(0)],
        pointsAvailable: [0, Validators.min(0)]
      }),
      questionHeader: this.formBuilder.group({
        questionTitle: ['', Validators.required],
        qustionDescription: ['']
      }),
      questionBody: this.formBuilder.group({
        body: ['', Validators.required]
      }),
      questionStructure: this.formBuilder.group({
        questionArray: this.formBuilder.array([]),
        autoGrade : [false, Validators.required]
      })
    });
  }

  setQuestionArray(assignmentQuestions : AssignmentQuestionSeeder[]){
    // TODO: 
    // Validation for if the question formating is correct
    const assignmentQuestionFormGroup = assignmentQuestions.map(address => this.formBuilder.group(address));
    const assignmentQuestionFormArray = this.formBuilder.array(assignmentQuestionFormGroup);
    this.questionForm.get('questionStructure').value.setControl('questionArray', assignmentQuestionFormArray);
  }

  openDialog() {
    this.confirmDialogService
      .confirm('Confirm Dialog', 'Are you sure you want to do this?')
      .subscribe(res => this.dialogResult = res);
  }

  getOnlyAnswers() {
    var retval = [];
    for (var _i = 0; _i < this.choiceArray.length; _i++) {
      if (this.choiceArray[_i].isAnswer === true) {
        retval.push(this.choiceArray[_i]);
      }
    }
    return retval;
  }
  generateChoices(num: number, dropArray: boolean) {
    if (dropArray) {
      this.setQuestionArray([]);  // set it to empty
      for (var _i = 0; _i < this.numberOfChocies; _i++) {
        this.choiceArray.push({
          choiceText: 'Enter Choice ' + (_i + 1), isAnswer: false,
          answerText: 'Enter Answer ' + (_i + 1), choiceNumber: _i
        });
      }
    } else {
      if (num > 0) {
        for (var _i = 0; _i < num; _i++) {
          this.choiceArray.push(
            {
              choiceText: 'Enter Choice ' + (this.choiceArray.length + 1), isAnswer: false,
              answerText: 'Enter Answer ' + (_i + 1), choiceNumber: this.choiceArray.length
            });
        }
      } else {
        this.choiceArray.splice(num, num * -1);
      }
    } 
    console.log(this.choiceArray);
    return this.choiceArray;
  }
  setStep(index: number) {
    switch (index) {
      case 3:
        if (this.choiceArray.length === 0) {
          this.generateChoices(this.numberOfChocies, true);
        }
        else if (this.choiceArray.length !== this.numberOfChocies) {
          this.generateChoices(this.numberOfChocies - this.choiceArray.length, false);
        }
        break;

      default:
        break;
    }
    this.step = index;
  }
  onTry() {
    switch (this.selectedType) {
      case "multipleChoice":
        if (this.selectedAnswer === this.correctAnswer) {
          this.wasAttempted = true;
          this.isCorrect = true;
        } else {
          this.wasAttempted = true;
          this.isCorrect = false;
          this.numberTriesUsed++;
        }
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
  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
