import { Component, } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from 'src/app/modules/commons/services/projects/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent  {
  public checked = true;
  public componentName = "projects";
  public isEditCreateProject = false;

  constructor(private _router: Router, private _projectService: ProjectsService) {}

  
  testFunc() {
    alert('button pressed');
  }

  moveToCreateProject() {
    this._router.navigate(
      ['edit']
    )
  }
}
