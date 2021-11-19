import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { KabarnetComponent } from './kabarnet/kabarnet.component';
import { LoginComponent } from './login/login.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { AuthserviceService } from './services/authservice.service';
import { TrainingComponent } from './training/training.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'schedule',
    component: SchedulerComponent,
  },
  {
    path: 'kabarnet',
    component: KabarnetComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'training',
    component: TrainingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
