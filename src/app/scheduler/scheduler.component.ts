import { Component, OnInit } from '@angular/core';
import { CalendarOptions, Duration } from '@fullcalendar/angular';
import {ServicesService  } from '../services.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { ModalComponent } from '../modal/modal.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import tippy from 'tippy.js';
import * as moment from 'moment';

import { environment } from '../../environments/environment'

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
  token:any;
  durationInSeconds = 10;
  title:any;
  start:any;
  end:any;
  color:any;
  deleteid:any;
  addEventForm!: FormGroup;
  submitted = false;
  time_select: any;
  fifteen: any;
  thirty: any
  one_hour: any;
  two_hour: any;

  scheduleName:any;
  colorScheme:any;
  dropdownTime: any;

  selected:any = [
    '15 minutes',
    '30 minutes',
    '1 hour',
    '2 hours',
  ]

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
    private snack:MatSnackBar, 
    private route:Router,
    private tip:MatTooltipModule
    ) {}

  calendarOptions!: CalendarOptions;

  ngOnInit() {
    this.tokenValidator()
    this.calendarOptions = {
      eventMouseEnter: function(info:any){
        var tooltip = tippy(info.el, {
          content: "Owner: " + info.event.extendedProps.user,
          placement: "top",
          interactive: true,
          arrow: true,
          theme: "material",
          appendTo: document.body,
          allowHTML: true,
          duration:[1, 1],
          animation: 'scale-extreme',
        });
      },
      progressiveEventRendering: true,
      initialView: 'timeGridWeek',
      allDaySlot: false,
      eventColor: '#064dae',
      events: environment.APIurl + '/api/appointments',
      eventMaxStack: 2,
      select: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDisplay: 'auto',
      weekends: false,
      height: "auto",
      slotDuration: '0:15:00',
      timeZone: 'EAT',
      dayMaxEvents: true,
      eventResizableFromStart: false,
      eventOverlap: false,
      nowIndicator: true,
      droppable: true,
      editable: true,
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
      // Add emoji on special days
      dayCellDidMount: function(info:any) {
        // console.log("info log is " + info.date )
        if (info.date == 'Fri Nov 12 2021 03:00:00 GMT+0300 (East Africa Time)' || 
              info.date ==  'Tue Nov 12 2024 03:00:00 GMT+0300 (East Africa Time)'
            ){
          info.el.insertAdjacentHTML('beforeend', '<i class="fc-content" aria-hidden="true">🎉</i>');
        }
    },
      slotLabelInterval:{hours:1}, //time interval
      headerToolbar: {
        right: 'prev,next today',
        center: 'title',
        left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      businessHours: {
        // days of week. an array of zero-based day of week integers (0=Sunday)
        daysOfWeek: [ 1, 2, 3, 4, 5  ], // Monday - Friday
        startTime: '08:00', // a start time
        endTime: '18:00', // an end time 
      },
  };
  //Add User form validations
  this.addEventForm = this.formBuilder.group({
    title: ['', [Validators.required]]
    });
}
//Show Modal with Form on dayClick Event
handleDateClick(arg:any) {
  let s1 = arg.startStr
  let s2 = arg.endStr 
  var newDateObj = moment(s1).add(15, 'm').format('YYYY-MM-DDTHH:mm:ss')
  if (s2 == newDateObj){ //if start time and end time matches, it means its just a date click. then,
    console.log(s2, "<=>", newDateObj) //the user is given a different form from selecting a number of pre-determined time durations
    $("#myModal2").modal("show");
    $(".modal-title, .eventstarttitle").text("")
    $(".modal-title").text("Add Event on  " +arg.start.toUTCString());
    $(".eventstarttitle").text(arg.dateStr);
    console.log("time to confirm against: ", arg)
    this.time_select = arg.startStr
    this.fifteen = moment(this.time_select).add(15, 'm').format("YYYY-MM-DDTHH:mm:ss")
    this.thirty = moment(this.time_select).add(30, 'minutes').format('YYYY-MM-DDTHH:mm:ss')
    this.one_hour = moment(this.time_select).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss')
    this.two_hour = moment(this.time_select).add(2, 'hour').format('YYYY-MM-DDTHH:mm:ss')
    console.log(this.fifteen, this.time_select)
  }else{
    console.log("THIS CALLS THE SELECT FUNCTION", arg)
    $("#myModal").modal("show");
    $(".modal-title, .eventstarttitle").text("");
    $(".modal-title").text("Add Event on  " +arg.start.toUTCString());
    $(".eventstarttitle").text(arg.dateStr);
    this.start = arg.startStr
    this.end = arg.endStr
  }
}
newTitle(event:any){
  this.scheduleName = event.target.value;
}
newColor(event:any){
  this.colorScheme = event.target.value;
}
newEndTIme(event:any){
  this.dropdownTime = event.target.value;
}
test(){
  const uploadData = new FormData();
  uploadData.append("title", this.scheduleName);
  uploadData.append("start", this.time_select);
  uploadData.append("end", this.dropdownTime);
  uploadData.append("color", this.colorScheme);
  console.log(this.colorScheme, "hey")
  this.api.CreateSchedule(uploadData).subscribe(response => {
    console.log(response)
    this.snack.open("HAS THIS WORKED???!!!!!!!!!")
      // setTimeout( () => { location.reload() }, 1000 );
      setTimeout( () => {
        location.reload()
      }, 1000)
    // alert("testing testing 1 2 3")//present toast
  });
  }
// this function is for ONLY clicking a single event without selecting
handleClick(){
  console.log("USER HAS ONLY CLICKED ONE EVENT")
  $("#myModal2").modal("show");
    $(".modal-title, .eventstarttitle").text("");
}
  // modal hide
  removeModal(){
    $("#myModalud").modal("hide");
  }
  popup(info:any){
    console.log("Name: " + info.event.extendedProps.user)
    this.tip
  }
//Hide Modal PopUp and clear the form validations
  hideForm(){
    $("#myModal").modal("hide");
    this.addEventForm.patchValue({ title : ""});
    this.addEventForm.get('title')?.clearValidators();
    this.addEventForm.get('title')?.updateValueAndValidity();
    }
    hideForm2(){
      $("#myModal2").modal("hide");
      this.addEventForm.patchValue({ title : ""});
      this.addEventForm.get('title')?.clearValidators();
      this.addEventForm.get('title')?.updateValueAndValidity();
      }
  // delete event by id
  handleEventClick(data:any){
    // $("#myModalud").modal("show");
    // $(".modal-title").text("Delete event titled: " +data.event.title);
    // this.deleteid = data.event.id
    // console.log("event id is: " + data.event.id)
  }
  // delete by id
  onDeleteById(){
    // this.http.delete( 'https://pesapalscheduler.herokuapp.com/changes/' + this.deleteid).subscribe(data => {
    //     console.log(data);
    //     this.snack.open("Schedule has been deleted successfully")
    //     setTimeout( () => {
    //       location.reload()
    //     }, 1000)
    //   });
      }

  // get title
  onTitleChanged(event:any){
    this.title = event.target.value;
  }
  // get user color
  onColorChanged(event:any){
    this.color = event.target.value;
  }
// disables 'Enter' keypress to prevent double submissions
  handleEnterKeyPress(event:any) {
    const tagName = event.target.tagName.toLowerCase();
    if (tagName !== 'textarea') 
    {
      return false;
    }
    else
    {
      return true;
    }
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
  // checks if user has logged in
  tokenValidator(){
    const token:any = localStorage.getItem("jwt_token")
    // console.log(token)
    if (token == null || token == "undefined"){
      this.route.navigate([''])
    }else{
      this.token = jwt_decode(token)
    }
  }
  // logout user
  logout(){
    localStorage.clear()
    location.reload()
  }
  // user name and email 
  userDetails(){
    this.dialog.open(ModalComponent)
  }
}
  
