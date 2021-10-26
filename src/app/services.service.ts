import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const endpoint = 'http://localhost:8000'
const delete_endpoint = 'http://localhost:8000/changes/{id}'

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

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

