import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ServicesService } from '../services.service'
import { DatePipe } from '@angular/common'

const scheduleStart:any = localStorage.getItem('startTime')
console.log(scheduleStart)
const date = new Date(scheduleStart)
var x =  date.setDate(date.getDate())
const t = new Date(x.toLocaleString())
// console.log(typeof + t)
// const IsoDateTo = moment(scheduleStart,'yyyy-MM-ddThh:mm').format('yyyy-MM-ddThh:mm');
// console.log(typeof + IsoDateTo)
// const www = new Date( Date.parse(scheduleStart));
// const vw = www.toLocaleDateString()

// yyyy-MM-ddThh:mm

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  times = scheduleStart
  start: any;
  end: any;
  title: any;

  constructor(private api:ServicesService) { }

  ngOnInit(): void {
  }

  onTitleChanged(event:any){
    this.title = event.target.value;
    console.log("title>>>" + this.title)
  }

  onStartChanged(event:any){
    this.start = event.target.value;
    console.log("start time>>>" + this.start)
  }

  onEndChanged(event:any){
    this.end = event.target.value;
    console.log("start time>>>" + this.end)
  }

  postData(){
    const uploadData = new FormData();
    uploadData.append("start", scheduleStart);
    uploadData.append("end", scheduleStart);
    uploadData.append("title", this.title);
    this.api.CreateSchedule(uploadData).subscribe(response => {
      console.log(response)
      location.reload()
      alert("Employee details uploaded successfully")//present toast
    });
  }
}
