import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SchedulerComponent } from '../scheduler/scheduler.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  kabarnetRoute(){
    this.route.navigate(['kabarnet'])
  }

}