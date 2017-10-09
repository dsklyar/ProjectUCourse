import { User } from '../models/user.model';
import { AuthenticationService } from './authService/authentication.service';
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';

@Component ({
    selector : 'app-signup',
    templateUrl: './signup.component.html',
    //styleUrls : ['./cardcss/card.css']
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;
    // TODO:
    // Somehow unite the valueof the types[] with
    // the backend user.js mongoose model's enum called userType
    // value here must match the enum in the mongoose model
    // andor be validated
    types = [
        {value: 'student', viewValue: 'Student'},
        {value: 'teacher', viewValue: 'Teacher'}
    ];

    constructor(private authService: AuthenticationService){}

    ngOnInit() {
        this.signupForm = new FormGroup({
            firstName: new FormControl(null,Validators.required),
            lastName: new FormControl(null,Validators.required),
            email: new FormControl(null,[
                Validators.required//,
                //Validators.pattern('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/')
            ]
            ),
            school: new FormControl(null,Validators.required),
            password: new FormControl(null,Validators.required),
            userType: new FormControl(null,Validators.required)
        });
    }
    onSubmit(){
        const user = new User(
            this.signupForm.value.email,
            this.signupForm.value.password,
            this.signupForm.value.firstName,
            this.signupForm.value.lastName,
            this.signupForm.value.school,
            this.signupForm.value.userType
        );
        this.authService.singUp(user)
        .subscribe(
            data => console.log(data),
            error => console.log(error)
        );
        this.signupForm.reset();
    }
}
