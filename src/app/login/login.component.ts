import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  token:any;
  info: any;
  form!: FormGroup;
  username: any;
  password: any;

  constructor(
    private formBuilder: FormBuilder,
    private route:Router, 
    private http:HttpClient
  ) { }

  ngOnInit(): void {
    // this.getPersonalData()
    this.form = this.formBuilder.group({
      // required fields
      username: ['', [Validators.required]], //required
      password: ['', [Validators.required]], //required
  })
}

  onUsernameChanged(event:any){
    this.username = event.target.value;
  }
  onPasswordChanged(event:any){
    this.password = event.target.value;
  }

  login(){
    this.http.post("https://pesapalscheduler2.herokuapp.com/api-token-auth/", this.form.getRawValue()).subscribe((res:any) => (
      this.token = console.log(res),
      localStorage.setItem("jwt_token", JSON.stringify(res)),
      this.getPersonalData(),
      this.route.navigate(['home'])
    ))
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
    fetch("http://localhost:8000/apii", requestOptions)
      .then(response => response.text())
      .then(result => localStorage.setItem("userdata", result))
      .catch(error => console.log('error', error));
      }

}
