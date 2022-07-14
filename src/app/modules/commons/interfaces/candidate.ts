export interface Candidate {
    id:number;
    name: string;
    source:string;
    project:string;
    position:string;
    status:string;
    stage:string;
    assignee:string;
    profile:string;
}

export interface Projects {
    	id: number,
        beginningDate: string,
        endingDate: string,
        name: string,
        description: string,
        recruiterId: number
}