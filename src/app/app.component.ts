import { DashboardService } from './dashboard/dashboard.service';
import { Component } from '@angular/core';
// this create one single instance for all components across the app
import { SidenavService } from '././sidenav/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[SidenavService,DashboardService]
})
export class AppComponent {
  title = 'app';
}
