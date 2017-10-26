import { Question } from './question.model';

export class Assignment {
  constructor(public title: string,
              public description: string,
              public minutes?: number,
              public dateDue?: Date,
              public dateCreated?: Date,
              public dateUpdated?: Date,
              public assignmentID?: string,
              public questions? : Question[]
            ){}
}