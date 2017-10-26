import { AssignmentService } from './assignment/assignmentService/assignment.service';
import { AnnouncementService } from './Announcement/AnnouncementService/announcemenet.service';
import { AuthenticationService } from './auth/authService/authentication.service';
import { DashboardService } from './dashboard/dashboard.service';
import { Component } from '@angular/core';
// this create one single instance for all components across the app
import { SidenavService } from '././sidenav/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // Global Services
  providers:[
    SidenavService,
    DashboardService,
    AuthenticationService,
    AnnouncementService,
    AssignmentService
  ]
})
export class AppComponent {
  title = 'app';
}
