import { FlashCardService } from './FlashCardService/flashCards.service';
import { Router } from '@angular/router';

import { FlashCard } from '../models/flashCards.model';
import { Component, Input } from '@angular/core';
//will need service later

@Component({
    selector: 'app-flashCard',
    templateUrl: '/flashCards.component.html',
    styleUrls: ['/flashCards.component.css']
})

export class flashCardsComponent {
    @Input() flashCard: FlashCard;

    constructor(private flashCardsService: FlashCardService, //need to add service
        private router: Router){} 

        clicked(){
            console.log(this.flashCard);
            this.flashCard.side = true;
            this.flashCardsService.setCardToDisplay(this.flashCard);
            
        }

        onDelete(){
            //this.flashCardsService.removeflashCard(this.flashCards) //need to define these
        }

        onEdit(){
          //  this.router.navigateByUrl('/editFlashCard');
          //  this.flashCardsService.addFlashCardToEdit(this.flashCards); //need to define these
        }
}

 