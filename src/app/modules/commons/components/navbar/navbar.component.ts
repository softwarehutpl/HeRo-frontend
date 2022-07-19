import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import  axios from 'axios';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
private urlLogout: string = 'https://swh-t-praktyki2022-app.azurewebsites.net/Auth/LogOut';

  constructor(private _router: Router) {}

  public title: string = 'SoftwareHut Hiring';

  ngOnInit(): void {}

  public bellButton(): void {
    console.log('bell button pressed');
  }
  public userButton(): void {

    axios.get(this.urlLogout, {withCredentials: true})
    .then(res => console.log(res))
      this._router.navigate(
      ['/login']
    )
 
  }
}
