import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
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
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CreateEditProjectComponent } from './modules/projects/components/create-edit-project/create-edit-project.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarHeadComponent } from './modules/homepage/components/calendar-head/calendar-head.component';
import { CalendarItemsComponent } from './modules/homepage/components/calendar-items/calendar-items.component';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { CandidatesKanbanComponent } from './modules/candidates/components/candidates-kanban/candidates-kanban.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { InterviewDialogComponent } from './modules/homepage/components/calendar-items/dialog-interview/interview-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { WarningComponent } from './modules/candidates/components/warning/warning.component';
import { CandidatesSidenavComponent } from './modules/candidates/components/candidates-sidenav/candidates-sidenav.component';
import { CandidatesEvaluationComponent } from './modules/candidates/components/candidates-evaluation/candidates-evaluation.component';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localePL from '@angular/common/locales/pl'
import { LOCALE_ID } from '@angular/core';


registerLocaleData(localePL, 'pl');

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
    CreateEditProjectComponent,
    CalendarItemsComponent,
    CandidatesKanbanComponent,
    InterviewDialogComponent,
    WarningComponent,
    CandidatesSidenavComponent,
    CandidatesEvaluationComponent,

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
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatInputModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    DragDropModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatSliderModule,
    FormsModule,

  ],
  exports: [MatButtonModule],
  providers: [{provide: LOCALE_ID, useValue: 'pl' }],
  bootstrap: [AppComponent],
  entryComponents: [InterviewDialogComponent],
})
export class AppModule {}
