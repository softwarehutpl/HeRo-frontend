import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './modules/homepage/components/homepage/homepage.component';
import { ProfileComponent } from './modules/profile/components/profile/profile.component';
import { ProjectsComponent } from './modules/projects/components/projects/projects.component';
import { CandidatesComponent } from './modules/candidates/components/candidates/candidates.component';
import { LoginPageComponent } from './modules/loginpage/components/login-page/login-page.component';
import { CreateEditProjectComponent } from './modules/projects/components/create-edit-project/create-edit-project.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomepageComponent,
  },
  {
    path: 'candidates',
    component: CandidatesComponent,
    // canActivate: [PlayerDataGuardService],
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    // canActivate: [PlayerDataGuardService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    // canActivate: [PlayerDataGuardService],
  },
  {
    path: 'login',
    component: LoginPageComponent,
    // canActivate: [PlayerDataGuardService],
  },
  {
    path: 'edit',
    component: CreateEditProjectComponent,
    // canActivate: [PlayerDataGuardService],
  },
  {
    path: '**',
    component: HomepageComponent, //as default this will be login page
    //component: LoginPageComponent,
    // canActivate: [PlayerDataGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
