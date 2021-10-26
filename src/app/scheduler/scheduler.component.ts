import { Component, OnInit } from '@angular/core';
import { CalendarOptions, Duration } from '@fullcalendar/angular';
import {ServicesService  } from '../services.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { duration } from 'moment';


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
  durationInSeconds = 10;
  title:any;
  start:any;
  end:any;
  color:any;
  deleteid:any;
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
    
  constructor(
    private formBuilder: FormBuilder, 
    private api:ServicesService, 
    private dialog:MatDialog, 
    private http:HttpClient,
    private snack:MatSnackBar
    ) 
  {}
  calendarOptions!: CalendarOptions;

  ngOnInit() {
    this.calendarOptions = {
      initialView: 'timeGridWeek',
      allDaySlot: false,
      eventColor: '#064dae',
      eventMaxStack: 2,
      select: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      events: 'https://pesapalscheduler.herokuapp.com/',  //events API endpoint
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
  $(".modal-title").text("Add Event on  " +arg.start.toUTCString());
  $(".eventstarttitle").text(arg.dateStr);
  this.start = arg.startStr
  this.end = arg.endStr
}
  // modal hide
  removeModal(){
    $("#myModalud").modal("hide");
  }
//Hide Modal PopUp and clear the form validations
hideForm(){
  $("#myModal").modal("hide");
  this.addEventForm.patchValue({ title : ""});
  this.addEventForm.get('title')?.clearValidators();
  this.addEventForm.get('title')?.updateValueAndValidity();
  }
  // delete event by id
  handleEventClick(data:any){
    $("#myModalud").modal("show");
    $(".modal-title").text("Delete event titled: " +data.event.title);
    this.deleteid = data.event.id
    console.log("event id is: " + data.event.id)
  }
  // delete by id
  onDeleteById(){
    this.http.delete( 'https://pesapalscheduler.herokuapp.com/changes/' + this.deleteid).subscribe(data => {
        console.log(data);
        this.snack.open("Schedule has been deleted successfully")
        setTimeout( () => {
          location.reload()
        }, 1000)
      });
  }
  // get title
  onTitleChanged(event:any){
    this.title = event.target.value;
    console.log("title>>>" + this.title)
  }
  // get user color
  onColorChanged(event:any){
    this.color = event.target.value;
  }
  // POST to API endpoint
  postData(){
    const uploadData = new FormData();
    uploadData.append("title", this.title);
    uploadData.append("start", this.start);
    uploadData.append("end", this.end);
    uploadData.append("color", this.color);
    this.api.CreateSchedule(uploadData).subscribe(response => {
      console.log(response)
      this.snack.open("Schedule has been created successfully")
        // setTimeout( () => { location.reload() }, 1000 );
        setTimeout( () => {
          location.reload()
        }, 1000)
      // alert("testing testing 1 2 3")//present toast
    });
  }
}
  
