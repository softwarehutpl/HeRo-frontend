import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ProjectsService } from 'src/app/modules/commons/services/projects/projects.service';
// import { }


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  public checked: boolean = true;
  public componentName: string = "projects";
  public isEditCreateProject: boolean = false;

  constructor(private _router: Router, private _projectService: ProjectsService) {

  }

  ngOnInit(): void {}
  testFunc() {
    alert('button pressed');
    
  }

  moveToCreateProject() {
    this._router.navigate(
      ['edit']
    )
  }
}
