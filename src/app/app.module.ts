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
         MatSelectModule } from '@angular/material';
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
    AutoGrowDirective,
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
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
