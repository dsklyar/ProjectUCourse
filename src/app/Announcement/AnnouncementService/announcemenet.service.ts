
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Course } from '../.././models/course.model';
import { Announcement } from '../../models/announcement.model';

@Injectable()
export class AnnouncementService {
  private courseID: string;
  private announcementToEdit : Announcement;
  private announcements: Announcement[] = [];

  constructor(private http: Http) { }
 
  // MUST: Run this before opening edit form on the announcement
  addAnnouncementToEdit(announcementToEdit : Announcement){
    this.announcementToEdit = announcementToEdit;
  }
  getAnnouncementToEdit(){
    return this.announcementToEdit;
  }

  addAnnouncement(newAnnouncement: Announcement) {
    if (this.courseID != null) {
      const body = JSON.stringify(newAnnouncement);
      const headers = new Headers({ 'Content-Type': 'application/json' });
      return this.http.post('http://localhost:3000/announcement/' 
      + this.courseID
      + this.getToken(), body, { headers: headers })
        .map((response: Response) => {
          const result = response.json();
          const returnedAnnouncement = new Announcement(
            result.obj.title,
            result.obj.announcement,
            result.obj.dateCreated,
            result.obj.dateUpdated,
            result.obj._id
          );
          console.log(returnedAnnouncement);
          this.announcements.unshift(returnedAnnouncement);
          return returnedAnnouncement;
        })
        .catch((error: Response) => Observable.throw(error.json()));
    }
  }
  updateAnnouncement(announcement: Announcement){
    const body = JSON.stringify(announcement);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.patch('http://localhost:3000/announcement/' 
    + announcement.announcementID
    + this.getToken()
    , body, { headers: headers })
        .map((response: Response) => {
            const result = response.json();
            const updatedAnnouncement = new Announcement(
                result.obj.title,
                result.obj.announcement,
                result.obj.dateCreated,
                result.obj.dateUpdated,
                result.obj._id
            );
            this.announcements.splice(this.announcements.indexOf(announcement), 1);
            this.announcements.unshift(updatedAnnouncement);
            // NOTE: this is done to prevent errors of editing the same announ twice
            this.announcementToEdit = null;
            return updatedAnnouncement;
        })
        .catch((error: Response) => Observable.throw(error.json()));
}
  // YOU MUST REFRESH FIRST BEFORE ADDING CNEW ANNOUNCEMENTS
  // OTHERWISE COURSEID IS UNDEFINED
  refreshAnnouncements() {
    return this.http.get('http://localhost:3000/announcement/' 
    + this.courseID
    + this.getToken())
    .map((response: Response) => {
        const announcements = response.json().obj;    // obj is where courses stored in /courses routes
        let transformedAnnouncements: Announcement[] = [];
        for (let announcement of announcements) {
            transformedAnnouncements.push(
                new Announcement(
                  announcement.title,
                  announcement.announcement,
                  announcement.dateCreated,
                  announcement.dateUpdated,
                  announcement._id
                )
            );
        }
        // SORT: This is used to sort and show the latest announcements
        this.announcements = transformedAnnouncements.sort((a, b) => {
          if (a.dateUpdated == b.dateUpdated) { return 0; }
          else {
            if (a.dateUpdated > b.dateUpdated) { return -1; }
            else if (a.dateUpdated < b.dateUpdated) { return 1; }
          }
        });
        return this.announcements;
    })
    .catch((error: Response) => Observable.throw('Error in Announcement Service'));
  }
  removeAnnouncement(announcement: Announcement) {
    return this.http.delete('http://localhost:3000/announcement/' 
    + announcement.announcementID 
    + "/"
    + this.courseID
    + this.getToken())
        .map((response: Response) => {
            response.json();
            this.announcements.splice(this.announcements.indexOf(announcement), 1);
        })
        .catch((error: Response) => Observable.throw(error.json()));
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