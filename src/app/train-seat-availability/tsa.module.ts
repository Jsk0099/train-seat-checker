import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { TrainSeatAvailabilityComponent } from './train-seat-availability/train-seat-availability.component';
import { TSARoutingModule } from './tsa-routing.module';

@NgModule({
  declarations: [
    TrainSeatAvailabilityComponent
  ],
  imports: [
    CommonModule,
    TSARoutingModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule
  ],
  entryComponents:[]
})
export class tsaModule { }
