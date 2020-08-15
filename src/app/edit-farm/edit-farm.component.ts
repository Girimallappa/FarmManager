import { Paddock } from './../models/paddock';
import { FarmTypeEnum } from './../models/FarmTypeEnum';
import { MillService } from './../services/mill.service';
import { PaddockService } from './../services/paddock.service';
import { FarmService } from './../services/farm.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Farm } from '../models/farm';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import { Mill } from '../models/mill';
import * as _ from 'lodash';

@Component({
  selector: 'app-edit-farm',
  templateUrl: './edit-farm.component.html',
  styleUrls: ['./edit-farm.component.css'],
})
export class EditFarmComponent implements OnInit, AfterViewInit {
  title: string;
  farm: Farm;
  // Configuration for harvested date
  harvestedDatePickerConfig: Partial<BsDatepickerConfig>;
  isFarmSubmitted: boolean;
  harvestDateTimeStr: string;
  farmTypes: any;
  mills: Mill[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _farmService: FarmService,
    private _paddocksService: PaddockService,
    private _millsService: MillService,
    private datePipe: DatePipe
  ) {
    // Initialize configuration for harvested date control
    this.harvestedDatePickerConfig = Object.assign(
      {},
      {
        containerClass: 'theme-dark-blue',
        maxDate: new Date(), // Harvested cannot be in Future.
        dateInputFormat: 'DD/MM/YYYY',
      }
    );
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.farm.Id > 0) {
        this.harvestDateTimeStr = this.datePipe.transform(
          this.farm.HarvestedDateTime,
          'dd/MM/yyyy'
        );
      }
    }, 0);
  }

  ngOnInit(): void {
    const farmId = this._route.snapshot.params['id'];

    if (farmId > 0) {
      this.title = 'Edit Farm';
      this.farm = this._farmService.getById(farmId);
      this.farm.Paddocks = this._paddocksService.getByIds(this.farm.PaddockIds);
      this.initializePaddockIndices(this.farm.Paddocks);
    } else {
      this.title = 'Create Farm';
      this.farm = new Farm();
      this.farm.Paddocks = [];
    }

    this.mills = this._millsService.getAll();
    this.isFarmSubmitted = false;

    this.farmTypes = [];
    for (const key in FarmTypeEnum) {
      this.farmTypes.push({ word: key, value: FarmTypeEnum[key] });
    }
    this.farmTypes.splice(0, this.farmTypes.length / 2);
  }

  private initializePaddockIndices(paddocks: Paddock[]): void {
    // reset the indices
    for (let index = 1; index <= paddocks.length; index++) {
      const paddock = paddocks[index - 1];
      paddock.Index = index;
    }
  }

  /*
   * This is an event handler when paddocks are changed
   */
  onPaddocksChanged(paddocks: Paddock[]): void {
    // this.paddocks = paddocks;
  }

  submitFarm(farm: Farm) {
    this.isFarmSubmitted = true;
    const arePaddocksValid =
      this.farm.Paddocks.length > 0 &&
      _.every(this.farm.Paddocks, (p) => this.isPaddockValid(p));
    if (this.isFarmValid(this.farm) && arePaddocksValid) {
      // save changes
      this._farmService.saveFarm(farm);
      this.navigateToParent();
    }
  }

  cancelFarmChanges() {
    this.navigateToParent();
  }

  private isPaddockValid(p: Paddock): boolean {
    return (
      p.Name && p.Name.length > 0 && p.Code && p.Code.length > 0 && p.Area > 0
    );
  }

  private isFarmValid(f: Farm): boolean {
    return (
      f.Name &&
      f.Name.length > 0 &&
      f.Code &&
      f.Code.length > 0 &&
      f.HarvestedDateTime &&
      f.FarmType >= 0 &&
      f.MillerId > 0
    );
  }

  private navigateToParent(): void {
    if (this.farm.Id > 0) {
      this._router.navigate(['/details', this.farm.Id]);
    } else {
      this._router.navigate(['/home']);
    }
  }
}
