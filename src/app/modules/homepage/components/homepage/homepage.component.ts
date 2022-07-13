import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  numberNewCandiates = 5;
  numberInterviews = 8;

  constructor() { }

  ngOnInit(): void {
  }

}
