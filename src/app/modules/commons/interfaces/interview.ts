export interface Interview {
    interviewId:       number;
    date:              Date;
    candidateId:       number;
    candidateName:     string;
    candidateLastName: string;
    candidateEmail:    string;
    workerId:          number;
    workerEmail:       string;
    type:              string;
}

// Generated by https://quicktype.io


export interface InterviewList {
    totalCount:           number;
    interviewDTOs:        InterviewDTO[];
    interviewFiltringDTO: InterviewFiltringDTO;
    sortOrder:            SortOrder;
    paging:               Paging;
}

export interface InterviewDTO {
    interviewId:       number;
    date:              Date;
    candidateId:       number;
    candidateName:     string;
    candidateLastName: string;
    candidateStatus:   "NEW" | "IN_PROCESSING"| "DROPPED_OUT"| "HIRED";
    candidateEmail:    string;
    workerId:          number;
    workerEmail:       string;
    type:              string;
}

export interface InterviewFiltringDTO {
    fromDate:    Date;
    toDate:      Date;
    candidateId: number;
    workerId:    number;
    type:        string;
}

export interface Paging {
    pageSize:   number;
    pageNumber: number;
}

export interface SortOrder {
    sort: Sort[];
}

export interface Sort {
    key:   string;
    value: string;
}
