import {Component} from '@angular/core';

@Component ({
    selector : 'app-header',
    templateUrl: './header.component.html',
    styles : [
        `.fill-space {
            flex: 1 1 auto;
          }
          .menu-toolbar a {
            padding: 1%;
            display: inline-block;
            text-decoration: none;
            color: #282828;
          }`
    ]
})
export class HeaderComponent {
    navToggle(){

    }
}
