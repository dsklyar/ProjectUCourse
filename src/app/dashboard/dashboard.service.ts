import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Course } from '.././models/course.model';

@Injectable()
export class DashboardService {
    private courses: Course[] = [
        new Course('Intro to Angular 2', '2', new Date(), new Date(),
        'Welcome to the course!','Introductury course to Angular 2'),
        new Course('Numerical Analysis', '2',new Date(),new Date(),
        'You are fucked!','Math that is usefull and also hard as fuck'),
        new Course('Networks', '2',new Date(),new Date(),
        'No, now you are really fucked!','Cerpa will show whats the real CS is like'),
        new Course('Chemistry 002', '2',new Date(),new Date(),
        'Welcome to the course!','Fun chemistry class'),
        new Course('Software Design', '2',new Date(),new Date(),
        'Welcome to the course!','Now, you will wonder dafaq u did 4 years in college'),
        new Course('Typing on Plack', '2',new Date(),new Date(),
        'Musteks were msde','You thought Networks was hard. Idiot.'),
        new Course('Vaping 101', '2',new Date(),new Date(),
        'How to get cancer easy!','You must really not care for your health!'),
        new Course('How to suck at coding', '2',new Date(),new Date(),
        'Its actually pretty easy','Just dont code'),
        new Course('Creative writting', '2',new Date(),new Date(),
        'A road to unemployment','Should of been in engineering major.')
    ];
    // forthis u need at injectable so it will have 
    // a meta data for angular to recognise
    constructor(private http:Http){}

    addCourse(course: Course){
        this.courses.push(course);
        // Stringify our course object
        const body = JSON.stringify(course);
        // Specify that the object is type of Json
        const headers = new Headers({'Content-Type':'application/json'});
        console.log(body);
        return this.http.post('http://localhost:4200/course',body,{headers: headers})
            .map((response: Response) => response.json())
            .catch((error:Response) => Observable.throw(error.json()));
    }
    getMessages(){
        return this.courses;
    }
    removeCourse(course: Course){
        this.courses.slice(this.courses.indexOf(course),1);
    }
}