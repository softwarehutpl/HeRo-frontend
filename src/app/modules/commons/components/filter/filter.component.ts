import { Component, Input, OnChanges, } from '@angular/core';
import { Subfilter, Data } from '../definition';
import { FiltersService } from '../../services/filters/filters.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnChanges {
  @Input() public whichComponentRender = '';
  @Input() public isAutocomplete?: boolean;
  @Input() public isStage? : boolean;

  public selected = 'all';
  public filters?: Subfilter[];
  public sidebarButton1 = Data.sidebarButton1;
  public sidebarButton2 = Data.sidebarButton2;
  public sidebarButton3 = Data.sidebarButton3;
  public checkboxLabels = {status: "Status", stage: "Stage"}
  // public checkboxForm =  this._fb.group({

  //     })
  constructor(private _filterService: FiltersService, private _fb: FormBuilder) {
  
  }

 ngOnChanges(): void {
    this.filters = this._filterService.filtersForComponent(
      this.whichComponentRender
    );
  }
}
