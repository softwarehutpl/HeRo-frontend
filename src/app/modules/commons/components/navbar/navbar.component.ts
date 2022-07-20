import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  private urlLogout: string =
    'https://swh-t-praktyki2022-app.azurewebsites.net/Auth/LogOut';

  constructor(private _router: Router, private _authService: AuthService) {}

  public title: string = 'SoftwareHut Hiring';

  ngOnInit(): void {}

  public bellButton(): void {
    console.log('bell button pressed');
    this._authService.getCandidates();
  }
  public userButton(): void {
    axios
      .get(this.urlLogout, { withCredentials: true })
      .then((res) => console.log(res));
    this._router.navigate(['/login']);
  }
}
