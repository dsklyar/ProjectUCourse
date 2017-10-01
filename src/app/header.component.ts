import {Component} from '@angular/core';

@Component ({
    selector : 'app-header',
    template : `
    <md-toolbar class="menu-toolbar">
        <button md-icon-button (click)="sidenav.toggle()">
            <md-icon>account_box</md-icon>
        </button>
        <span class="fill-space"></span>
        <a href="">Login</a>
        <a href="">Sign Up</a>
    </md-toolbar>
    <md-sidenav-container fullscreen class="example-container">
        <md-sidenav #sidenav class="example-sidenav">
            <md-toolbar>
                    <span>First Row</span>S
                <md-toolbar-row>
                    <span>Second Row</span>
                </md-toolbar-row>
                <md-toolbar-row>
                    <button md-button (click)="sidenav.close()">
                        Close
                    </button>
                </md-toolbar-row>
            </md-toolbar>
        </md-sidenav>
        <div class="example-sidenav-content">
            
        </div>
    </md-sidenav-container>
    `,
    styles : [
        `.example-container {
            top: 64px !important;
          }
          .example-sidenav-content {
            display: flex;
            height: 100%;
            align-items: center;
            justify-content: center;
          }
          .example-sidenav {
            padding: 20px;
          }
          .fill-space {
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

}
