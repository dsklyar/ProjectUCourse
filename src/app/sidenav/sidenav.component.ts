import {Component, ViewChild, OnInit} from '@angular/core';
import {MdSidenav} from '@angular/material';
import {SidenavService} from '.././sidenav/sidenav.service';

@Component ({
    selector : 'app-sidebar',
    templateUrl : './sidenav.component.html',
    styles: [
        `.example-container {
            top: 72px !important;
            z-index: 10; 
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
          .example-container.mat-drawer-container.mat-sidenav-container{
            visibility: hidden;
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