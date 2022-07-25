import { Component, Input, OnChanges, } from '@angular/core';
import { Filter, Data } from '../definition';
import { FiltersService } from '../../services/filters/filters.service';

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

  constructor(private _filterService: FiltersService) {}

  ngOnChanges(): void {
    this.filters = this._filterService.filtersForComponent(
      this.whichComponentRender
    );
  }
}
