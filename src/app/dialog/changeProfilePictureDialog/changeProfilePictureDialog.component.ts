import { NgModel } from '@angular/forms/src/directives';
import * as console from 'console';
import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'confirm-dialog',
    templateUrl: './changeProfilePictureDialog.component.html',
    styles: [`
    label > input{ /* HIDE RADIO */
        visibility: hidden; /* Makes input not-clickable */
        position: absolute; /* Remove input from document flow */
    }
    label > input + img{ /* IMAGE STYLES */
        cursor:pointer;
        border:2px solid transparent;
    }
    label > input:checked + img{ /* (RADIO CHECKED) IMAGE STYLES */
        border:2px solid #f00;
    }
    .picOption{
        margin: 1.66%;
        max-height: 150px;
        max-width: 150px;
        font-size: 150px;
        font-family: 'Material Icons';           
    }
    #optionTable{
        text-align: center;
    }
    #chosenPic{
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 11px;
        font-size: 150px;
        max-height: 150px;
        max-width: 150px; 
        font-family: 'Material Icons';   
    }
    .img-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        text-align: center;
    }
    #dialogH1{
        text-align: center;
        margin-top: auto;
    }
    `]
})
export class ChangeProfilePictureDialogComponent {

    public title: string;
    public message: string;
    profPic = "";
    array = [
        {src : "./assets/profilePic/dropouts_dream.jpg"},
        {src : "./assets/profilePic/ecrypted_dreams.jpg"},
        {src : "./assets/profilePic/nothing_personal_kid.jpg"},
        {src : "./assets/profilePic/software_dreams.jpg"},
        {src : "./assets/profilePic/wake_me_up.jpg"},
        {src : " "}
    ];
    constructor(public dialogRef: MdDialogRef<ChangeProfilePictureDialogComponent>) {}
    
    switch(x){
        this.profPic = x;
    }
    
}