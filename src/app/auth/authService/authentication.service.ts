import { resolve } from 'url';

import { User } from '../../models/user.model';
import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }
    user: User;
    singUp(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('http://localhost:3000/user', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
    singIn(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('http://localhost:3000/user/signin', body, { headers: headers })
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
        return this.http.get('http://localhost:3000/user/' + userID)
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
                console.log(this.user.userType);
                return data;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
    updateUser(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.patch('http://localhost:3000/user/'
            + localStorage.getItem('userId')
            //+ localStorage.getItem('token')
            , body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
    // NOTE:
    // All of the funvtions below
    // Get the user type REGARDLESS if page was refreshed
    // Because the user token might still be in the browser memory
    // I can use that to get the login infomation about that user
    // instead of making them login again, (notice how I used proper pronouns for all ya special snowflakes :^) )
    isStudent() {
        if (this.isPreviouslyLoggedIn()) {
            return this.user.userType == 'student'
        }
    }
    isInstructor() {
        if (this.isPreviouslyLoggedIn()) {
            return this.user.userType == 'instructor'
        }
    }
    isAdmin() {
        if (this.isPreviouslyLoggedIn()) {
            return this.user.userType == 'admin'
        }
    }
    // NOTE: 
    // This somehow syncronously gets the user information
    // if the token did not expire
    private isPreviouslyLoggedIn() {
        if (this.user != null) {
            console.log(this.user.userType + " still here");
            return true;
        } else {
            var userId = localStorage.getItem('userId');
            if (userId != null) {
                this.getUser(userId)
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