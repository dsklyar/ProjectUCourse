import {Component, ViewChild, OnInit} from '@angular/core';
import {MdSidenav} from '@angular/material';
import {SidenavService} from '.././sidenav/sidenav.service';

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
export class SidenavComponent implements OnInit {
    @ViewChild('sidenav') public sidenav: MdSidenav;
    public constructor( private sidenavService: SidenavService) {}
    public ngOnInit() {
        this.sidenavService.setSidenav(this.sidenav);
    }
}