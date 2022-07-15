import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  public checked: boolean = true;
  public isEditCreateProject: boolean = false;

  constructor(private _router: Router) {}

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
