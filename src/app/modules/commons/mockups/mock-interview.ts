import { DragDropRegistry } from '@angular/cdk/drag-drop';
import { CalendarEvent } from 'angular-calendar';
import {Interview} from '../interfaces/interview';

export const INTERVIEWS: Interview[]=[
{
    interviewId:       1,
    date:              new Date('2022-07-15'),
    candidateId:       1,
    candidateName:     "John 1",
    candidateLastName: "string",
    candidateEmail:    "string",
    workerId:          1,
    workerEmail:       "string",
    type:              "string"
},
{
    interviewId:       2,
    date:              new Date('2022-07-15'),
    candidateId:       2,
    candidateName:     "John 2",
    candidateLastName: "string",
    candidateEmail:    "string",
    workerId:          1,
    workerEmail:       "string",
    type:              "string"
},
{
    interviewId:       3,
    date:              new Date('2022-07-16'),
    candidateId:       3,
    candidateName:     "John 3",
    candidateLastName: "string",
    candidateEmail:    "string",
    workerId:          3,
    workerEmail:       "string",
    type:              "string"
},
{
    interviewId:       4,
    date:              new Date('2022-07-15'),
    candidateId:       4,
    candidateName:     "John 5",
    candidateLastName: "string",
    candidateEmail:    "string",
    workerId:          2,
    workerEmail:       "string",
    type:              "string"
},
]

export const COLORS: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  };

export const CALENDAR_EVENTS: CalendarEvent[] = [
    {
      id: 1,
      start: new Date("2022-07-16T03:24:00"),
      title: 'An event',
      draggable: true,
      color: COLORS.red,

    }, {
      id: 2,
      start: new Date("2022-07-15T03:24:00"),
      title: 'An event',
      draggable: true,
      color: COLORS.red,
    }, {
      id: 3,
      start: new Date("2022-07-15T13:44:00"),
      title: 'An',
      draggable: true,
      color: COLORS.blue,
    }, {
      id: 4,
      start: new Date("2022-07-16T13:44:00"),
      title: 'An event2',
      draggable: true,
      color: COLORS.yellow,
    }, {
      id: 5,
      start: new Date("2022-07-15T03:24:00"),
      title: 'An event3',
      draggable: true,
      color: COLORS.yellow,
    }, {
      id: 6,
      start: new Date("2022-07-15T03:24:00"),
      title: 'An event4',
      draggable: true,
      color: COLORS.blue,
    }, {
      id: 7,
      start: new Date("2022-07-15T03:24:00"),
      title: 'An event5showmore than needed',
      draggable: true,
      color: COLORS.red,
    }
  ];

  export const INTERVIEW={
    interviewId: 1,
    date:new Date("2022-07-19T12:03:24.895Z"),
    candidateId: 0,
    candidateName: "Mike",
    candidateLastName: "Mike",
    candidateEmail: "mike@gmail.com",
    candidateStatus: "NEW",
    workerId: 3,
    workerEmail: "string",
    type: "string"

  }