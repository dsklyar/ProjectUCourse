export class AssignmentQuestionAnswer {
    constructor(public userID : string,
                public assignmentQuestionID : string,
                public studentAnswerObject : any,
                public triesUsed : number,
                public score : number,
                public completed : boolean,
                public dateSaved : Date,
                public assignmentID : string,
                public assignmentQuestionAnswerID? : string){}
}