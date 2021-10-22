import { Component, OnInit } from '@angular/core';
import { CalendarOptions, Duration } from '@fullcalendar/angular';
import {ServicesService  } from '../services.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
// import * as $ from 'jquery';

declare let $: any; // ADD THIS
let d = new Date();
var today = d.getDay();
var time_now = d.getHours();


@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {
  title:any;
  start:any = []
  end:any;
  addEventForm!: FormGroup;
  submitted = false;
  //Add user form actions
  get f() { return this.addEventForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid and reset the validations
    this.addEventForm.get('title')?.setValidators([Validators.required])
    // this.addEventForm.get('title')?.setValidators([Validators.required]);
    this.addEventForm.get('title')?.updateValueAndValidity();
    if (this.addEventForm.invalid) {
        return;
    }}
    
  constructor(private formBuilder: FormBuilder, private api:ServicesService, private dialog:MatDialog) 
  {}
  calendarOptions!: CalendarOptions;

  ngOnInit() {


    this.calendarOptions = {
      initialView: 'timeGridWeek',
      allDaySlot: false,
      eventColor: '#064dae',
      eventMaxStack: 2,
      dateClick: this.handleDateClick.bind(this),
      events: 'http://localhost:8000/',
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
      slotMinTime: "09:00:00",
      slotMaxTime: "17:00:00",
      validRange: { 
        start: Date.now(),    // end: Date.now() + (7776000) // sets end dynamically to 90 days after now (86400*90)
      },
      headerToolbar: {
        right: 'prev,next today',
        center: 'title',
        left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      businessHours: {
        // days of week. an array of zero-based day of week integers (0=Sunday)
        daysOfWeek: [ 1, 2, 3, 4, 5 ], // Monday - Thursday
        startTime: '09:00', // a start time (10am in this example)
        endTime: '17:00', // an end time (6pm in this example)
      },
  };
  //Add User form validations
  this.addEventForm = this.formBuilder.group({
    title: ['', [Validators.required]]
    });
}
//Show Modal with Forn on dayClick Event
handleDateClick(arg:any) {
  console.log(arg)
  $("#myModal").modal("show");
  $(".modal-title, .eventstarttitle").text("");
  $(".modal-title").text("Add Event at : "+arg.dateStr);
  $(".eventstarttitle").text(arg.dateStr);
  this.start = arg.dateStr
  this.end = arg.dateStr
}
//Hide Modal PopUp and clear the form validations
hideForm(){
  $("#myModal").modal("hide");
  this.addEventForm.patchValue({ title : ""});
  this.addEventForm.get('title')?.clearValidators();
  this.addEventForm.get('title')?.updateValueAndValidity();
  }

  onTitleChanged(event:any){
    this.title = event.target.value;
    console.log("title>>>" + this.title)
  }

  postData(){
    const uploadData = new FormData();
    uploadData.append("start", this.start);
    uploadData.append("end", this.end);
    uploadData.append("title", this.title);
    this.api.CreateSchedule(uploadData).subscribe(response => {
      console.log(response)
      location.reload()
      // alert("testing testing 1 2 3")//present toast
    });
  }
}
  
