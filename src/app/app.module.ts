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
    DashboardCourseComponent
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
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
