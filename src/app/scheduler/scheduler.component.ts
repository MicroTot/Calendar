import { Component, OnInit } from '@angular/core';
import { CalendarOptions, Duration } from '@fullcalendar/angular';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

import {ServicesService  } from '../services.service'
import { HttpClient } from '@angular/common/http';

// import * as $ from 'jquery';


declare var $: any; // ADD THIS
let d = new Date();
var today = d.getDay();
var time_now = d.getHours();
var calendarEl = document.getElementById('calendar');
let view = 'timeGridWeek'

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {
  Events:any = [];
  name: any;
  showModal!: boolean;
  calendarOptions!: CalendarOptions 
    
  constructor(public dialog: MatDialog, private api: ServicesService, private client:HttpClient) 
  {}

  ngOnInit(): void {
    this.getSchedules()
    this.calendarConfigurations()
  }
  openDialog(){
    this.dialog.open(ModalComponent)
    console.log("hey")
  }

  getSchedules(){
    return this.api.getScheduleData().subscribe(data=> {
      this.Events.push(data);
      console.log(this.Events)
    });
  }

  deleteEmployee(id: number){
    return this.api.deleteSchedule(id).subscribe(data => {
      console.log(data);
    },error=>{
      console.log(error)
    })
  }

  calendarConfigurations(){
    this.calendarOptions = {
      events: 'http://localhost:8000/',
      initialView: view,
      weekends: false,
      height: "auto",
      slotDuration: '00:15:00',
      businessHours: {
        // days of week. an array of zero-based day of week integers (0=Sunday)
        daysOfWeek: [ 1, 2, 3, 4, 5 ], // Monday - Thursday
        startTime: '09:00', // a start time (10am in this example)
        endTime: '17:00', // an end time (6pm in this example)
      },
      eventClick: function(info) {
        console.log(info)
      },
      headerToolbar: {
        right: 'prev,next today',
        center: 'title',
        left: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      dateClick: function(info) {
        let scheduleStartTime = info.dateStr
        console.log("DATE LOGGED IS" + scheduleStartTime)
        localStorage.removeItem("startTime")
        localStorage.setItem("startTime", JSON.stringify(scheduleStartTime));
      },
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
      slotMinTime: "09:00:00",
      slotMaxTime: "17:00:00",
      validRange: {
        start: Date.now(),
        // end: Date.now() + (7776000) // sets end dynamically to 90 days after now (86400*90)
      },
      
      eventDidMount: function(info) {
        // console.log(info.event.extendedProps);
      }
    };
  }

}
  
