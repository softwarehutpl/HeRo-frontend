// export interface Candidate {
//   id: number;
//   name: string;
//   recruiterEmail: string;
//   recruiterId: number;
//   recruitmentName: string;
//   source: string;
//   stage: string | null;
//   status: string;
//   techId: number | null;
//   techEmail: string | null;
//   profile: string | null; //this is probably useless, because we just need ID to do proper API call.
// }// Generated by https://quicktype.io

export interface CandidateCreate{
  date: Date,
  candidateId: number,
  workerId: number,
  type: string

}


export interface Candidate {
  id:                    number;
  fullName:              string;
  email:                 string;
  phoneNumber:           string;
  availableFrom:         Date;
  expectedMonthlySalary: number;
  otherExpectations:     string;
  cvPath:                string;
  interviewName:         string;
  interviewOpinionScore: number;
  interviewOpinionText:  string;
  hrName:                string;
  hrOpinionScore:        number;
  hrOpinionText:         string;
  notes:                 Note[];
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
  name: string;
  creator: string;
  from: Date
  to: Date
  resume: number;
  hired: number;
}

// Generated by https://quicktype.io

export interface CandidatesList {
  totalCount: number;
  candidateInfoForListDTOs: CandidateInfoForListDTO[];
  candidateFilteringDTO: CandidateFilteringDTO;
  sortOrder: SortOrder;
  paging: Paging;
}

export interface CandidateFilteringDTO {
  status: string[];
  stages: string[];
}

export interface CandidateInfoForListDTO {
  id: number;
  name: string;
  source: string;
  recruitmentName: string;
  status: string;
  stage: string;
  techId: number;
  techAssignee: string;
  recruiterId: number;
  recruiterAssignee: string;
}

export interface Paging {
  pageSize: number;
  pageNumber: number;
}

export interface SortOrder {
  sort: Sort[];
}

export interface Sort {
  key: string;
  value: string;
}


export interface Note{
  date: Date;
  score: number;
  techlead: string;
  text : string;
}