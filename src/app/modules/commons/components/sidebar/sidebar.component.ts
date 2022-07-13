import { Component, OnInit } from '@angular/core';
import { Filter, Data } from '../definition';
import { FiltersService } from '../../services/filters/filters.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

public sidebarButton1: string = Data.sidebarButton1;
public sidebarButton2: string = Data.sidebarButton2;
public sidebarButton3: string = Data.sidebarButton3;

  constructor(private _filterService: FiltersService) {}

  ngOnInit(): void {}
  public click(): void {
    console.log('hej');
  }

  componentName(val: string) {
    this._filterService.componentNameBeingRendered(val)
  }
}
