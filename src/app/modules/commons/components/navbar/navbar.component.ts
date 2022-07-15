import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private _router: Router) {}

  public title: string = 'SoftwareHut Hiring';

  ngOnInit(): void {}

  public bellButton(): void {
    console.log('bell button pressed');
  }
  public userButton(): void {
    this._router.navigate(
      ['/login']
    )
 
  }
}
