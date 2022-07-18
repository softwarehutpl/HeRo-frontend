import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Filter, Data } from '../definition';
import { FiltersService } from '../../services/filters/filters.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnChanges, OnInit {

  @Input() public whichComponentRender: string = '';

public selected: string = "all";
public isDropdow: boolean= false;
public filters?: Array<Filter> ;
public sidebarButton1: string = Data.sidebarButton1;
public sidebarButton2: string = Data.sidebarButton2;
public sidebarButton3: string = Data.sidebarButton3;

  constructor(private _filterService: FiltersService) {
    this.isDropdow = _filterService.isdropdown();
   }

   ngOnChanges(): void {
    this.filters = this._filterService.filtersForComponent(this.whichComponentRender);
    console.log(this.whichComponentRender)
   }

  ngOnInit(): void {}



}
