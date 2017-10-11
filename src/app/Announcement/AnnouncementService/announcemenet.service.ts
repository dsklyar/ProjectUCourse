import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Course } from '../.././models/course.model';
import { Announcement } from '../../models/announcement.model';

@Injectable()
export class AnnouncementService {
  private courseID: string;
  private announcements: Announcement[] = [];

  constructor(private http: Http) { }

  addAnnouncement(announcement: Announcement) {
    if (this.courseID != null) {
      const body = JSON.stringify(announcement);
      const headers = new Headers({ 'Content-Type': 'application/json' });
      return this.http.post('http://localhost:3000/announcement/' 
      + this.courseID
      + this.getToken(), body, { headers: headers })
        .map((response: Response) => {
          const result = response.json();
          const course = new Announcement(
            result.obj.title,
            result.obj.announcement,
            result.obj.dateCreated,
            result.obj.dateUpdated
          );
          this.announcements.push(announcement);
          return course;
        })
        .catch((error: Response) => Observable.throw(error.json()));
    }
  }

  // YOU MUST REFRESH FIRST BEFORE ADDING CNEW ANNOUNCEMENTS
  // OTHERWISE COURSEID IS UNDEFINED
  refreshAnnouncements() {
    return this.announcements;
  }
  getAnnouncements() {
    return this.announcements;
  }
  setCourseID(courseID : string){
    this.courseID = courseID;
  }
  getToken() {
    const token = (localStorage.getItem('token'))
      ? '?token=' + localStorage.getItem('token')
      : '';
    return token;
  }
}