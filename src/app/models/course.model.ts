import { Announcement } from './announcement.model';
export class Course {
    constructor(public title: string,
                public regNum: string,
                public dateCreated: Date,
                public dateUpdated: Date,
                public description: string,
                public schoolName : string,
                public courseID?: string,
                public announcements?: Announcement[]){}
}