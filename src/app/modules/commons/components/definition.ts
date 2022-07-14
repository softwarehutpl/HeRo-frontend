
export interface Filter {
    filterName: string,
    color: string,
    subfilter: Array<Subfilter>,

}

export interface Subfilter {
    name: string,
    checked: boolean,
    color: string
}

export class Data {
    static sidebarButton1: string = "home";
    static sidebarButton2: string = "candidates";
    static sidebarButton3: string = "projects";
    static filtersSidebarButton2: Array<Filter> = [{filterName: "Status", color: "primary", subfilter: [{name: "Open1", checked: true, color: "red"}, {name: "Close1", checked: true, color: "primary"}, {name: "Open1", checked: true, color: "primary"}]},
    {filterName: "Stage", color: "primary", subfilter: [{name: "Open2", checked: true, color: "primary"}, {name: "Close2", checked: true, color: "primary"}, {name: "Open2", checked: true, color: "primary"}]}];
    static filtersSidebarButton3: Array<Filter> = [{filterName: "Status", color: "primary", subfilter: [{name: "Open1", checked: true, color: "primary"}, {name: "Close1", checked: true, color: "primary"}, {name: "Open1", checked: true, color: "primary"}]}]
   
} 

