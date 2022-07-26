import { Component, } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})

export class ProjectsComponent  {
  public checked = true;
  public componentName = "projects";
  public isEditCreateProject = false;
  public isAutocomplete = true;

  constructor() {}
  
  testFunc() {
    alert('button pressed');
  }
}
