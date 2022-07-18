import { assertPlatform, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public urlAuth: string = `https://swh-t-praktyki2022-app.azurewebsites.net/Auth/SignIn`;
  

  constructor(private _router: Router) {} 

  public async isAuth(password: string, email: string) {
    console.log(email)
    console.log(password)
      // const headers = {
      //   'Access-Control-Allow-Origin': '*',
      //   // 'accept': 'text/plain'
      // };
  
      await axios.post(this.urlAuth, {password: password, email: email})
      .then( res => {
        if (res.statusText === 'OK') {
          console.log('ok')
          console.log(res.headers)
          console.log(res)
          // this.getCandidates() 
          return this._router.navigate(['/home'])
        } 
        this.getCandidates() 
        console.log(res)
        return 
        // console.log(res.status)
        // console.log(res)})
      })
  }

  getCandidates() {
    axios.get('https://swh-t-praktyki2022-app.azurewebsites.net/Candidate/Get/1')
    .then(res => console.log(res))
  }
}
