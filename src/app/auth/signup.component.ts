import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl,Validators } from '@angular/forms';

@Component ({
    selector : 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls : ['./cardcss/card.css']
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;

    onSubmit(){
        console.log(this.signupForm);
    }

    ngOnInit() {
        this.signupForm = new FormGroup({
            firstname: new FormControl(null,Validators.required),
            lastName: new FormControl(null,Validators.required),
            email: new FormControl(null,[
                Validators.required,
                Validators.pattern('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/')
            ]
            ),
            school: new FormControl(null,Validators.required),
            password: new FormControl(null,Validators.required)
        });
    }
}
