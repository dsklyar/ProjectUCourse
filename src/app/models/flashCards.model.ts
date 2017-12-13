export class FlashCard {
    constructor(public title: string,
                public flashCard: string,
                public answer: string,
                public dateCreated?: Date,
                public dateUpdated?: Date,
                public side: boolean = true,
                public flashCardID?: string){}
                
  }