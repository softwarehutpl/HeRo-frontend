import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  public checked: boolean = true;
  public tasks: Array<object> = [{name: 'Open', completed: true, color: 'primary'}];

  constructor() { }

  ngOnInit(): void {
  }

}
