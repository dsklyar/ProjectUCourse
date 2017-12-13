import { questionResponse } from '../../models/questionResponse.model'
import { questionResponseService } from '../questionResponse-service/questionResponse.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-questionResponse-input',
    templateUrl: '/questionResponse-input.component.html',
    styleUrls: ['/questionResponse-input.component.css']
})
export class questionResponseInputComponent implements OnInit {
    newquestionResponseForm: FormGroup;

    constructor(private questionResponseService: questionResponseService,
    private location: Location){}

    ngOnInit(){
        this.newquestionResponseForm = new FormGroup({
            title: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.required)
        });
    }
    onSubmit(){
        this.newquestionResponseForm.reset();
        this.location.back()
    }
    onGoBack() {
        this.location.back()
    }
}