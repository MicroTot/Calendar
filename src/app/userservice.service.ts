import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8000/api-token-auth/';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor() { }
}
