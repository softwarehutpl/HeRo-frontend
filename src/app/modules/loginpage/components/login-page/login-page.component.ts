import { Component, } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/commons/services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
// export class LoginPageComponent implements OnChanges, OnInit {
  export class LoginPageComponent {
  public password = 'password';
  public email = '0';

  constructor(private _fb: FormBuilder, private _auth: AuthService) {}
  public loginForm = this._fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  async signIn() {
    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;
    this._auth.isAuth(this.password, this.email);
  }

  public onSubmit(form: any) {}

  public getNewPassword() {
    this.email = this.loginForm.value.email;
    this._auth.requestForEmailToRecoverThePassword(this.email);
  }
}
