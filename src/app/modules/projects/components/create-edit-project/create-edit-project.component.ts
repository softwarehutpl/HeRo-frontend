import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-edit-project',
  templateUrl: './create-edit-project.component.html',
  styleUrls: ['./create-edit-project.component.scss']
})
export class CreateEditProjectComponent implements OnInit {
  public editHeader: string = 'Create/Edit project';

  constructor(private fb: FormBuilder) { }
  public projectForm = this.fb.group({
    login: [''],
    password: ['']
  })


  ngOnInit(): void {
  }

}
