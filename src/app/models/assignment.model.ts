import { AssignmentQuestion } from './assignmentQuestion.model';


export class Assignment {
  constructor(public title: string,
              public description: string,
              public timeAvailable?: number,
              public dateDue?: Date,
              public dateCreated?: Date,
              public dateUpdated?: Date,
              public assignmentQuestions? : AssignmentQuestion[],
              public assignmentID?: string,
            ){}
}