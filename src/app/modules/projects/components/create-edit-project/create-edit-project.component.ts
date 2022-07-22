import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Route } from '@angular/router';
import { Observable, startWith } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectsService } from 'src/app/modules/commons/services/projects/projects.service';
import {
  Recruitment,
  SkillsForProjectId,
  Skill,
} from '../../../commons/interfaces/recruitment';

@Component({
  selector: 'app-create-edit-project',
  templateUrl: './create-edit-project.component.html',
  styleUrls: ['./create-edit-project.component.scss'],
})
// export class CreateEditProjectComponent implements OnChanges, OnInit {
export class CreateEditProjectComponent implements OnInit {
  public myControl = new FormControl('');
  public textHeader: string = 'Create/Edit project';
  public textBody: string = 'Skills'; // Sometimes its worth to organize properties int groups. How about 
  // labels = { body: 'Skills', header: 'Create/Edit project' }
  public ratingArray: Array<number> = [];
  public totalStar = 5;
  public rating = 2;
  public filteredOptions!: Observable<Array<Skill>>;
  public listOfSkillsForProject: Array<Skill> = [];
  public textareaValue = '';
  public listOfSkills: Array<Skill> = [];
  public projectId!: number;

  constructor(
    private fb: FormBuilder,
    private _projectService: ProjectsService,
    // private _router: Route
  ) {
    this._projectService.projectSkills$.subscribe({
      next: (data) => {
        this.listOfSkills = data;
      },
    });
    this.projectId = this._projectService.readingProjectIdFromQueryParam();
    console.log(
      (this.projectId = this._projectService.readingProjectIdFromQueryParam())
    );
  }

  public projectForm = this.fb.group({
    projectName: new FormControl('', [Validators.required]),
    seniority: new FormControl('', [Validators.required]),
    from: new FormControl('', [Validators.required]),
    to: new FormControl('', [Validators.required]),
    localion: new FormControl('', [Validators.required]),
    textarea: new FormControl('', [Validators.required]),
    isPublic: new FormControl(false),
  });

  ngOnInit() {
    for (let index = 0; index < this.totalStar; index++) {
      this.ratingArray.push(index);

      console.log(this.projectId);
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

  calculateRating(newRating: number, skillName: string) {
    this.listOfSkillsForProject.map((el) => {
      if (el.name === skillName) {
        el.skillLevel = newRating;
      }
    });
  }

  iconStatus(index: number, indexOfSkillListForProject: number) {
    if (
      this.listOfSkillsForProject[indexOfSkillListForProject].skillLevel >=
      index + 1
    ) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  onSelection(choosenSkill: Skill) {
    if (this.listOfSkillsForProject.length !== 0) {
      const nameListOfSkillProject = this.listOfSkillsForProject.map((el) => {
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

  public async saveProject() {
    const skilsForProject = this.preparingFormatSkillsForProject();

    const body: Recruitment = {
      beginningDate: '2022-07-21T10:28:24.254Z',
      endingDate: '2022-07-29T10:28:24.254Z',
      name: this.projectForm.value.projectName,
      description: this.projectForm.value.textarea,
      recruiterId: 1,
      recruitmentPosition: 'jaka?? skad??',
      localization: this.projectForm.value.localion,
      seniority: this.projectForm.value.seniority,
      isPublic: this.projectForm.value.isPublic,
      skills: skilsForProject,
    };

    const isSaved = await this._projectService.saveProject(body);

    // if (isSaved) {
    //   alert("Project saved")
    //   // this._router.navigate()
    // }
  }

  public preparingFormatSkillsForProject(): SkillsForProjectId[] {
    const skills = this.listOfSkillsForProject.map((el) => {
      const oneSkill = {
        skillId: el.id,
        skillLevel: el.skillLevel,
      };

      return oneSkill;
    });
    return skills;
  }

  onSubmit(form: FormGroup) {
    console.log(form);
  }
}
