
export interface Filter {
    filterName: string,
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
    static filtersSidebarButton2: Array<Filter> = [{filterName: "Status",  subfilter: [{name: "New", checked: true, color: "status"}, {name: "In processing", checked: true, color: "status"},{name: "Dropped out", checked: true, color: "status"} ,{name: "Hired", checked: true, color: "status"}]},
    {filterName: "Stage",  subfilter: [{name: "Evaluation", checked: true, color: "Evaluation"}, {name: "Interview", checked: true, color: "Interview"}, {name: "Phone interview", checked: true, color: "PhoneInterview"}, {name: "Tech interview", checked: true, color: "TechInterview"}, {name: "Offer", checked: true, color: "Offer"}]}];
    static filtersSidebarButton3: Array<Filter> = [{filterName: "Status",  subfilter: [{name: "Open", checked: true, color: "status"}, {name: "Closed", checked: true, color: "status"}]}]
   
} 

