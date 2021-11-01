import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  token:any;


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

}
