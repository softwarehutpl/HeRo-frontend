import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public urlAuth: string = `https://swh-t-praktyki2022-app.azurewebsites.net/Auth/SignIn`;
  

  constructor() {} 

  public async isAuth(password: string, email: string) {
    console.log(email)
    console.log(password)
      const headers = {
        'Access-Control-Allow-Origin': '*',
        'accept': 'text/plain'
      };
  
      await axios.post(this.urlAuth, null, {params: {password: password, email: email}, headers})
      .then( res => console.log(res))
  }

}
