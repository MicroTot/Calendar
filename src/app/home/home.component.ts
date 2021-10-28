import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  token:any

  constructor(private route:Router) { }

  ngOnInit(): void {
    this.tokenValidator()
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

}