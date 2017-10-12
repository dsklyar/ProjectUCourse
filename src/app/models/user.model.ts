import {Course} from './course.model';
export class User {
    constructor(public email: string,
                public password: string,
                public firstName?: string,
                public lastName?: string,
                public schoolName?: string,
                public userType?: string,
                public courses?: Course[],
                public descritpion?: string) {}
}
