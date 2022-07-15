import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

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
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { InfoBoxComponent } from './modules/commons/components/info-box/info-box.component';
import { FilterComponent } from './modules/commons/components/filter/filter.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CandidatesListComponent } from './modules/candidates/components/candidates-list/candidates-list.component';
import { MatTableModule } from '@angular/material/table';
import { ProjectsListComponent } from './modules/projects/components/projects-list/projects-list.component';
import { TableComponent } from './modules/commons/components/table/table.component';
import { MatSortModule } from '@angular/material/sort';

import { MatInputModule } from '@angular/material/input';

import { CreateEditProjectComponent } from './modules/projects/components/create-edit-project/create-edit-project.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarHeadComponent } from './modules/homepage/components/calendar-head/calendar-head.component';
import { ReactiveFormsModule } from '@angular/forms';

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
    InfoBoxComponent,
    FilterComponent,
    CandidatesListComponent,
    CalendarHeadComponent,
    ProjectsListComponent,
    TableComponent,
    CreateEditProjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatButtonToggleModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
  ],
  exports: [MatButtonModule],
  providers: [],
  bootstrap: [AppComponent, CalendarHeadComponent],
})
export class AppModule {}
