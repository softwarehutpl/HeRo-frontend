export interface Subfilter {
    name: string,
    checked: boolean,
    color: string
}

export class Data {
    static sidebarButton1 = "home";
    static sidebarButton2 = "candidates";
    static sidebarButton3 = "projects";
    static filtersSidebarButton2: Subfilter[] = [{name: "New", checked: true, color: "status"}, {name: "In processing", checked: true, color: "status"},{name: "Dropped out", checked: true, color: "status"} ,{name: "Hired", checked: true, color: "status"}];
    // [{name: "Evaluation", checked: true, color: "Evaluation"}, {name: "Interview", checked: true, color: "Interview"}, {name: "Phone interview", checked: true, color: "PhoneInterview"}, {name: "Tech interview", checked: true, color: "TechInterview"}, {name: "Offer", checked: true, color: "Offer"}], 
    
    static filtersSidebarButton3: Subfilter[] = [{name: "Open", checked: true, color: "status"}, {name: "Closed", checked: true, color: "status"}];
   
} 

