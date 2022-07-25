export interface Candidate {
  id: number;
  name: string;
  recruiterAssignee: string;
  recruiterId: number;
  recruitmentName: string;
  source: string;
  stage: string | null;
  status: string;
  techId: number | null;
  techAssignee: string | null;
  profile: string | null; //this is probably useless, because we just need ID to do proper API call.
}
