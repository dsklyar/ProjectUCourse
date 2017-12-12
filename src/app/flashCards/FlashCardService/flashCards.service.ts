import { FlashCard } from '../../models/flashCards.model';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class FlashCardService{
    public flashCards: FlashCard[] = [];
    addFlashCard(flashCard: FlashCard){
        this.flashCards.push(flashCard);
    }
}