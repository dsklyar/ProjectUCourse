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
import { LogoutComponent } from './auth/logout.component';
import { SigninComponent } from './auth/signin.component';
import { SignupComponent } from './auth/signup.component';

import { HeaderComponent } from './shared/header.component';
<<<<<<< CrimsonMonk
import { SidebarComponent } from './sidebar/sidebar.component';
=======
import { SideBarComponent } from './sidebar/sidebar.component';
>>>>>>> Basic Front end

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    HeaderComponent,
<<<<<<< CrimsonMonk
    SidebarComponent,
=======
    SideBarComponent,
>>>>>>> Basic Front end
    LogoutComponent,
    SigninComponent,
    SignupComponent
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
