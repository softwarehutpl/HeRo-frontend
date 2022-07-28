import { Component, Input, OnChanges,  } from '@angular/core';
import { Filter, Data } from '../definition';
import { FiltersService } from '../../services/filters/filters.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { ProjectListoToAutocomplete } from '../../mockups/mock-projects';
import { ProjectsService } from '../../services/projects/projects.service';
import { Observable, startWith, map } from 'rxjs';



@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnChanges {
  @Input() public whichComponentRender = '';
  @Input() public isAutocomplete?: boolean;

  public selected = 'all';
  public filters?: Array<Filter>;
  public sidebarButton1 = Data.sidebarButton1;
  public sidebarButton2 = Data.sidebarButton2;
  public sidebarButton3 = Data.sidebarButton3;
  public listOfProjects: ProjectListoToAutocomplete[] = [];
  // public listOfProjects
  public autocompleteForm = new FormControl('');
  public projectAutocompleteOptions!: Observable<ProjectListoToAutocomplete[]>
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
    console.log('from filter')
    const filterValue = value.toLowerCase();
    return this.filterService.projectsListToAutocomplete.filter((option) =>
      option.projectName.toLowerCase().includes(filterValue)
    );
  }

  onSelection(project: ProjectListoToAutocomplete) {

    console.log(project)
    // if (this.listOfSkillsForProject.length !== 0) {
    //   const nameListOfSkillProject = this.listOfSkillsForProject.map((el) => {
    //     return el.name;
    //   });
    //   if (!nameListOfSkillProject.includes(choosenSkill.name)) {
    //     this.listOfSkillsForProject.push(choosenSkill);
    //   } else {
    //     alert('Skill already choosen');
    //   }
    // } else {
    //   this.listOfSkillsForProject.push(choosenSkill);
    // }
  }



}

