import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { SchedulerComponent } from './scheduler/scheduler.component';

import {MatDialogModule} from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DatePipe } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import { KabarnetComponent } from './kabarnet/kabarnet.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { LoginComponent } from './login/login.component';

import { FormsModule, } from '@angular/forms';
import { AuthInterceptor } from '../app/auth.interceptor';
import { NgxColorsModule } from 'ngx-colors';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  listPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    SchedulerComponent,
    ModalComponent,
    HomeComponent,
    KabarnetComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTooltipModule,
    FormsModule, 
    NgxColorsModule,
    MatSelectModule, 
    MatInputModule
 
  ],
  providers: [DatePipe, 
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent, ]
})
export class AppModule { }
