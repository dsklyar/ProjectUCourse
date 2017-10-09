import { Router } from '@angular/router';
import { AuthenticationService } from './authService/authentication.service';
import {Component} from '@angular/core';

@Component ({
    selector : 'app-logout',
    templateUrl: './logout.component.html',
    styles : [
        ``
    ]
})
export class LogoutComponent {
    constructor(private authService : AuthenticationService,
                private router : Router) {
                    this.onLogout();
                }
    onLogout(){
        this.authService.logOut();
        this.router.navigateByUrl('/signin');
    }
}