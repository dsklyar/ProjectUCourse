export class Question {
  constructor(public title: string,
    public description: string,
    public dateCreated?: Date,
    public dateUpdated?: Date,
    public assignmentID?: string) { }
}