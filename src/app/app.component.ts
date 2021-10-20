import { Component } from '@angular/core';
import { CalendarOptions, Duration } from '@fullcalendar/angular';

let d = new Date();
var t = d.getDay();
var w = d.getHours();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fullcalendar';


  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    weekends: false,
    // height: "auto",
    slotDuration: '00:15:00',
    businessHours: {
      // days of week. an array of zero-based day of week integers (0=Sunday)
      daysOfWeek: [ 1, 2, 3, 4, 5 ], // Monday - Thursday
    
      startTime: '09:00', // a start time (10am in this example)
      endTime: '17:00', // an end time (6pm in this example)
    },
    selectOverlap: false,
    showNonCurrentDates: false,
    scrollTime: w,
    firstDay: t,
    slotMinTime: "09:00:00",
    slotMaxTime: "17:00:00",
    validRange: {
      start: Date.now(),
      // end: Date.now() + (7776000) // sets end dynamically to 90 days after now (86400*90)
    },
    
  };
  
  
}
