export class questionResponse {
    constructor(public userID : string,
                public username : string,
                public courseQuestionID : string,
                public dateCreated : Date,
                public dateUpdated : Date,
                public questionResponse : string){}
}