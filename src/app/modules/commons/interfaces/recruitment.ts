// Generated by https://quicktype.io

export interface Recruitment {
    // id:                  number;
    beginningDate:       string;
    endingDate:          string;
    name:                string;
    description:         string;
    recruiterId:         number;
    recruitmentPosition: string;
    localization:        string;
    seniority:           string;
    isPublic:            boolean;
    skills:              SkillsForProjectId[];
}

export interface Skill {
    skillId:    number,
    name:       string,
    skillLevel: number,
}

export interface SkillsForProjectId {
    skillId: number;
    name: string;
    skillLevel: number;
  }

  export interface GetRecruitersItem {
    id: number;
    fullName: string;
  }


// Generated by https://quicktype.io

export interface RecruitmentList {
    totalCount:             number;
    recruitmentDTOs:        RecruitmentDTO[];
    recruitmentFiltringDTO: RecruitmentFiltringDTO;
    sortOrder:              SortOrder;
    paging:                 Paging;
}

export interface Paging {
    pageSize:   number;
    pageNumber: number;
}

export interface RecruitmentDTO {
    id:                  number;
    beginningDate:       Date;
    endingDate:          Date;
    name:                string;
    creator: string;
    description:         string;
    recruiterId:         number;
    candidateCount:      number;
    recruitmentPosition: string;
    localization:        string;
    seniority:           string;
    hiredCount:          number;
}

export interface RecruitmentFiltringDTO {
    name:          string;
    description:   string;
    showOpen:      boolean;
    showClosed:    boolean;
    beginningDate: Date;
    endingDate:    Date;
    showPrivate:   boolean;
}

export interface SortOrder {
    sort: Sort[];
}

export interface Sort {
    key:   string;
    value: string;
}

export interface GetRecruitmentListBodyRequest {
  name: string,
  description: string,
  showOpen: boolean,
  showClosed: boolean,
  beginningDate: string,
  endingDate: string,
  paging: {
    pageSize: number,
    pageNumber: number,
    },
    sortOrder: {
      sort: [
        {
          key: string,
          value: string
        }
      ]
    }
}


export interface RecruitmentById {
  id: number;
  beginningDate: Date;
  endingDate: Date,
  name: string;
  description: string;
  recruiterId: number;
  candidateCount: number,
  recruitmentPosition: string,
  localization: string,
  seniority: string,
  hiredCount: number,
  skills: SkillById[];
}

export interface SkillById {
  skillId: number;
      name: string;
      skillLevel: number;
}

export interface SillsList {
  id: number;
  skillLevel: number
}

export interface ProjectColumnLabel {
  Name: string;
  Creator: string;
  From: string;
  To: string;
  Resume: string;
  Hired: string;
  actions: string;
}

// type ProjectColumnLabelType = keyof typeof EProjectCOlumnLabel;