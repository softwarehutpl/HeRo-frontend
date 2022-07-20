import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {FormControl} from '@angular/forms';
import { Observable, startWith } from 'rxjs';
import { map } from 'rxjs/operators'

export interface User {
  name: string;
}
@Component({
  selector: 'app-create-edit-project',
  templateUrl: './create-edit-project.component.html',
  styleUrls: ['./create-edit-project.component.scss'],
})
export class CreateEditProjectComponent implements OnInit {
  public  myControl = new FormControl('');
  public textHeader: string = 'Create/Edit project';
  public textBody: string = 'Skills';
  public ratingArray: Array<number> = [];
  public totalStar: number = 5;
  public rating: number = 2;
  public filteredOptions!: Observable<Array<string>>;
  public listOfSkills: Array<string> = [
    'JavaScript',
    'C#',
    'Java',
    'Angular',
    'React',
  ];
  public listOfSkillsForProject: Array<string> = ['JavaScript', 'C#'];

  constructor(private fb: FormBuilder) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(el => this._filter(el)),
    );
  }
  public projectForm = this.fb.group({
    login: [''],
    password: [''],
  });

  
  ngOnInit() {
    for (let index = 0; index < this.totalStar; index++) {
      this.ratingArray.push(index);
    }
    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.listOfSkills.filter(option => option.toLowerCase().includes(filterValue));
  }

  calculateRating(newRating: number) {
    this.rating = newRating;
  }

  iconStatus(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  onSelection(choosenSkill: string) {
    console.log(this.listOfSkillsForProject);
    console.log(choosenSkill);
    if (this.listOfSkillsForProject.includes(choosenSkill)) {
      alert('Already on the list');
    } else {
      this.listOfSkillsForProject.push(choosenSkill);
    }
  }

  removeSkillFromProject(skillToRemove: string) {
    const updatedProjectSkils = this.listOfSkillsForProject.filter((skill) => {
      return skill !== skillToRemove;
    });
    this.listOfSkillsForProject = updatedProjectSkils;
  }
}
