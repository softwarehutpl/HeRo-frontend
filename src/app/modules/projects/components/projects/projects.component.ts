import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  public checked: boolean = true;

  constructor() {}

  ngOnInit(): void {}
  testFunc() {
    alert('button pressed');
  }
}
