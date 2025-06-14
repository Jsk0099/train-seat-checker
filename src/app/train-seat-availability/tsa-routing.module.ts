import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainSeatAvailabilityComponent } from './train-seat-availability/train-seat-availability.component';

const routes: Routes = [
  { path: '', component: TrainSeatAvailabilityComponent, data: { id: 'navtsa' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TSARoutingModule { }
