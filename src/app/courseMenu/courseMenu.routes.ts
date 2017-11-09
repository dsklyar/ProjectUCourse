import { AssignmentListComponent } from '../assignment/assignment-list/assignment-list.component';
import { SyllabusComponent } from '../syllabus/syllabus.component';
import { AnnouncementListComponent } from '../Announcement/Announcement-list/announcement-list.component';

import { Routes } from '@angular/router';
import { courseQuestionListComponent } from '../courseQuestion/courseQuestion-list/courseQuestion-list.component';


export const COURSEMENU_ROUTES : Routes = [
  { path: '', redirectTo: 'announcements', pathMatch: 'full'},
  { path: 'announcements', component: AnnouncementListComponent},
  { path: 'assignments', component: AssignmentListComponent },
  { path: 'syllabus', component: SyllabusComponent},
  { path: 'courseQuestion', component: courseQuestionListComponent}
  //{ path: 'assignments', component: SigninComponent},
  //{ path: 'messages', component: SignupComponent},
  //{ path: 'calendar', component: LogoutComponent}
];