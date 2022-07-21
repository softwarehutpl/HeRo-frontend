import { ProjectListForTable } from "../interfaces/candidate";

export const ProjectsList: Array<ProjectListForTable> = [
    {
    	
        Name: "project 1",
        // description: "description 1",
        Creator: "Jan Kowalski",
        From: "2022-07-14",
        To: "2022-07-14",
        Resume: 3,
        Hired: 15,
        actions:  true
},
{
    Name: "Jan Kowalski",
    // description: "description 1",
    Creator: "Jan Kowalski",
    From: "2022-07-14",
    To: "2022-07-14",
    Resume: 3,
    Hired: 15, 
    actions:  true
},
{

    Name: "project 1",
    // description: "description 1",
    Creator: "Jan Kowalski",
    From: "2022-07-14",
    To: "2022-07-14",
    Resume: 3,
    Hired: 15, 
    actions: true
},
{
    Name: "project 1",
    // description: "description 1",
    Creator: "Jan Kowalski",
    From: "2022-07-14",
    To: "2022-07-14",
    Resume: 3,
    Hired: 15, // add to data from serwer from candidates list
    actions:  true
}
];

export const ProjectColumnLable = [
    "Name",
    "Creator",
    "From",
    "To",
    "Resume",
    "Hired",
    "actions"
];

// Convert plain dictionaries into enums 
export enum EProjectColumnLabel {
    Name = "Name",
    Creator = "Creator",
    From = "From",
    To = "To",
    Resume = "Resume",
    Hired = "Hired",
    actions = "actions",
};
type ProjectColumnLabelType = keyof typeof EProjectColumnLabel;

const example = EProjectColumnLabel.Name;
const onlyValues = Object.values(EProjectColumnLabel);

