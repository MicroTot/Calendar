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

  constructor(private route:Router) { }

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
    var myHeaders = new Headers();
    var decoded = this.username +":"+ this.password
    var encodeHeader = btoa(decoded)
    var encoded = "Basic " +  encodeHeader
    localStorage.setItem("encoded", encoded)
    myHeaders.append("Authorization", encoded);
    var formdata = new FormData();
    formdata.append("username", this.username);
    formdata.append("password", this.password);
    var requestOptions:any = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("https://pesapalscheduler2.herokuapp.com/apii", requestOptions)
      .then(response => response.text())
      .then(result => this.info = localStorage.getItem("userdata"))
      .catch(error => console.log('error', error));
      }

}