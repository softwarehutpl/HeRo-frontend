import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private _router: Router, private _authService: AuthService) {}

  public title = 'SoftwareHut Hiring';

  public bellButton(): void {
    //na co dziala bellButton
  }

  public async userButton() {
    this._authService.logout();
  }
}
