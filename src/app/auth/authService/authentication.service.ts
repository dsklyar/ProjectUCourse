import { User } from '../../models/user.model';
import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http){}
    singUp(user: User){
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type':'application/json'});
        return this.http.post('http://localhost:3000/user',body,{headers:headers})
            .map((response : Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
    singIn(user: User){
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type':'application/json'});
        return this.http.post('http://localhost:3000/user/signin',body,{headers:headers})
            .map((response : Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
    logOut(){
        localStorage.clear();
    }

    isLoggedIn(){
        return localStorage.getItem('token') !== null;
    }
}