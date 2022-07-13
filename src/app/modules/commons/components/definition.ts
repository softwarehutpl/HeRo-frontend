
export interface Filter {
    filterName: string,
    subfilter: Array<Subfilter>,

}

interface Subfilter {
    name: string
}

export class Data {
    static sidebarButton1: string = "home";
    static sidebarButton2: string = "candidates";
    static sidebarButton3: string = "projects";
    static filtersSidebarButton2: Array<Filter> = [{filterName: "Status", subfilter: [{name: "Open1"}, {name: "Close1"}, {name: "Open1"}]},
    {filterName: "Stage", subfilter: [{name: "Open2"}, {name: "Close2"}, {name: "Open2"}]}];
    static filtersSidebarButton3: Array<Filter> = [{filterName: "Status", subfilter: [{name: "Open1"}, {name: "Close1"}, {name: "Open1"}]}]

} 

