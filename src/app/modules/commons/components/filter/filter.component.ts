
import { Component, Input, OnChanges,  } from '@angular/core';
import { Filter, Data, Subfilter } from '../definition';
import { FiltersService } from '../../services/filters/filters.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { ProjectListoToAutocomplete } from '../../mockups/mock-projects';
import { ProjectsService } from '../../services/projects/projects.service';
import { Observable, startWith, map } from 'rxjs';
import { Project } from '../../mockups/mock-projects';
import { StageStatusData } from '../../interfaces/filters';



@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnChanges, OnInit {
  @Input() public whichComponentRender = '';
  @Input() public isAutocomplete?: boolean;
  @Input() public isStage?: boolean;

  // public check = new FormControl();
  public selected = 'all';
  public filters?: Subfilter[];
  public sidebarButton1 = Data.sidebarButton1;
  public sidebarButton2 = Data.sidebarButton2;
  public sidebarButton3 = Data.sidebarButton3;
  public listOfProjects: ProjectListoToAutocomplete[] = [];
  public autocompleteForm = new FormControl('');
  public projectAutocompleteOptions!: Observable<ProjectListoToAutocomplete[]>;
  public isChecked!: boolean;
  // public checkboxForm =  this._fb.group({

  //     })
  constructor(public filterService: FiltersService, private _fb: FormBuilder, private _projetService: ProjectsService) {
    this.filterService.projectList$.subscribe({
      next: (data) => {
        console.log(data)
        this.listOfProjects = data;
        console.log(this.listOfProjects)
      }
    })
  }


 ngOnChanges(): void {
    this.filters = this.filterService.filtersForComponent(
      this.whichComponentRender
    );
  }
  
  ngOnInit() {
    // this.listOfProjects.asObservable()
    this.projectAutocompleteOptions= this.autocompleteForm.valueChanges.pipe(
      startWith(''),
      map((el) => this._filter(el))
    );
  }

  private _filter(value: string): ProjectListoToAutocomplete[] {
    // console.log('from filter')
    const filterValue = value.toLowerCase();
    return this.filterService.projectsListToAutocomplete.filter((option) =>
      option.projectName.toLowerCase().includes(filterValue)
    );
  }

 public async onSelection(project: ProjectListoToAutocomplete) {

  const res = await this._projetService.getProjectById(project.projectId);

  const readyProject: Project[] =[ {
    name: res.name,
    creator: res.creator,
    from: new Date(res.beginningDate),
    to: new Date(res.endingDate),
    resume: res.candidateCount,
    hired: res.hiredCount,
    id: res.id,
  }];
  this._projetService.projects$.next(readyProject)
  }

  public checkboxOnChange(event: any, checkBoxName: string,) {
    const checked = event.target as HTMLInputElement;
    if(checkBoxName === "Open") {
      this.filterService.showOpen = checked.checked
      console.log(this.filterService.showOpen)
    } else if (checkBoxName === 'Closed') {
      this.filterService.showClosed = checked.checked
    }
   this._projetService.getPublicProjectList(this.filterService.showOpen, this.filterService.showClosed)
  }
}

