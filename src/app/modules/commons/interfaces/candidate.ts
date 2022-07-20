export interface Candidate {
  id: number;
  name: string;
  source: string | null;
  recruitmentName: string | null;
  status: string;
  stage: string | null;
  techId: number | null;
  techAssignee: string | null;
  recruiterId: number;
  recruiterEmail: string | null;
  //not available on backend (yet?):
  project: string; // = recruitmentName
  position: string;
  assignee: string;
  profile: string; //this is probably useless, because we just need ID to do proper API call.
}

export interface Projects {
  id: number;
  beginningDate: string;
  endingDate: string;
  name: string;
  description: string;
  recruiterId: number;
}

export interface ProjectListForTable {
  Name: string;
  // description: "description 1",
  Creator: string;
  From: string;
  To: string;
  Resume: number;
  Hired: number;
  actions: any;
}
