import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor() { }

  isLoggedIn() {
    const token:any = localStorage.getItem('jwt_token'); // get token from local storage
  }
  
}
