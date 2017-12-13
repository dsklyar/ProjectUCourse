import { FlashCardService } from '../FlashCardService/flashCards.service';
import { FlashCard } from '../../models/flashCards.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-flashCard-list',
    templateUrl: '/flashCards-list.component.html',
    styleUrls: ['/flashCards-list.component.css']
})

export class FlashCardListComponent implements OnInit {
    private flashCards: FlashCard[];

    constructor(private flashCardService: FlashCardService) {
        this.flashCards = this.flashCardService.flashCards;
    }


    ngOnInit() {
        // this.flashCardService.refreshFlashCards()
        //     .subscribe(
        //         (flashCards: FlashCard[]) => 
        //         {
        //             this.flashCards = flashCards;
        //         },
        //         error => console.log(error)
        //     );
    }
}
