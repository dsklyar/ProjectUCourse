import {Component} from '@angular/core';

@Component ({
    selector : 'app-sidebar',
    template : `
    <md-sidenav-container fullscreen class="example-container">
        <md-sidenav #sidenav class="example-sidenav">
            <md-toolbar>
                    <button md-button (click)="sidenav.close()">Profile</button>
                <md-toolbar-row>
                    <button md-button (click)="sidenav.close()">Feature A</button>
                </md-toolbar-row>
                <md-toolbar-row>
                    <button md-button (click)="sidenav.close()">Feature B</button>
                </md-toolbar-row>
                <md-toolbar-row>
                    <button md-button (click)="sidenav.close()">Close</button>
                </md-toolbar-row>
            </md-toolbar>
        </md-sidenav>
        <div class="example-sidenav-content">
            
        </div>
    </md-sidenav-container>`,
    styles: [
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
          }`
    ]
})
export class SideBarComponent {
}