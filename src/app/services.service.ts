import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const endpoint = 'https://pesapalscheduler2.herokuapp.com/api/appointments'
const delete_endpoint = 'https://pesapalscheduler2.herokuapp.com/api/appointments/'

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  // CRUD 
  public getScheduleData(){
    return this.http.get(endpoint);
  }

  public deleteSchedule(id:any){
    return this.http.delete(delete_endpoint, id);
  }

  public updateSchedule(updateData: any){
    return this.http.get(endpoint, updateData);
  }
  
  public CreateSchedule(uploadData: any){
    return this.http.post<any>(endpoint, uploadData);
  }
}


// events: [
//   {
//     "title":"Event 1",
//     "start":"2021-10-14 14:00:00",
//     "end":"2021-10-14 15:00:00",
//     extendedProps: {
//       department: 'BioChemistry'
//     },
//  },
//  {
//     "title":"Event 2",
//     "start":"2021-10-13 13:00:00",
//     "end":"2021-10-13 13:30:00",
//     extendedProps: {
//       department: 'Math'
//     },
//  },
//  ​
// ],

