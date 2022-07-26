import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Data} from '../../components/definition';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  public sideBarComponentName: string = Data.sidebarButton2;
  public renderedComponentName?: string;
  constructor(private _router: Router) {}

  filtersForComponent(renderedComponent: string) {
    this.renderedComponentName = renderedComponent;
    if (this.sideBarComponentName === renderedComponent) {
      // this.JSONToFilterData(this.dataFilter);
      return Data.filtersSidebarButton2;
    } else {
      // this.JSONToFilterData(this.dataFilter2);
      return Data.filtersSidebarButton3;
    }
  }

}
