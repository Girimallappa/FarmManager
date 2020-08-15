import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';

// Third party
import { NgxPaginationModule } from 'ngx-pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { DateValueAccessorModule } from 'angular-date-value-accessor';

// Application
import { FarmService } from './services/farm.service';
import { MillService } from './services/mill.service';
import { PaddockService } from './services/paddock.service';
import { SeedDataService } from './services/seed-data.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FarmsListComponent } from './farms-list/farms-list.component';
import { FarmDetailsComponent } from './farm-details/farm-details.component';
import { EditFarmComponent } from './edit-farm/edit-farm.component';
import { SelectRequiredValidatorDirective } from './shared/select-required-validator.directive';
import { PaddocksListComponent } from './paddocks-list/paddocks-list.component';
import { PaddockComponent } from './paddock/paddock.component';

@NgModule({
  declarations: [
    AppComponent,
    FarmsListComponent,
    FarmDetailsComponent,
    EditFarmComponent,
    SelectRequiredValidatorDirective,
    PaddocksListComponent,
    PaddockComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    DateValueAccessorModule,
    BsDatepickerModule.forRoot(),
    AccordionModule.forRoot(),
  ],
  providers: [
    FarmService,
    MillService,
    PaddockService,
    SeedDataService,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
