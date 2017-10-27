import { AuthenticationService } from '../auth/authService/authentication.service';
import {Component} from '@angular/core';

import {SidenavService} from '.././sidenav/sidenav.service';

@Component ({
    selector : 'app-header',
    templateUrl: './header.component.html',
    styles : [
        `.fill-space {
            flex: 1 1 auto;
          }
          .menu-toolbar {
            background-size:100% 100%;
          }
          .menu-toolbar a {
            padding: 1%;
            display: inline-block;
            text-decoration: none;
            color: #232323;
          }
          .material-icons{
              font-size: 48px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              vertical-align: middle;
          }
          `
    ]
})
export class HeaderComponent {
    constructor(private sidenavService: SidenavService,
                private authService : AuthenticationService) {}
    navToggle(){
        //uncomment this
        if(this.isLoggedIn()){
            this.sidenavService.toggle();
        }
    }
    isLoggedIn(){
        return this.authService.isLoggedIn();
    }
}
