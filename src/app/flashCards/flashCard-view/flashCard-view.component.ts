import { FlashCard } from '../../models/flashCards.model';
import { FlashCardService } from '.././FlashCardService/flashCards.service';
import { Component} from '@angular/core';

@Component({
    selector: 'app-flashCard-view',
    templateUrl: '/flashCard-view.component.html',
    styleUrls: ['/flashCard-view.component.css']
})
export class flashCardViewComponent {
    private flashCard: FlashCard;

    constructor(private flashCardsService: FlashCardService){
        // this.flashCard = this.flashCardsService.displayedCard;
    }

    getFlashCard(){
        this.flashCard = this.flashCardsService.displayedCard;
        // console.log(this.flashCard);
        if(this.flashCard != null){
            return this.flashCard.flashCard;
        }
        else
            return "";
    }
}