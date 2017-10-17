import { AuthenticationService } from '../auth/authService/authentication.service';
import { User } from '../models/user.model';
import { NgIf } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component ({
    selector : 'app-profile',
    templateUrl: './profile.component.html',
    styles: [`
    .example-card {
        max-width: 600px;
        margin-top: 10px;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
      }
    .material-icons{
        font-size: 150px;
        height: 150px;
        width: 150px;
        margin-left: auto;
        margin-right: auto;
    }
    .edit-icon{
        font-size: 24px;
        height: 24px;
        width:24px;
    }
    .text{
        margin-top: -25px;
    }
    .bio{
        margin-top: -15px;
    }
    .discription{
        text-align: left;
    }
    .btn{
        position: absolute;
        right: 10px;
        top: 5px;
    }

    
    `]
})
export class ProfileComponent implements OnInit {
    newBio: FormGroup;
    newEmail:FormGroup;

    ngOnInit() {
      this.newBio = new FormGroup({
        userbio: new FormControl(null, Validators.required)
      });
      this.newEmail = new FormGroup({
        email: new FormControl(null, Validators.required)
      });
    }

   
   
}