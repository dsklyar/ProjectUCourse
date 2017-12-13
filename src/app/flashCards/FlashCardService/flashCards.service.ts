import { FlashCard } from '../../models/flashCards.model';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class FlashCardService{
    public flashCards: FlashCard[] = [];
    public displayedCard: FlashCard;
    addFlashCard(flashCard: FlashCard){
        this.flashCards.push(flashCard);
    }
    displayFirst(flashCard: FlashCard){
        if(this.flashCards.length != 0){
            this.displayedCard = this.flashCards[1]; 
        }
    }
    setCardToDisplay(flashCard){
        this.displayedCard = flashCard;
        console.log(this.displayedCard);
    }
    
}