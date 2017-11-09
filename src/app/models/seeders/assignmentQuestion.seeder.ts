export class AssignmentQuestionSeeder {
  public constructor(public choiceText : string,
                     public isAnswer : boolean,
                     public answerText : string,
                     public choiceNumber : number,
                     public studentAnswer? : any){}
}