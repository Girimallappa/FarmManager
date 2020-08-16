import { PaddockService } from './paddock.service';
import { FarmTypeEnum } from './../models/FarmTypeEnum';
import { Farm } from './../models/farm';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class FarmService {
  private storeKey = 'Farms';

  constructor(private _paddocksService: PaddockService) {}

  /**
   * Get all items from store
   */
  getAll(): Farm[] {
    const localStrgItem = JSON.parse(localStorage.getItem(this.storeKey));
    return localStrgItem == null ? [] : localStrgItem.Farms;
  }

  /**
   * Add a farm to the store
   */
  addOrUpdate(farm: Farm, isSeed: boolean): void {
    let farms = this.getAll();

    const farmToUpdate = this.getById(farm.Id);

    if (farmToUpdate) {
      farms = _.filter(farms, (f: Farm) => f.Id !== farmToUpdate.Id);
    } else {
      const max = _.maxBy(farms, (f: Farm) => f.Id);
      farm.Id = max ? max.Id + 1 : 1;
    }

    if (!isSeed) {
      // set the owner id for all paddocks to farm id
      for (const p of farm.Paddocks) {
        p.OwnerFarmId = farm.Id;
        p.isOpen = false;
        this._paddocksService.addOrUpdate(p);
      }

      const farmPaddocks = this._paddocksService.getByOwnerId(farm.Id);

      const paddockIds = _.chain(farmPaddocks)
        .map((p) => p.Id)
        .value();

      farm.PaddockIds = paddockIds;
    }

    farm.FarmTypeName = FarmTypeEnum[farm.FarmType];

    farms.push(farm);

    this.set(farms);
  }

  /**
   * Set farms in store
   */
  set(farms: Farm[]): void {
    localStorage.removeItem(this.storeKey);
    localStorage.setItem(this.storeKey, JSON.stringify({ Farms: farms }));
  }

  /**
   * Get by id
   */
  getById(id: number): Farm {
    const farms = this.getAll();

    const farm: Farm = _.find(farms, (f) => f.Id === +id);

    return farm;
  }

  /**
   * delete the farm from store
   */
  delete(id: number): void {
    let farms = this.getAll();

    const farmToDelete = this.getById(+id);

    if (farmToDelete) {
      farms = _.filter(farms, (f: Farm) => f.Id !== farmToDelete.Id);
      this.set(farms);
    }
  }

  /**
   * saves the farm
   * @param farm
   */
  saveFarm(farm: Farm): void {
    // remove the farm from store
    if (farm.Id > 0) {
      // remove all the paddocks
      for (const pId of farm.PaddockIds) {
        this._paddocksService.delete(pId);
      }

      // Remove the farm
      this.delete(farm.Id);
    }

    this.addOrUpdate(farm, false);
  }
}
