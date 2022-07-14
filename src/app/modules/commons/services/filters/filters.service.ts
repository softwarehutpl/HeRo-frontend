import { Injectable } from '@angular/core';
import { Filter, Data } from '../../components/definition';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  // private filters: Array<Filter> = Data.filtersSidebarButton3;
  public sideBarComponentName: string = Data.sidebarButton1;
  public dataFilter: string ='{"label":{"new":"New","inProcessing":"In processing","droppedOut":"Dropped out","hired":"Hired"},"stage":{"evaluation":"Evaluation","interView":"Interview","phoneInterview":"Phone interview","techInterview":"Tech interview","offer":"Offer"},"checked":"true"}';
  public dataFilter2: string =
    '{"status":{"open":"Open","closed":"Closed"},"checked":"true"}';
  constructor() {}

  filtersForComponent() {
    if (this.sideBarComponentName === Data.sidebarButton2) {
      this.JSONToFilterData(this.dataFilter);
      return Data.filtersSidebarButton2;
    } else {
      this.JSONToFilterData(this.dataFilter2);
      return Data.filtersSidebarButton3;
    }
  }

  JSONToFilterData(JSONdata: string) {
    let data = JSON.parse(JSONdata);
    this.mapData(data);
  }

  mapData(data: Object) {
    let dataTomapForFilterUsage: object = data;
    let mappedFilters = [];
    // for (const item in dataTomapForFilterUsage) {
    //  let a = dataTomapForFilterUsage
     
    //   let obj: Filter= {filterName:'', subfilter: []};
    //   obj.filterName = item;
    //   console.log(item)
    //   console.log(dataTomapForFilterUsage)

    // }
 
    for (const [key, value] of Object.entries(dataTomapForFilterUsage)){
      let obj: Filter= {filterName:'', subfilter: []};
      obj.filterName = key;
      console.log(obj.filterName)
      console.log(value)
    }
  }

  isdropdown() {
    if (this.sideBarComponentName === Data.sidebarButton2) {
      return false;
    }
    return true;
  }

  componentNameBeingRendered(sideBarComponentName: string) {
    this.sideBarComponentName = sideBarComponentName;
  }
}
