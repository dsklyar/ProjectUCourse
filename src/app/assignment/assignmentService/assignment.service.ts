import { Assignment } from '../../models/assignment.model';
import { AssignmentQuestion } from '../../models/assignmentQuestion.model';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';


@Injectable()
export class AssignmentService {
  private courseID: string;
  private assignmentToEdit: Assignment;
  private assignments: Assignment[] = [];

  private assignmentSelected : Assignment;

  constructor(private http: Http) { }

  addAssignment(newAssignment: Assignment) {
    if (this.courseID != null) {
      const body = JSON.stringify(newAssignment);
      const headers = new Headers({ 'Content-Type': 'application/json' });
      return this.http.post(environment.baseUrl + '/assignment/'
        + this.courseID
        + this.getToken(), body, { headers: headers })
        .map((response: Response) => {
          const result = response.json();
          const returnedAssignment = new Assignment(
            result.obj.title,
            result.obj.description,
            result.obj.timeAvailable,
            result.obj.dateDue,
            result.obj.dateCreated,
            result.obj.dateUpdated,
            result.obj.assignmentQuestions,
            result.obj._id
          );
          this.assignments.unshift(returnedAssignment);
          return returnedAssignment;
        })
        .catch((error: Response) => Observable.throw(error.json()));
    }
  }
  // YOU MUST REFRESH FIRST BEFORE ADDING NEW ASSIGNMENTS
  // OTHERWISE COURSEID IS UNDEFINED
  refreshAssignments() {
    return this.http.get(environment.baseUrl + '/assignment/'
      + this.courseID
      + this.getToken())
      .map((response: Response) => {
        const assignments = response.json().obj;    // obj is where courses stored in /courses routes
        let transformedAssignments: Assignment[] = [];
        for (let assignment of assignments) {
          transformedAssignments.push(
            new Assignment(
              assignment.title,
              assignment.description,
              assignment.timeAvailable,
              assignment.dateDue,
              assignment.dateCreated,
              assignment.dateUpdated,
              assignment.assignmentQuestions,
              assignment._id
            )
          );
        }
        // SORT: This is used to sort and show the latest assignments
        this.assignments = transformedAssignments.sort((a, b) => {
          if (a.dateUpdated == b.dateUpdated) { return 0; }
          else {
            if (a.dateUpdated > b.dateUpdated) { return -1; }
            else if (a.dateUpdated < b.dateUpdated) { return 1; }
          }
        });
        return this.assignments;
      })
      .catch((error: Response) => Observable.throw('Error in Assignment Service'));
  }
  removeAssignment(assignment: Assignment) {
    return this.http.delete(environment.baseUrl + 'assignment/'
      + assignment.assignmentID
      + "/"
      + this.courseID
      + this.getToken())
      .map((response: Response) => {
        response.json();
        this.assignments.splice(this.assignments.indexOf(assignment), 1);
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }
  setCourseID(courseID: string) {
    this.courseID = courseID;
  }
  setSelectedAssignment(selectedAssignment : Assignment){
    this.assignmentSelected = selectedAssignment;
  }
  getSelectedAssignment(){
    return this.assignmentSelected;
  }
  getToken() {
    const token = (localStorage.getItem('token'))
      ? '?token=' + localStorage.getItem('token')
      : '';
    return token;
  }
}