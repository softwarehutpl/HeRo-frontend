import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './modules/homepage/components/homepage/homepage.component';
import { CalendarComponent } from './modules/homepage/components/calendar/calendar.component';
import { ProfileComponent } from './modules/profile/components/profile/profile.component';
import { ProjectsComponent } from './modules/projects/components/projects/projects.component';
import { NavbarComponent } from './modules/commons/components/navbar/navbar.component';
import { SidebarComponent } from './modules/commons/components/sidebar/sidebar.component';
import { CandidatesComponent } from './modules/candidates/components/candidates/candidates.component';
import { LoginPageComponent } from './modules/loginpage/components/login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CalendarComponent,
    ProfileComponent,
    ProjectsComponent,
    NavbarComponent,
    SidebarComponent,
    CandidatesComponent,
    LoginPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
