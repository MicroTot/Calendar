import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { CalendarOptions, Duration } from '@fullcalendar/angular';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

declare let $: any; // ADD THIS
let d = new Date();
var today = d.getDay();
var time_now = d.getHours();


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
  saves:any

  constructor(private route:Router, private http:HttpClient, private dialog:MatDialog) { }
  calendarOptions!: CalendarOptions;

  ngOnInit(): void {
    this.tokenValidator()
    this.getPersonalData()

    this.calendarOptions = {
      initialView: 'timeGridWeek',
      allDaySlot: false,
      eventColor: '#064dae',
      eventMaxStack: 2,
      // select: this.handleDateClick.bind(this),
      // eventClick: this.handleEventClick.bind(this),
      events: this.saves,  //events API endpoint
      weekends: false,
      height: "auto",
      slotDuration: '0:15:00',
      timeZone: 'EAT',
      dayMaxEvents: true,
      eventResizableFromStart: false,
      eventOverlap: false,
      nowIndicator: true,
      droppable: true,
      editable: false,
      selectable: true,
      selectOverlap: false,
      showNonCurrentDates: false,
      scrollTime: time_now,
      firstDay: today,
      slotMinTime: "08:00:00",
      slotMaxTime: "18:00:00",
      validRange: { 
        start: Date.now(), // end: Date.now() + (7776000) // sets end dynamically to 90 days after now (86400*90)
      },
      dayCellDidMount: function(info:any) {
        // console.log("info log is " + info.date )
        if (info.date == 'Fri Nov 12 2021 03:00:00 GMT+0300 (East Africa Time)' || 
              info.date ==  'Tue Nov 12 2024 03:00:00 GMT+0300 (East Africa Time)'
            ){
          info.el.insertAdjacentHTML('beforeend', '<i class="fc-content" aria-hidden="true">🎉🎉🎉🎉🎉</i>');
        }
    },
      // slotLabelInterval:{minutes:15} , 
      headerToolbar: {
        right: 'prev,next today',
        center: 'title',
        left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      businessHours: {
        // days of week. an array of zero-based day of week integers (0=Sunday)
        daysOfWeek: [ 1, 2, 3, 4, 5  ], // Monday - Thursday
        startTime: '08:00', // a start time (10am in this example)
        endTime: '18:00', // an end time (6pm in this example)
      },
  };
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

  userDetails(){
    this.dialog.open(ModalComponent)
  }

  

  getPersonalData(){
    this.http.get('https://pesapalscheduler2.herokuapp.com/apii').subscribe(res => {
    this.saves = res
    console.log(this.saves)
    })
  }

}