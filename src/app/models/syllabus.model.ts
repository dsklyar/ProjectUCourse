export class Syllabus {
    constructor(public title : string,
                public text : string,
                public courseID : string,
                public dateCreated? : Date,
                public dateUpdated?: Date){}
}