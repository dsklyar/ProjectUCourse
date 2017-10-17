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
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
    logOut() {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
    getUser(userID: string) {
        return this.http.get('http://localhost:3000/user/' + userID)
            .map((response: Response) => response.json())
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
    setUser(user : User){
        console.log(user);
        this.user = user;
    }
}