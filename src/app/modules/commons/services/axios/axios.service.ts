import  axios from 'axios';
import { AxiosInstance } from 'axios';
import { ErrorHandler } from '@angular/core';
import { Injectable } from '@angular/core';
import { ErrorResponse, GetOptions} from '../../interfaces/axios.interface';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  // private axiosClient: AxiosInstance;
  // private errorHandler: ErrorHandler;
  
// urlauth: string = `https://swh-t-praktyki2022-app.azurewebsites.net/Auth/SignIn?password=${{password}}&email=${{email}}`
  constructor() {} 

  public signIn() {
    axios({
      method:'get',
      url: 'https://jsonplaceholder.typicode.com/todos'})
      .then(res => console.log(res))
      .catch(err => console.error())

  
  }
}



