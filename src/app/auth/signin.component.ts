import { Router } from '@angular/router';
import { AuthenticationService } from './authService/authentication.service';
import { User } from '../models/user.model';
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl,Validators } from '@angular/forms';

@Component ({
    selector : 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls : ['./cardcss/card.css']
})
export class SigninComponent implements OnInit {
    signinForm: FormGroup;
     constructor(private authService : AuthenticationService,
                 private router : Router) {}
        ngOnInit() {
            this.signinForm = new FormGroup({
                email: new FormControl(null,[
                    Validators.required//,
                    //Validators.pattern('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/')
                ]
                ),
                password: new FormControl(null,Validators.required)
            });
        }
    onSubmit(){
        const user = new User(
            this.signinForm.value.email,
            this.signinForm.value.password);
        this.authService.singIn(user)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    this.authService.getUser(data.userId)
                    .subscribe(
                        data => {
                            this.authService.setUser(new User(
                                data.obj.email,
                                data.obj.password,
                                data.obj.firstName,
                                data.obj.lastName,
                                data.obj.schoolName,
                                data.obj.userType,
                                data.obj.courses,
                                data.obj.biography
                            ))
                        },
                        error => console.log(error)
                    )
                    this.router.navigateByUrl('/dashboard');
                },
                error => console.log(error)
            );
        this.signinForm.reset();
    }
}