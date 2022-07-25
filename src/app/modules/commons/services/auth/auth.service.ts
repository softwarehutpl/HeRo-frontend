import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public urlAuth = 'https://swh-t-praktyki2022-app.azurewebsites.net/Auth/SignIn';
  public urlRecoveryPassword = 'https://swh-t-praktyki2022-app.azurewebsites.net/Auth/PasswordRecoveryMail';
  public urlLogout = 'https://swh-t-praktyki2022-app.azurewebsites.net/Auth/LogOut';

  constructor(private _router: Router) {}

  public async isAuth(password: string, email: string) {
    await axios
      .post(
        this.urlAuth,
        { password: password, email: email },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.statusText === 'OK') {
          return this._router.navigate(['/home']);
        }
        return;
      });
  }

  public requestForEmailToRecoverThePassword(userEmail: string) {
    axios
      .post(this.urlRecoveryPassword, null, { params: { email: userEmail } })
      .catch(error => console.log(error))
  }

  public async logout() {
    await axios.get(this.urlLogout, {withCredentials: true})
    this._router.navigate(['/login']);
  }
}
