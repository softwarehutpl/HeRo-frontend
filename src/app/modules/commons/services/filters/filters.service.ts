import { Injectable } from '@angular/core';
import { Filter, Data } from '../../components/definition';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  // private filters: Array<Filter> = Data.filtersSidebarButton3;
  public sideBarComponentName: string = Data.sidebarButton1;

  constructor() {}

  filtersForComponent() {
    if (this.sideBarComponentName === Data.sidebarButton2) {
      return Data.filtersSidebarButton2
    } else  {
      return Data.filtersSidebarButton3
    }

  } 
  

  isdropdown() {
    if (this.sideBarComponentName === Data.sidebarButton2) {
      console.log('folters candidates');
      return false;
    }
    return true;
  }

  componentNameBeingRendered(sideBarComponentName: string) {
    this.sideBarComponentName = sideBarComponentName;
    console.log(this.sideBarComponentName);
  }
}
