import { AuthenticationService } from '../auth/authService/authentication.service';
import { User } from '../models/user.model';

import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';

@Component ({
    selector : 'app-profile',
    templateUrl: './profile.component.html',
    styles: ['']
})
export class ProfileComponent implements OnInit {
    profileForm: FormGroup;
    private user: User;
    //@Input() user:User might need
    constructor(private authService: AuthenticationService){}

    ngOnInit() {
        this.user = this.authService.getUser();
    }
    onEdit(){//send edit to database

    }
    onChangeEmail(){//send changed email to database

    }
    onChangePass(){//send changed password to database... hopefully

    }
}