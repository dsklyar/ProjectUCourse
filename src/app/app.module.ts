import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule, 
         MatSidenavModule, 
         MatToolbarModule,
         MatButtonModule,
         MatIconModule } from '@angular/material';
import { routing } from './app.routing';

import { NgModule } from '@angular/core';
// Add forms two way data binding
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { AuthenticationComponent } from './auth/authentication.component';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [
    AppComponent,
    // AuthenticationComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    routing,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
