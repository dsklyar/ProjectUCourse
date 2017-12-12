export class AssignmentQuestionResponse {
    constructor(public userID : string,
                public courseQuestionID : string,
                public dateCreated : Date,
                public dateUpdated : Date,
                public courseQuestionResponse : string){}
}