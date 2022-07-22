import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';
import { InterviewDTO } from 'src/app/modules/commons/interfaces/interview';



@Component({
  selector: 'interview-dialog.component',
  templateUrl: 'interview-dialog.component.html',
  styleUrls: ['./interview-dialog.component.scss']
})
export class InterviewDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public event: InterviewDTO) {}

  log(dat:any){
    console.log(dat)
  }
}