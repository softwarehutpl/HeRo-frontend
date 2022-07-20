import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { FormControl } from '@angular/forms';
import { Observable, startWith } from 'rxjs';
import { map } from 'rxjs/operators';
import { Skill } from 'src/app/modules/commons/interfaces/Skill';
import { ProjectsService } from 'src/app/modules/commons/services/projects/projects.service';

export interface User {
  name: string;
}
@Component({
  selector: 'app-create-edit-project',
  templateUrl: './create-edit-project.component.html',
  styleUrls: ['./create-edit-project.component.scss'],
})
export class CreateEditProjectComponent implements OnChanges, OnInit {
  
  public myControl = new FormControl('');
  public textHeader: string = 'Create/Edit project';
  public textBody: string = 'Skills';
  public ratingArray: Array<number> = [];
  public totalStar: number = 5;
  public rating: number = 2;
  public filteredOptions!: Observable<Array<Skill>>;
  public listOfSkillsForProject: Array<Skill> = [];
  public textareaValue: string = '';
  public listOfSkills: Array<Skill> = [];
  //   { id: 1, name: 'string1' },
  //   { id: 2, name: 'string2' },
  // ];

  ngOnChanges(): void {}

  constructor(private fb: FormBuilder, private _projectService: ProjectsService
  ) {
    this._projectService.projectSkills$.subscribe({
      next: (data) => {
        this.listOfSkills = data;
      },
    });
  }

  public projectForm = this.fb.group({
    projectName: [''],
    seniority: [''],
    from: [''],
    to: [''],
    location: [''],
    // login: [''],
    // password: [''],
  });

  public textareaForm = this.fb.group({
    textarea: new FormControl(''),
  });
  

  ngOnInit() {
    for (let index = 0; index < this.totalStar; index++) {
      this.ratingArray.push(index);
    }

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((el) => this._filter(el))
    );
  }

  private _filter(value: string): Array<Skill> {
    const filterValue = value.toLowerCase();

    return this.listOfSkills.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
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

  onSelection(choosenSkill: Skill) {
   
    if (this.listOfSkillsForProject.length !== 0) {
      let nameListOfSkillProject = this.listOfSkillsForProject.map((el) => {
        return el.name;
      });
     
      if (!nameListOfSkillProject.includes(choosenSkill.name)) {
        this.listOfSkillsForProject.push(choosenSkill);
      } else {
        alert('Skill already choosen');
      }
    } else {
      this.listOfSkillsForProject.push(choosenSkill);
    }
  }

  removeSkillFromProject(skillToRemove: Skill) {
    const updatedProjectSkils = this.listOfSkillsForProject.filter((skill) => {
      return skill !== skillToRemove;
    });
    this.listOfSkillsForProject = updatedProjectSkils;
  }

  saveProjectChanges() {

console.log(this.textareaForm.value.textarea)
  }
}
