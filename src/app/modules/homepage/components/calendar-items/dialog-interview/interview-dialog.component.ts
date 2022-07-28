import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InterviewDTO } from 'src/app/modules/commons/interfaces/interview';
import { CalendarService } from 'src/app/modules/commons/services/calendar/calendar.service';



@Component({
  selector: 'interview-dialog.component',
  templateUrl: 'interview-dialog.component.html',
  styleUrls: ['./interview-dialog.component.scss']
})
export class InterviewDialogComponent implements OnInit {


  interview !: InterviewDTO;
  constructor(@Inject(MAT_DIALOG_DATA) private id: number,private service: CalendarService) { }
  async ngOnInit(): Promise<void> {
    await this.loadData();
  }

  async loadData() {
    console.log(this.interview)
    this.interview = await this.service.getInterview(this.id);
    console.log(this.interview)
  }

}