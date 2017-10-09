
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Course } from '.././models/course.model';
import { Announcement } from '../models/announcement.model';

@Injectable()
export class DashboardService {
    private courses: Course[] = [];
    // forthis u need at injectable so it will have 
    // a meta data for angular to recognise
    constructor(private http: Http) { }

    addCourse(course: Course) {
        // Stringify our course object
        const body = JSON.stringify(course);
        // Specify that the object is type of Json
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('http://localhost:3000/course' + this.getToken(), body, { headers: headers })
            .map((response: Response) => {
                const result = response.json();
                const course = new Course(
                    result.obj.title,
                    result.obj.registrationNumber,
                    result.obj.dateCreated,
                    result.obj.dateUpdated,
                    result.obj.description,
                    result.obj.schoolName,
                    result.obj._id,
                    result.obj.announcements
                );
                this.courses.push(course);
                return course;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
    getMessages() {
        return this.http.get('http://localhost:3000/course' + this.getToken())
            .map((response: Response) => {
                const courses = response.json().obj;    // obj is where courses stored in /courses routes
                let transformedCourses: Course[] = [];
                for (let course of courses) {
                    let transformedAnnouncements: Announcement[] = [];
                    for (let announcement of course.announcements) {
                        console.log(announcement);
                        transformedAnnouncements.push(
                            new Announcement(
                                announcement.title,
                                announcement.dateCreated,
                                announcement.dateUpdated,
                                announcement.announcement
                            )
                        );
                    }
                    transformedCourses.push(
                        new Course(
                            course.title,
                            course.regNum,
                            course.dateCreated,
                            course.dateUpdated,
                            course.description,
                            course.schoolName,
                            course._id,
                            transformedAnnouncements
                        )
                    );
                }
                this.courses = transformedCourses;
                return transformedCourses;
            })
            .catch((error: Response) => Observable.throw('Error in Dashboard Service'));
    }
    updateCourse(course: Course){
        const body = JSON.stringify(course);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.patch('http://localhost:3000/course/' + course.courseID, body, { headers: headers })
            .map((response: Response) => {
                const result = response.json();
                const course = new Course(
                    result.obj.title,
                    result.obj.registrationNumber,
                    result.obj.dateCreated,
                    result.obj.dateUpdated,
                    result.obj.description,
                    result.obj.schoolName
                );
                this.courses.push(course);
                return course;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
    removeCourse(course: Course) {
        return this.http.delete('http://localhost:3000/course/' + course.courseID + this.getToken())
            .map((response: Response) => {
                response.json();
                this.courses.splice(this.courses.indexOf(course), 1);
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getToken(){
        const token = (localStorage.getItem('token'))
        ? '?token=' + localStorage.getItem('token')
        : '';
        return token;
    }
} 