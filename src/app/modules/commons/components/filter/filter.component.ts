import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Subfilter, Data } from '../definition';
import { FiltersService } from '../../services/filters/filters.service';
import { FormBuilder } from '@angular/forms';
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

  public selected = 'all';
  public filters?: Subfilter[];
  public sidebarButton1 = Data.sidebarButton1;
  public sidebarButton2 = Data.sidebarButton2;
  public sidebarButton3 = Data.sidebarButton3;
  public checkboxLabels = { status: 'Status', stage: 'Stage' };
  public stageToSubfilter!: Subfilter[];
  public statusToSubfilter!: Subfilter[];
  public statusColor = 'STATUS';

  // public checkboxForm =  this._fb.group({

  //     })
  constructor(
    private _filterService: FiltersService,
    private _fb: FormBuilder
  ) {}

  ngOnChanges(): void {
    this.filters = this._filterService.filtersForComponent(
      this.whichComponentRender
    );
  }

  async ngOnInit() {
    const dataForCheckboxCandidates =
      await this._filterService.getStageAndStatusList();
    console.log(dataForCheckboxCandidates);
    this.convertCandidatesCacboxDTOToSubfilter(dataForCheckboxCandidates);
    if (this.whichComponentRender === 'projects') {
this.statusToSubfilter = [{name: "Open", checked: true, color: "status"}, {name: "Closed", checked: true, color: "status"}];
    }
  }

  public convertCandidatesCacboxDTOToSubfilter(
    dataDTOCheckbox: StageStatusData
  ) {
    this.stageToSubfilter = [];
    this.statusToSubfilter = [];
    const stageSubfilter = dataDTOCheckbox.stage.map((el) => {
      const checkboxObject = {
        name: el,
        checked: true,
        color: el,
      };
      this.stageToSubfilter.push(checkboxObject);
    });
    const statusSubfilter = dataDTOCheckbox.status.map((el) => {
      const checkboxObject = {
        name: el,
        checked: true,
        color: 'status',
      };
      this.statusToSubfilter.push(checkboxObject);
    });
  }
}
