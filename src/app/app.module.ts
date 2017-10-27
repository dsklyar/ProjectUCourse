import { MathJaxDirective } from './directives/mathJax/mathjax.directive';
import { AssignmentQuestionComponent } from './assignmentQuestion/assignmentQuestion.component';
import {
  AssignmentQuestionListComponent,
} from './assignmentQuestion/assignmentQuestion-list.component/assignmentQuestion-list.component';
import { AssignmentMenuComponent } from './assignmentMenu/assignmentMenu.component';
import { AssignmentInputComponent } from './assignment/assignment-input/assignment-input.component';
import { AssignmentListComponent } from './assignment/assignment-list/assignment-list.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { SyllabusComponent } from './syllabus/syllabus.component';
import { AnnouncementEditComponent } from './Announcement/Announcement-edit/announcement-edit.component';
import { AutoGrowDirective } from './directives/autoGrow/autoGrow.directive';
import { ProfileComponent } from './profile/profile.component';
import { AnnouncementComponent } from './Announcement/announcement.component';
import { AnnouncementInputComponent } from './Announcement/Announcement-input/announcement-input.component';
import { AnnouncementListComponent } from './Announcement/Announcement-list/announcement-list.component';
import { CourseMenuComponent } from './courseMenu/courseMenu.component';
import { DashboardCourseComponent } from './dashboard/dashboardCourse.component';
import {  HttpModule } from '@angular/http';
import { DashboardCourseInputComponent } from './dashboard/dashboardCourse-input.component';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule, 
         MatSidenavModule, 
         MatToolbarModule,
         MatButtonModule,
         MatIconModule,
         MatInputModule,
         MatCardModule,
         MatMenuModule,
         MatSelectModule,
         MatDatepickerModule,
         MdNativeDateModule,
         MatCheckboxModule } from '@angular/material';
import { routing } from './app.routing';

import { NgModule } from '@angular/core';
// Add forms two way data binding
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { AuthenticationComponent } from './auth/authentication.component';
import { LogoutComponent } from './auth/logout.component';
import { SigninComponent } from './auth/signin.component';
import { SignupComponent } from './auth/signup.component';

import { HeaderComponent } from './shared/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';

import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    
    AuthenticationComponent,

    HeaderComponent,

    SidenavComponent,

    LogoutComponent,
    SigninComponent,
    SignupComponent,

    DashboardComponent,
    DashboardCourseInputComponent,
    DashboardCourseComponent,

    ProfileComponent,

    CourseMenuComponent,

    AnnouncementListComponent,
    AnnouncementComponent,
    AnnouncementInputComponent,
    AnnouncementEditComponent,

    AssignmentComponent,
    AssignmentListComponent,
    AssignmentInputComponent,

    AssignmentQuestionComponent,
    AssignmentQuestionListComponent,

    AssignmentMenuComponent,

    AutoGrowDirective,
    MathJaxDirective,
    
    SyllabusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    routing,
    // http module unlock routing server
    HttpModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatSelectModule,
    MatTabsModule,
    MatDatepickerModule,
    MdNativeDateModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
