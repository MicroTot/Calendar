import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
  decoded: any;
  error:any


  constructor(
    private formBuilder: FormBuilder,
    private route:Router, 
    private http:HttpClient
  ) { }

  ngOnInit(): void {
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
    this.http.post( environment.APIurl + "/api-token-auth/", this.form.getRawValue()).subscribe((res:any) => (
      this.token = console.log(res),
      this.decoded = btoa(this.username +":"+ this.password),
      localStorage.setItem("encoded", this.decoded),
      localStorage.setItem("jwt_token", JSON.stringify(res)),
      this.getPersonalData(),
      this.route.navigate(["home"])
    ), 
    (error:any) => (
      this.error = error.error.non_field_errors
    ))
  }

  getPersonalData(){
    var decoded = this.username +":"+ this.password
    var encodeHeader = btoa(decoded)
    var encoded = encodeHeader
    localStorage.setItem("encoded", encoded)
  }
}
