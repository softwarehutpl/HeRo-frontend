import { ProjectListForTable } from "../interfaces/candidate";

export interface Projects {
    name: string;
    creator: string;
    from: Date;
    to: Date;
    resume: number;
    hired: number;
    id: number;
  }

export const DATA: Array<Projects> = [
    {
      name: 'JavaScript Developer',
      creator: 'John Doe',
      from: new Date('2022-01-01'),
      to: new Date('2022-04-31'),
      resume: 30,
      hired: 3,
      id: 1
    },
    {
      name: 'Angular Developer',
      creator: 'John Doe',
      from: new Date('2022-05-01'),
      to: new Date('2022-08-31'),
      resume: 99,
      hired: 1,
      id: 2
    },
    {
      name: 'React Developer',
      creator: 'John Doe',
      from: new Date('2022-09-01'),
      to: new Date('2022-12-31'),
      resume: 150,
      hired: 190,
      id: 3,
    },
    {
      name: 'JavaScript Developer',
      creator: 'John Doe',
      from: new Date('2022-01-01'),
      to: new Date('2022-04-31'),
      resume: 30,
      hired: 3,
      id:4,
    },
    {
      name: 'Angular Developer',
      creator: 'John Doe',
      from: new Date('2022-05-01'),
      to: new Date('2022-08-31'),
      resume: 99,
      hired: 1,
      id:5,
    },
    {
      name: 'React Developer',
      creator: 'John Doe',
      from: new Date('2022-09-01'),
      to: new Date('2022-12-31'),
      resume: 150,
      hired: 190,
      id: 6,
    },
    {
      name: 'JavaScript Developer',
      creator: 'John Doe',
      from: new Date('2022-01-01'),
      to: new Date('2022-04-31'),
      resume: 30,
      hired: 3,
      id: 7,
    },
    {
      name: 'Angular Developer',
      creator: 'John Doe',
      from: new Date('2022-05-01'),
      to: new Date('2022-08-31'),
      resume: 99,
      hired: 1,
      id: 8
    },
    {
      name: 'React Developer',
      creator: 'John Doe',
      from: new Date('2022-09-01'),
      to: new Date('2022-12-31'),
      resume: 150,
      hired: 190,
      id: 9,
    },
    {
      name: 'JavaScript Developer',
      creator: 'John Doe',
      from: new Date('2022-01-01'),
      to: new Date('2022-04-31'),
      resume: 30,
      hired: 3,
      id: 10,
    },
    {
      name: 'Angular Developer',
      creator: 'John Doe',
      from: new Date('2022-05-01'),
      to: new Date('2022-08-31'),
      resume: 99,
      hired: 1,
      id: 11
    },
    {
      name: 'React Developer',
      creator: 'John Doe',
      from: new Date('2022-09-01'),
      to: new Date('2022-12-31'),
      resume: 150,
      hired: 190,
      id: 12
    },
  ];

export const ProjectsList: Array<ProjectListForTable> = [
    {
        name: 'React Developer',
        creator: 'John Doe',
        from: new Date('2022-09-01'),
        to: new Date('2022-12-31'),
        resume: 150,
        hired: 190,
      },
      {
        name: 'JavaScript Developer',
        creator: 'John Doe',
        from: new Date('2022-01-01'),
        to: new Date('2022-04-31'),
        resume: 30,
        hired: 3,
      },
      {
        name: 'Angular Developer',
        creator: 'John Doe',
        from: new Date('2022-05-01'),
        to: new Date('2022-08-31'),
        resume: 99,
        hired: 1,
      },
      {
        name: 'React Developer',
        creator: 'John Doe',
        from: new Date('2022-09-01'),
        to: new Date('2022-12-31'),
        resume: 150,
        hired: 190,
      },
      {
        name: 'JavaScript Developer',
        creator: 'John Doe',
        from: new Date('2022-01-01'),
        to: new Date('2022-04-31'),
        resume: 30,
        hired: 3,
      },
      {
        name: 'Angular Developer',
        creator: 'John Doe',
        from: new Date('2022-05-01'),
        to: new Date('2022-08-31'),
        resume: 99,
        hired: 1,
      },
      {
        name: 'React Developer',
        creator: 'John Doe',
        from: new Date('2022-09-01'),
        to: new Date('2022-12-31'),
        resume: 150,
        hired: 190,
      },
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

