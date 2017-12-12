import { AssignmentChartistComponent } from './assignmentChartist/assignmentChartist.component';

import { FlashCardInputComponent } from './flashCards/flashCard-input/flashCard-input.component';
import { FlashCardListComponent } from './flashCards/flashCards-list/flashCards.list.component';
import { DashboardCourseAddComponent } from './dashboard/dashboardCourse-add/dashboardCourse-add.component';
import {
  AssignmentQuestionInputComponent,
} from './assignmentQuestion/assignmentQuestion-input/assignmentQuestion-input.component';
import { AssignmentMenuComponent } from './assignmentMenu/assignmentMenu.component';
import { AssignmentInputComponent } from './assignment/assignment-input/assignment-input.component';
import { AnnouncementEditComponent } from './Announcement/Announcement-edit/announcement-edit.component';
import { AnnouncementInputComponent } from './Announcement/Announcement-input/announcement-input.component';
import { COURSEMENU_ROUTES } from './courseMenu/courseMenu.routes';
import { CourseMenuComponent } from './courseMenu/courseMenu.component';
import { DashboardCourseInputComponent } from './dashboard/dashboardCourse-input.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationComponent } from './auth/authentication.component';
import { SigninComponent } from './auth/signin.component';
import { SignupComponent } from './auth/signup.component';
import { LogoutComponent } from './auth/logout.component';
import { ProfileComponent} from './profile/profile.component';
import { courseQuestionInputComponent } from './courseQuestion/courseQuestion-input/courseQuestion-input.component';
const APP_ROUTES: Routes = [
    // path full only react to this path if it is default path
    { path: '', redirectTo: '/signin', pathMatch: 'full'},
    { path: 'auth', component: AuthenticationComponent},
    { path: 'signin', component: SigninComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'logout', component: LogoutComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'newcourse', component: DashboardCourseInputComponent},
    { path: 'addcourse', component: DashboardCourseAddComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'newannouncement', component: AnnouncementInputComponent},
    { path: 'editannouncement', component: AnnouncementEditComponent},
    { path: 'courseMenu/:courseID', component: CourseMenuComponent, children: COURSEMENU_ROUTES},
    { path: 'flashCards', component: FlashCardListComponent},
    { path: 'newFlashCard', component: FlashCardInputComponent},
    { path: 'newassignment', component: AssignmentInputComponent},
    { path: 'courseMenu/:courseID', component: CourseMenuComponent, children: COURSEMENU_ROUTES},
    { path: 'assignmentMenu/:assignmentID', component: AssignmentMenuComponent},
    { path : 'newassignmentQuestion', component: AssignmentQuestionInputComponent},
    { path : 'chartist/:assignmentID', component: AssignmentChartistComponent},
    { path : 'newcourseQuestion', component: courseQuestionInputComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
