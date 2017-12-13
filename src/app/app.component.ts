import { CurrentActivatedRouteService } from './sharedServices/currentActivatedRoute.service';
import { FlashCardService } from './flashCards/FlashCardService/flashCards.service';
import { ChangeProfilePictureDialogService } from './dialog/changeProfilePictureDialog/changeProfilePictureDialog.service';
import { ConfirmDialogService } from './dialog/confirmDialog.service';
import { AssignmentQuestionService } from './assignmentQuestion/assignmentQuestion-service/assignmentQuestion.service';
import { AssignmentService } from './assignment/assignmentService/assignment.service';
import { SyllabusService } from './syllabus/syllabus-service/syllabus.service';
import { AnnouncementService } from './Announcement/AnnouncementService/announcemenet.service';
import { DiscussionService } from './Discussion/DiscussionService/discussion.service'
import { AuthenticationService } from './auth/authService/authentication.service';
import { DashboardService } from './dashboard/dashboard.service';
import { Component } from '@angular/core';
// this create one single instance for all components across the app
import { SidenavService } from '././sidenav/sidenav.service';
import { CourseQuestionService } from './courseQuestion/courseQuestion-service/courseQuestion.service';

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
    DiscussionService,
    AssignmentService,
    AssignmentQuestionService,
    SyllabusService,
    ConfirmDialogService,
    ChangeProfilePictureDialogService,
    CurrentActivatedRouteService,
    FlashCardService,
    CourseQuestionService
  ]
})
export class AppComponent {
  title = 'app';
}
