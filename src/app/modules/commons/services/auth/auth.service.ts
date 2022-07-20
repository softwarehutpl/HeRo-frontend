
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public urlAuth: string = "https://swh-t-praktyki2022-app.azurewebsites.net/Auth/SignIn";
  public urlRecoveryPassword: string = "https://swh-t-praktyki2022-app.azurewebsites.net/Auth/PasswordRecoveryMail";
 
  

  constructor(private _router: Router) {} 


  public async isAuth(password: string, email: string) {
    console.log(email)
    console.log(password)

      const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        // 'credentials': "include"
        // 'accept': 'text/plain',
      withCredentials: true
      };
  
      await axios.post(this.urlAuth, {password: password, email: email}, {
        withCredentials: true
      })
      .then( res => {
        if (res.statusText === 'OK') {
          console.log(res)
          this.getCandidates() 
          return this._router.navigate(['/home'])
        } 
        this.getCandidates() 
        console.log(res)
        return 
      })
  }

  getCandidates() {


    axios.get('https://swh-t-praktyki2022-app.azurewebsites.net/Skill/GetList', {withCredentials: true})
    .then(res => console.log(res))

  }

  isUserExist(userEmail: string) {
    axios.post(this.urlRecoveryPassword, null, {params: {email: userEmail}})
      .then(res => { 
        if(res.status === 200) {

        }
      console.log(res.status)})
  }



}

