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
const APP_ROUTES: Routes = [
    // path full only react to this path if it is default path
    { path: '', redirectTo: '/auth', pathMatch: 'full'},
    { path: 'auth', component: AuthenticationComponent},
    { path: 'signin', component: SigninComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'logout', component: LogoutComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'newcourse', component: DashboardCourseInputComponent},
    { path: 'profile', component: ProfileComponent}
    { path: 'newannouncement', component: AnnouncementInputComponent},
    { path: 'courseMenu/:courseID', component: CourseMenuComponent, children: COURSEMENU_ROUTES}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
