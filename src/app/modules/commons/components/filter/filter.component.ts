import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Data, Subfilter } from '../definition';
import { FiltersService } from '../../services/filters/filters.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProjectListoToAutocomplete } from '../../mockups/mock-projects';
import { ProjectsService } from '../../services/projects/projects.service';
import { Observable, startWith, map } from 'rxjs';
import { Project } from '../../mockups/mock-projects';
import { StageStatusData } from '../../interfaces/filters';
import { CandidatesDataService } from 'src/app/modules/candidates/services/candidates-data.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
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
  public checkboxLabels = { status: 'Status', stage: 'Stage' };
  public stageToSubfilter!: Subfilter[];
  public statusToSubfilter!: Subfilter[];
  public statusColor = 'STATUS';
  public cleanAutocomplete = this.projetService.cleanAutocompleteButton;
  public statusForm = this._fb.group({
    idNEW: new FormControl(this.filterService.idNEW),
    idIN_PROCESSING: new FormControl(this.filterService.idIN_PROCESSING),
    idDROPPED_OUT: new FormControl(this.filterService.idDROPPED_OUT),
    idHIRED: new FormControl(this.filterService.idHIRED),
    idOpen: new FormControl(this.filterService.idOpen),
    idClosed: new FormControl(this.filterService.idClosed),
  });
  public stageForm = this._fb.group({
    idEVALUATION: new FormControl(true),
    idINTERVIEW: new FormControl(true),
    idPHONE_INTERVIEW: new FormControl(true),
    idTECH_INTERVIEW: new FormControl(true),
    idOFFER: new FormControl(true),
  });

  constructor(
    public filterService: FiltersService,
    private _fb: FormBuilder,
    public projetService: ProjectsService,
    private _candidateService: CandidatesDataService
  ) {

    // this._candidateService.candidates.subscribe((result) => {
  
    //   // this.statusForm = this._fb.group({
    //   //   idNEW: new FormControl(this.filterService.idNEW),
    //   //   idIN_PROCESSING: new FormControl(this.filterService.idIN_PROCESSING),
    //   //   idDROPPED_OUT: new FormControl(this.filterService.idDROPPED_OUT),
    //   //   idHIRED: new FormControl(this.filterService.idHIRED),
    //   //   idOpen: new FormControl(this.filterService.idOpen),
    //   //   idClosed: new FormControl(this.filterService.idClosed),
    //   // });
    
    // });

    this.filterService.projectList$.subscribe({
      next: (data) => {
        console.log(data);
        this.listOfProjects = data;
        console.log(this.listOfProjects);
      },
    });
  }

  async ngOnInit() {
    this.filters = this.filterService.filtersForComponent(
      this.whichComponentRender
    );
    const dataForCheckboxCandidates =
      await this.filterService.getStageAndStatusList();
    this.convertCandidatesCacboxDTOToSubfilter(dataForCheckboxCandidates);
    if (this.whichComponentRender === 'projects') {
      this.statusToSubfilter = [
        { name: 'Open', checked: true, color: 'status' },
        { name: 'Closed', checked: true, color: 'status' },
      ];
    }
    this.projectAutocompleteOptions = this.autocompleteForm.valueChanges.pipe(
      startWith(''),
      map((el) => this._filter(el))
    );
  }

  public convertCandidatesCacboxDTOToSubfilter(
    dataDTOCheckbox: StageStatusData
  ) {
    this.stageToSubfilter = [];
    this.statusToSubfilter = [];
    dataDTOCheckbox.stage.map((el) => {
      const checkboxObject = {
        name: el,
        checked: true,
        color: el,
      };
      this.stageToSubfilter.push(checkboxObject);
    });
    dataDTOCheckbox.status.map((el) => {
      const checkboxObject = {
        name: el,
        checked: true,
        color: 'status',
      };
      this.statusToSubfilter.push(checkboxObject);
    });
  }

  private _filter(value: string): ProjectListoToAutocomplete[] {
    const filterValue = value.toLowerCase();
    return this.filterService.projectsListToAutocomplete.filter((option) =>
      option.projectName.toLowerCase().includes(filterValue)
    );
  }

  public async onSelection(project: ProjectListoToAutocomplete) {
    this.projetService.cleanAutocompleteButton = true;
    const res = await this.projetService.getProjectById(project.projectId);

    const readyProject: Project[] = [
      {
        name: res.name,
        creator: res.creator,
        from: new Date(res.beginningDate),
        to: new Date(res.endingDate),
        resume: res.candidateCount,
        hired: res.hiredCount,
        id: res.id,
      },
    ];
    this.projetService.projects$.next(readyProject);
  }

  public checkboxOnChange() {
    if (this.whichComponentRender === 'candidates') {
      const statusCandidates = [];
      const stageCandidates = [];

      const checkboxesStatus = this.statusForm.value;
      const checkboxesStage = this.stageForm.value;

      for (const key in checkboxesStatus) {
        if (checkboxesStatus[key] === false) {
          const removingInFromName = key.slice(2);
          statusCandidates.push(removingInFromName);
        }
      }
      for (const key in checkboxesStage) {
        if (checkboxesStage[key] === false) {
          const removingInFromName = key.slice(2);
          stageCandidates.push(removingInFromName);
        }
      }

      this._candidateService.getCandidatesForList(
        statusCandidates,
        stageCandidates
      );
      return;
    }

    const showOpen = this.statusForm.value.idOpen;
    const showClosed = this.statusForm.value.idClosed;

    this.projetService.getPublicProjectList(showOpen, showClosed);
  }

  public async cleanAutocompleteSearch() {
    const showOpen = this.statusForm.value.idOpen;
    const showClosed = this.statusForm.value.idClosed;
    await this.projetService.getPublicProjectList(showOpen, showClosed);
    this.projetService.cleanAutocompleteButton = false;
  }
}
