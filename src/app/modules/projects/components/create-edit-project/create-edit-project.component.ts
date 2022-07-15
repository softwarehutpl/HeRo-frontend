import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-edit-project',
  templateUrl: './create-edit-project.component.html',
  styleUrls: ['./create-edit-project.component.scss']
})
export class CreateEditProjectComponent implements OnInit {
  public editHeader: string = 'Create/Edit project';

  constructor() { }

  ngOnInit(): void {
  }

}
