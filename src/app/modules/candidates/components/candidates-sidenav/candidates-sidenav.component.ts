import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-candidates-sidenav',
  templateUrl: './candidates-sidenav.component.html',
  styleUrls: ['./candidates-sidenav.component.scss']
})
export class CandidatesSidenavComponent implements OnInit {

  
  constructor(@Inject(MAT_DIALOG_DATA) private candiate: any,) { }

  ngOnInit(): void {
  }

}
