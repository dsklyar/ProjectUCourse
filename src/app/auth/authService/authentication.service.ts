import { environment } from '../../../environments/environment';
import { resolve } from 'url';

import { User } from '../../models/user.model';
import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    // TODO:
    // Somehow unite the valueof the types[] with
    // the backend user.js mongoose model's enum called userType
    // value here must match the enum in the mongoose model
    // andor be validated
    types = [
        {value: 'student', viewValue: 'Student'},
        {value: 'instructor', viewValue: 'Instructor'},
        {value: 'undefined', viewValue: 'Undefined'}
    ];

    public userType : string = 'undefined';

    
    user: User;

    singUp(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(environment.baseUrl + '/user', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
    singIn(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(environment.baseUrl + '/user/signin', body, { headers: headers })
            .map((response: Response) => {
                const data = response.json();
                // this is how to return data from annonymous function
                return data;
            })
            .catch((error: Response) => Observable.throw(error.json()))
            .share();
    }
    logOut() {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
    getUser(userID: string) {
        return this.http.get(environment.baseUrl + '/user/' + userID)
            .map((response: Response) => {
                const data = response.json();
                // initialize user in auth service
                this.user = new User(
                    data.obj.email,
                    data.obj.password,
                    data.obj.firstName,
                    data.obj.lastName,
                    data.obj.schoolName,
                    data.obj.userType,
                    data.obj.courses,
                    data.obj.biography
                )
                this.userType = this.user.userType;
                console.log(this.user.userType);
                return data;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
    updateUser(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.patch(environment.baseUrl + '/user/'
            + localStorage.getItem('userId')
            //+ localStorage.getItem('token')
            , body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
    // NOTE: 
    // Use this in case if page is refreshed and needs user information
    // put this in component constructor, so once component is initialized
    // it async gets user ONCE, and sets up the values
    checkIfPreviouslyLoggedIn() {
        if (this.user != null) {
            console.log(this.user.userType + " still here");
            return true;
        } else {
            var userId = localStorage.getItem('userId');
            if (userId != null) {
                return this.getUser(userId)
                    .subscribe(
                    result => {
                        console.log(this.user.userType + ' got from service again');
                        return true;
                    },
                    error => {
                        console.log('failed to get it from service');
                        return false;
                    }
                    );
            } else {
                console.log('nope!');
                return false;
            }
        }
    }
}