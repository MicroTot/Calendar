import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  info:any;
  token:any;
  username: any;
  password: any;

  constructor(private route:Router, private http:HttpClient) { }

  ngOnInit(): void {
    this.tokenValidator()
    this.getPersonalData()
  }

  tokenValidator(){
    const token:any = localStorage.getItem("jwt_token")
    // console.log(token)
    if (token == null || token == "undefined"){
      this.route.navigate([''])
    }else{
      this.token = jwt_decode(token)
    }
  }

  logout(){
    localStorage.clear()
    location.reload()
  }

  kabarnetRoute(){
    this.route.navigate(['kabarnet'])
  }

  

  getPersonalData(){
    this.http.get('http://127.0.0.1:8000/apii').subscribe(res => {
    console.log(res)
    })
  }

}