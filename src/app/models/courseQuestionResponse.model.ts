export class CourseQuestionResponse {
    constructor(public userID : string,
                public username : string,
                public courseQuestionID : string,
                public dateCreated : Date,
                public dateUpdated : Date,
                public courseQuestionResponse : string){}
}