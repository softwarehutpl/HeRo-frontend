import { Component, OnInit, OnChanges, } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ConnectableObservable, Observable, startWith } from 'rxjs';
import { map } from 'rxjs/operators';
// import { Skill } from 'src/app/modules/commons/interfaces/Skill';
import { ProjectsService } from 'src/app/modules/commons/services/projects/projects.service';
import { Recruitment, SkillsForProjectId, Skill } from '../../../commons/interfaces/recruitment';


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

  constructor(private fb: FormBuilder, private _projectService: ProjectsService) {
    this._projectService.projectSkills$.subscribe({
      next: (data) => {
        this.listOfSkills = data;
      },
    });
  }

  public projectForm = this.fb.group({
    projectName: new FormControl('', [Validators.required]),
    seniority: new FormControl('', [Validators.required]),
    from: new FormControl('', [Validators.required]), //do we need to put the end date??
    to: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    textarea: new FormControl('', [Validators.required]),
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

  calculateRating(newRating: number, skillName: string) {
    this.listOfSkillsForProject.map(el => {
      if(el.name === skillName) {
        el.skillLevel = newRating
      }
    })
    console.log(this.listOfSkillsForProject, newRating)
    // this.rating = newRating;
  }

  iconStatus(index: number, indexOfSkillListForProject: number) {
    
    if (this.listOfSkillsForProject[indexOfSkillListForProject].skillLevel >= index + 1) {
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

  onSubmit(form: any) {}

  public async saveProject() {
    console.log('save project')
    let skilsForProject = await this.preparingFormatSkillsForProject();
    let body: Recruitment = {
      beginningDate: this.projectForm.value.from,
      endingDate: this.projectForm.value.to,
      name: this.projectForm.value.projectName,
      description: this.projectForm.value.description || 's',
      recruiterId: 1,
      recruitmentPosition: 'jaka?? skad??',
      localization: this.projectForm.value.localization || "g",
      seniority: this.projectForm.value.seniority,
      skills: skilsForProject,
    };
    let save = await this._projectService.saveProject(body)
  }

  public preparingFormatSkillsForProject(): SkillsForProjectId[] {
    // public preparingFormatSkillsForProject(): any {
    let skills = this.listOfSkillsForProject.map(el => {
      let oneSkill = {
        skillId: el.id,
        skillLevel: el.skillLevel
      };
      console.log('preparing skills ' + oneSkill)
      return oneSkill
    })
    console.log(skills)
    return skills
  }
}
