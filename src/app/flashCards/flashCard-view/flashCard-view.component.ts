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
 //   private side: boolean = true;
    constructor(private flashCardsService: FlashCardService){
        // this.flashCard = this.flashCardsService.displayedCard;
    }

    clicked(){
        
        if(this.flashCard.side == true){
            console.log(this.flashCard.answer);
            this.flashCard.side = false;
        }
        else if(this.flashCard.side == false){
            console.log(this.flashCard.flashCard);
            this.flashCard.side = true;
        }
    }
    getFlashCard(){
        this.flashCard = this.flashCardsService.displayedCard;
        // console.log(this.flashCard);
        if(this.flashCard != null && this.flashCard.side == true){
            return this.flashCard.flashCard;
        }
        else if(this.flashCard != null && this.flashCard.side == false){
            return this.flashCard.answer;
        }
        else
            return "";
    }
}