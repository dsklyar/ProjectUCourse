
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Course } from '../.././models/course.model';
import { Discussion } from '../../models/discussion.model';
@Injectable()
export class DiscussionService {
  private courseID: string;
  private discussionToEdit : Discussion;
  private discussions: Discussion[] = [];

  constructor(private http: Http) { }
 
  // MUST: Run this before opening edit form on the announcement
  addDiscussionToEdit(discussionToEdit : Discussion){
    this.discussionToEdit = discussionToEdit;
  }
  getDiscussionToEdit(){
    return this.discussionToEdit;
  }
  addDiscussion(newDiscussion: Discussion) {
    console.log("we did it");
    this.discussions.push(newDiscussion);
    // if (this.courseID != null) {
    //   const body = JSON.stringify(newDiscussion);
    //   const headers = new Headers({ 'Content-Type': 'application/json' });
    //   return this.http.post(environment.baseUrl + '/discussion/' 
    //   + this.courseID
    //   + this.getToken(), body, { headers: headers })
    //     .map((response: Response) => {
    //       const result = response.json();
    //       const returnedDiscussion = new Discussion(
    //         result.obj.title,
    //         result.obj.discussion,
    //         result.obj.dateCreated,
    //         result.obj.dateUpdated,
    //         result.obj._id
    //       );
    //       console.log(returnedDiscussion);
    //       this.discussions.unshift(returnedDiscussion);
    //       return returnedDiscussion;
    //     })
    //     .catch((error: Response) => Observable.throw(error.json()));
    // }
    
  }
  updateDiscussion(discussion: Discussion){
    const body = JSON.stringify(discussion);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.patch(environment.baseUrl + '/discussion/' 
    + discussion.discussionID
    + this.getToken()
    , body, { headers: headers })
        .map((response: Response) => {
            const result = response.json();
            const updatedDiscussion = new Discussion(
                result.obj.title,
                result.obj.discussion,
                result.obj.dateCreated,
                result.obj.dateUpdated,
                result.obj._id
            );
            this.discussions.splice(this.discussions.indexOf(discussion), 1);
            this.discussions.unshift(updatedDiscussion);
            // NOTE: this is done to prevent errors of editing the same announ twice
            this.discussionToEdit = null;
            return updatedDiscussion;
        })
        .catch((error: Response) => Observable.throw(error.json()));
}
  // YOU MUST REFRESH FIRST BEFORE ADDING CNEW ANNOUNCEMENTS
  // OTHERWISE COURSEID IS UNDEFINED
  refreshDiscussions() {
    return this.http.get(environment.baseUrl + '/discussion/' 
    + this.courseID
    + this.getToken())
    .map((response: Response) => {
        const discussions = response.json().obj;    // obj is where courses stored in /courses routes
        let transformedDiscussions: Discussion[] = [];
        for (let discussion of discussions) {
            transformedDiscussions.push(
                new Discussion(
                  discussion.title,
                  discussion.discussion,
                  discussion.dateCreated,
                  discussion.dateUpdated,
                  discussion._id
                )
            );
        }
        // SORT: This is used to sort and show the latest announcements
        this.discussions = transformedDiscussions.sort((a, b) => {
          if (a.dateUpdated == b.dateUpdated) { return 0; }
          else {
            if (a.dateUpdated > b.dateUpdated) { return -1; }
            else if (a.dateUpdated < b.dateUpdated) { return 1; }
          }
        });
        return this.discussions;
    })
    .catch((error: Response) => Observable.throw('Error in Discussion Service'));
  }
  removeDiscussion(discussion: Discussion) {
    return this.http.delete(environment.baseUrl + '/discussion/' 
    + discussion.discussionID 
    + "/"
    + this.courseID
    + this.getToken())
        .map((response: Response) => {
            response.json();
            this.discussions.splice(this.discussions.indexOf(discussion), 1);
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