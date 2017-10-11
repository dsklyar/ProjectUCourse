export class Announcement {
  constructor(public title: string,
              public announcement: string,
              public dateCreated?: Date,
              public dateUpdated?: Date,
              public announcementID?: string){}
}