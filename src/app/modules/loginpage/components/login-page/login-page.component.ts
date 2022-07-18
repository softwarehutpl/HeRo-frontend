import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AxiosService } from '../../../commons/services/axios/axios.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private _fb: FormBuilder, private _axiosService: AxiosService) { }
  public loginForm = this._fb.group({
    email: new FormControl ('',  [Validators.required, Validators.email]),
    password: new FormControl ('',)
  })

  ngOnInit(): void {
  }

  signIn() {
   
      // this._axiosService.signIn();
      this._axiosService.isAuth();
    }

    public onSubmit(form: any) {
  
    }
}
