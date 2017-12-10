import {
    ChangeProfilePictureDialogComponent,
} from '../dialog/changeProfilePictureDialog/changeProfilePictureDialog.component';
import { ChangeProfilePictureDialogService } from '../dialog/changeProfilePictureDialog/changeProfilePictureDialog.service';
import { NgForm } from '@angular/forms/src/directives';
import { AuthenticationService } from '../auth/authService/authentication.service';
import { User } from '../models/user.model';
import { NgIf } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MdDialog} from '@angular/material';

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
        max-height: 150px;
        max-width: 150px;
        margin-left: auto;
        margin-right: auto;
    }
    .edit-icon{
        font-size: 24px;
        height: 24px;
        width:24px;
    }
    .icon-edit{	
        position: absolute;
        top: 153px;
        left: 59.5%;
        display: none;
    }
    .material-icons:hover .icon-edit{
        display: block;
    }
    #xbtn{
        position: absolute;
        right: 2px;
        top: 2px;
        height:24px;
        width:24px;
    }
    .text{
        margin-top: -25px;
    }
    .bio{
        margin-top: -15px;
        white-space: pre-line;
    }
    .discription{
        text-align: left;
    }
    .btn{
        position: absolute;
        right: 10px;
        top: 5px;
    }
    .hov {
        font-size: 34px;
    }
    .pic{
        font-size: 150px;   
        max-height: 150px;
        max-width: 150px;
        margin-left: auto;
        margin-right: auto;     
    }
    #textarea{
        width: 100%;
        text-align: center;
    }
    #textAreaFormField{
        width: 100%;
        margin-left: auto;
        margin-right: auto;
    }

    `]
})
export class ProfileComponent implements OnInit {

    user : User;
    isEditProfile = false;
    isChangeEmail = false;
    constructor(public dialog: MdDialog,
        private authService : AuthenticationService,
                private changeProfilePictureDialogService : ChangeProfilePictureDialogService) {
                    // NOTE:
                    // For Dylan with love from Daniel
                    // this should fix refrshing issue with user being lost
                    this.authService.checkIfPreviouslyLoggedIn();
                }

    ngOnInit() {
        // this is crap, pointers in js are trash or i just dont get how they work in js
        // i like the trash idea tho, makes me feel smart 
        //this.user = this.authService.user;
        this.user = new User('','','','','','',[],'');
    }


    onSubmit(form : NgForm){
        // get it again from the service
        this.user = this.authService.user;
        // or just directly use the one from service
        // i.e. this.authService.user.firstName
        const updatedUser = new User(
            form.value.email,
            this.user.password,
            this.user.firstName,
            this.user.lastName,
            this.user.schoolName,
            this.user.userType,
            this.user.courses,
            form.value.biography
        );
        this.authService.updateUser(updatedUser)
        .subscribe (
        data => {
            console.log(data);
            this.user.biography = data.obj.biography;
            this.user.email = data.obj.email;
        },
        error => console.log(error)
        );
    }
    changePic(){
        var x = document.getElementById("newPic");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }
    dialogResult : any;
    openDialog(){
        let dialogRef = this.dialog.open(ChangeProfilePictureDialogComponent,{
            data:{user: this.user}
        });
        
        dialogRef.afterClosed().subscribe((result:string) => {
            console.log(`Dialog closed: ${result}`);
            this.dialogResult = result;
            if(this.dialogResult === undefined){
                this.user.profilePic = this.user.profilePic;
            }
            else{
                this.user.profilePic = this.dialogResult;
            }
        });

    }
    
    
}