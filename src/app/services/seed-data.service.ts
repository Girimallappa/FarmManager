import { Paddock } from './../models/paddock';
import { Mill } from './../models/mill';
import { MillService } from './mill.service';
import { PaddockService } from './paddock.service';
import { Injectable } from '@angular/core';
import { FarmService } from './farm.service';
import * as _ from 'lodash';
import { Farm } from '../models/farm';

@Injectable({
  providedIn: 'root',
})
export class SeedDataService {
  constructor(
    private _farmsService: FarmService,
    private _paddocksService: PaddockService,
    private _millsService: MillService
  ) {}

  seedDataIfRequired(): void {
    const mills = this._millsService.getAll();
    if (!mills || mills.length === 0) {
      this.seedMillsData();
    }

    const farms = this._farmsService.getAll();
    if (!farms || farms.length === 0) {
      this.seedFarmsData();
    }
  }

  private seedMillsData(): void {
    for (let i = 1; i <= 5; i++) {
      const mill = new Mill();
      mill.Id = i;
      mill.Name = `Mill${i}`;
      mill.Address = `Mill${i} Australia`;
      mill.FarmIds = _.range((i - 1) * 20 + 1, i * 20 + 1);
      this._millsService.addOrUpdate(mill);
    }
  }

  private seedFarmsData(): void {
    for (let i = 1; i <= 100; i++) {
      const farm = new Farm();
      farm.Id = i;
      farm.Code = `Farm${i}`;
      farm.Name = `Farm${i}`;
      this.setMillerToFarm(farm);
      farm.HarvestedDateTime = new Date();
      farm.HarvestedDateTime.setMonth(farm.HarvestedDateTime.getMonth() - 6);
      this.setFarmType(farm);

      for (let j = 1; j <= 20; j++) {
        const paddock = new Paddock();
        paddock.OwnerFarmId = i;
        paddock.Code = `Paddock${i}${j}`;
        paddock.Name = `Paddock${i}${j}`;
        if (j <= 10) {
          paddock.Area = 10;
        } else {
          paddock.Area = 20;
        }
        paddock.Id = +`${i}${j}`;
        farm.PaddockIds.push(paddock.Id);
        this._paddocksService.addOrUpdate(paddock);
      }

      this._farmsService.addOrUpdate(farm, true);
    }
  }

  private setFarmType(farm: Farm): void {
    const farmType = _.random(0, 2);
    farm.FarmType = farmType;
  }

  private setMillerToFarm(farm: Farm): void {
    if (farm.Id <= 20) {
      farm.MillerId = 1;
      return;
    }

    if (farm.Id <= 40) {
      farm.MillerId = 2;
      return;
    }

    if (farm.Id <= 60) {
      farm.MillerId = 3;
      return;
    }

    if (farm.Id <= 80) {
      farm.MillerId = 4;
      return;
    }

    if (farm.Id <= 100) {
      farm.MillerId = 5;
      return;
    }
  }
}
