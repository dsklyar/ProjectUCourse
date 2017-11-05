export class AssignmentQuestion {
  constructor(public title: string,
    public description: string,
    public questionType : string,
    public numberOfChoices: number,
    public numberOfTries : number,
    public pointsLostPerTry: number,
    public pointsAvailable : number,
    public questionBody : string,
    public questionArray : [{
      choiceText : string,
      answerText : string,
      isAnswer : boolean,
      choiceNumber : number
    }], 
    public dateCreated?: Date,
    public dateUpdated?: Date,
    public assignmentQuestionID?: string) { }
}