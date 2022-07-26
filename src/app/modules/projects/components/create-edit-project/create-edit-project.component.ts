import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, startWith } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectsService } from 'src/app/modules/commons/services/projects/projects.service';
import {
  Recruitment,
  SkillsForProjectId,
  Skill,
  RecruitmentById,
} from '../../../commons/interfaces/recruitment';

@Component({
  selector: 'app-create-edit-project',
  templateUrl: './create-edit-project.component.html',
  styleUrls: ['./create-edit-project.component.scss'],
})
// export class CreateEditProjectComponent implements OnChanges, OnInit {
// export class CreateEditProjectComponent implements AfterViewInit, OnInit {
export class CreateEditProjectComponent implements OnInit {
  public myControl = new FormControl('');
  public textHeader = 'Create/Edit project';
  public textBody = 'Skills';
  public ratingArray: Array<number> = [];
  public totalStar = 5;
  public rating = 2;
  public filteredOptions!: Observable<Array<Skill>>;
  public listOfSkillsForProject: Array<Skill> = [];
  public textareaValue = '';
  public listOfSkills: Array<Skill> = [];
  public projectId!: number;
  public queryIdParam: string | null;
  public queryParamNumber!: number;
  public projectByIdData!: RecruitmentById;
  public formGroupData = {
    projectName: 'a',
    seniority: 'a',
    from: 'a',
    to: 'a',
    localion: 'a',
    textarea: 'a',
    isPublic: true,
  };

  constructor(
    private fb: FormBuilder,
    private _projectService: ProjectsService,
    private _route: ActivatedRoute
  ) {
    this.queryIdParam = this._route.snapshot.queryParamMap.get('projectId');

    this._projectService.projectSkills$.subscribe({
      next: (data) => {
        this.listOfSkills = data;
      },
    });
    this.projectId = this._projectService.readingProjectIdFromQueryParam();
  }

  public projectForm = this.fb.group({
    projectName: new FormControl(this.formGroupData.projectName, [Validators.required]),
    seniority: new FormControl(this.formGroupData.seniority, [
      Validators.required,
    ]),
    from: new FormControl(this.formGroupData.from, [Validators.required]),
    to: new FormControl(this.formGroupData.to, [Validators.required]),
    localion: new FormControl(this.formGroupData.localion, [
      Validators.required,
    ]),
    textarea: new FormControl(this.formGroupData.textarea, [
      Validators.required,
    ]),
    isPublic: new FormControl(false),
  });


  async ngOnInit() {
    for (let index = 0; index < this.totalStar; index++) {
      this.ratingArray.push(index);

      if (this.queryIdParam) {
        this.queryParamNumber = Number(this.queryIdParam);
        const projectByIdPromise = await this._projectService.getProjectById(
          this.queryParamNumber
        );
        this.projectByIdData = projectByIdPromise;
        this.listOfSkillsForProject = this.projectByIdData.skills
      }
     
  
      this.projectForm.patchValue({
        projectName: this.projectByIdData.name,
        seniority: this.projectByIdData.seniority,
        from: this.projectByIdData.beginningDate,
        to: this.projectByIdData.endingDate,
        localion: this.projectByIdData.localization,
        isPublic: true,
        textarea: this.projectByIdData.description,
      });
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
    
    const paramToNumber = Number(this.queryIdParam)

    const isSaved = await this._projectService.saveProject(body, paramToNumber);

    // if (isSaved) {
    //   alert("Project saved")
    //   // this._router.navigate()
    // }
  }

  public preparingFormatSkillsForProject(): SkillsForProjectId[] {
    const skills = this.listOfSkillsForProject.map((el) => {
      console.log(el)
      const oneSkill = {
        skillId: el.skillId,
        name: el.name,
        skillLevel: el.skillLevel,
      };
console.log(oneSkill)
      return oneSkill;
    });
    return skills;
  }

  onSubmit(form: FormGroup) {
    console.log(form);
  }
}
