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
        grid-template-rows: repeat(2, 1fr);
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
        {src : "https://www.smashingmagazine.com/wp-content/uploads/2015/06/10-dithering-opt.jpg"},
        {src : "https://cdn.theatlantic.com/assets/media/img/photo/2015/11/images-from-the-2016-sony-world-pho/s01_130921474920553591/main_900.jpg?1448476701"},
        {src : "https://s-media-cache-ak0.pinimg.com/originals/10/e4/03/10e40345d2e7fc3966ffc6f8a546e0b5.jpg"},
        {src : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD5HHkIzrnqxBDOfrZsapGv3m47qs2Vyvv9vH5a-_hxpisB2uI"},
        {src : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwswZVnaDs2Sn9AyTVbEhdfGc3cCr3tbh_tiytTGd_cJf1d8_a"},
        {src : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUzmcXfpKcca8Y0zQLCpLVohzfk-7yf4pR4NcNEr750mkKiMZDoA"}
    ];
    constructor(public dialogRef: MdDialogRef<ChangeProfilePictureDialogComponent>) {}
    
    switch(x){
        this.profPic = x;
    }
    
}