import { FlashCard } from '../../models/flashCards.model';
import { FlashCardService } from '../FlashCardService/flashCards.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-flashCard-input',
    templateUrl: '/flashCard-input.component.html',
    styleUrls: ['/flashCard-input.component.css']
})

export class FlashCardInputComponent implements OnInit {
    newFlashCardForm: FormGroup;

    constructor(private flashCardService: FlashCardService,
    private location: Location){}

    ngOnInit(){
        this.newFlashCardForm = new FormGroup({
            title: new FormControl(null, Validators.required),
            flashCard: new FormControl(null, Validators.required)
        });
    }
    onSubmit(){
        this.flashCardService.addFlashCard(
            new FlashCard(
                this.newFlashCardForm.controls['title'].value,
                this.newFlashCardForm.controls['flashCard'].value
            )

        );
        this.newFlashCardForm.reset();
        this.location.back()
    }
    onGoBack() {
        this.location.back()
      }
}