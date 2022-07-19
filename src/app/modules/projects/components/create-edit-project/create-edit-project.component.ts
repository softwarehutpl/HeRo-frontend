import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-edit-project',
  templateUrl: './create-edit-project.component.html',
  styleUrls: ['./create-edit-project.component.scss']
})
export class CreateEditProjectComponent implements OnInit {
  public textHeader: string = 'Create/Edit project';
  public textBody: string = 'Skills';
  public ratingArray: Array<number> = [];
  public totalStar: number = 5;
  public rating: number = 2;
  public listOfSkills: Array<string> = ['JavaScript', 'C#'];

  constructor(private fb: FormBuilder) { }
  public projectForm = this.fb.group({
    login: [''],
    password: ['']
  })

  ngOnInit() {
    for (let index = 0; index < this.totalStar; index++) {
      this.ratingArray.push(index);
    }
  }
  

  calculateRating(newRating: number) {
    this.rating = (newRating);
  }

  iconStatus(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

}
