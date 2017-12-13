import { CourseQuestionResponse } from "./courseQuestionResponse.model";

export class CourseQuestion {
    constructor(public title: string,
                public responses: CourseQuestionResponse[],
                public courseQuestion: string,
                public dateCreated?: Date,
                public dateUpdated?: Date,
                public courseQuestionID?: string,
                public courseID?: string,
                public userID?: string){}
}