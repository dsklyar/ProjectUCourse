export class Discussion {
  constructor(public title: string,
              public discussion: string,
              public dateCreated?: Date,
              public dateUpdated?: Date,
              public discussionID?: string){}
}