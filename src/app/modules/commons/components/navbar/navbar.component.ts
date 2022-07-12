import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  public title: string = 'SoftwareHut Hiring';

  ngOnInit(): void {}

  public bellButton(): void {
    console.log('bell button pressed');
  }
  public userButton(): void {
    alert('user button pressed');
  }
}
