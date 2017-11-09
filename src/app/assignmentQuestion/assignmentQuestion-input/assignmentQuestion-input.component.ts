import { LanguageService } from '@angular/language-service';
import { AssignmentQuestionSeeder } from '../../models/seeders/assignmentQuestion.seeder';
import { FormArray, FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ConfirmDialogService } from '../../dialog/confirmDialog.service';

import { Router } from '@angular/router';

import { Component } from '@angular/core';

@Component({
  selector: 'app-assignmentQuestion-input',
  templateUrl: './assignmentQuestion-input.component.html',
  styleUrls: ['./assignmentQuestion-input.component.css']
})

export class AssignmentQuestionInputComponent {
  questionForm: FormGroup;
  step = 0;
  questionType = [
    { value: 'multipleChoice', viewValue: 'Multiple Choice' },
    { value: 'allThatApply', viewValue: 'All That Apply' },
    { value: 'fillInTheBlank', viewValue: 'Fill In The Blank' },
    { value: 'freeResponse', viewValue: 'Free Response' }
  ];

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
        autoGrade: [false, Validators.required]
      })
    });
  }
  setQuestionChoiceArray(assignmentQuestions: AssignmentQuestionSeeder[]) {
    // TODO: 
    // Validation for if the question formating is correct
    const assignmentQuestionFormGroup = assignmentQuestions.map(address => this.formBuilder.group(address));
    const assignmentQuestionFormArray = this.formBuilder.array(assignmentQuestionFormGroup);
    this.questionForm.setControl('questionStructure.questionArray', assignmentQuestionFormArray);
  }
  addQuestionChoice(newQuestionChoice: AssignmentQuestionSeeder) {
    this.questionArray.push(this.formBuilder.group(newQuestionChoice));
  }
  get questionArray(): FormArray {
    return this.questionForm.get('questionStructure.questionArray') as FormArray;
  };
  get questionTypeValue(): FormControl {
    return this.questionForm.get('questionProperties.questionType') as FormControl;
  };

  onRadioGroupChange(e) {
    if (e) {
      const numberOfChoices = this.questionForm.get('questionProperties.numberOfChoices').value;
      for (var index = 0; index < numberOfChoices; index++) {
        this.questionArray.controls[index].value.isAnswer = false;
      }
      if(numberOfChoices > e.value){
        this.questionArray.controls[e.value].value.isAnswer = true;
      }
    }
  }

  generateChoices(num: number, dropArray: boolean) {
    if (dropArray) {
      this.setQuestionChoiceArray([]);  // set it to empty
      const numberOfChoices = this.questionForm.get('questionProperties.numberOfChoices').value;
      for (var i = 0; i < numberOfChoices; i++) {
        this.addQuestionChoice(
          new AssignmentQuestionSeeder(
            'Enter Choice ' + (i + 1),
            false,
            'Enter Answer ' + (i + 1),
            i
          ));
      }
    } else {
      if (num > 0) {
        for (var _i = 0; _i < num; _i++) {
          this.addQuestionChoice(
            new AssignmentQuestionSeeder(
              'Enter Choice ' + (this.questionArray.length + 1),
              false,
              'Enter Answer ' + (i + 1),
              this.questionArray.length
            ));
        }
      } else {
        this.questionArray.controls.splice(num, num * -1);
      }
    }
  }

  setStep(index: number) {
    const numberOfChoices = this.questionForm.get('questionProperties.numberOfChoices').value;
    switch (index) {
      case 3:
        if (this.questionArray.length === 0) {
          this.generateChoices(numberOfChoices, true);
        }
        else if (this.questionArray.length !== numberOfChoices) {
          this.generateChoices(numberOfChoices - this.questionArray.length, false);
        }
        break;

      default:
        break;
    }
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
  openDialog() {
    this.confirmDialogService
      .confirm('Confirm Dialog', 'Are you sure you want to do this?')
      .subscribe(res => this.dialogResult = res);
  }
}
