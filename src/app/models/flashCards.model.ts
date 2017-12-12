export class FlashCard {
    constructor(public title: string,
                public flashCard: string,
                public dateCreated?: Date,
                public dateUpdated?: Date,
                public flashCardID?: string){}
  }