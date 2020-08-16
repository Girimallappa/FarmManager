import { Paddock } from './../models/paddock';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

/**
 * Paddocks service uses browser local store to store the paddocks.
 * The methods will use REST api in real application
 */
@Injectable({
  providedIn: 'root',
})
export class PaddockService {
  private storeKey = 'Paddocks';

  constructor() {}

  /**
   * Get all items from store
   */
  getAll(): Paddock[] {
    const localStrgItem = JSON.parse(localStorage.getItem(this.storeKey));
    return localStrgItem == null ? [] : localStrgItem.Paddocks;
  }

  /**
   * Add a Paddock to the store
   */
  addOrUpdate(paddock: Paddock): void {
    let paddocks = this.getAll();

    const paddockToUpdate = this.getById(paddock.Id);

    if (paddockToUpdate) {
      paddocks = _.filter(
        paddocks,
        (f: Paddock) => f.Id !== paddockToUpdate.Id
      );
    } else {
      const max = _.maxBy(paddocks, (f: Paddock) => f.Id);
      paddock.Id = max ? max.Id + 1 : 1;
    }

    paddocks.push(paddock);

    this.set(paddocks);
  }

  /**
   * Set paddocks in store
   */
  set(paddocks: Paddock[]): void {
    localStorage.removeItem(this.storeKey);
    localStorage.setItem(this.storeKey, JSON.stringify({ Paddocks: paddocks }));
  }

  /**
   * Get by id
   */
  getById(id: number): Paddock {
    const paddocks = this.getAll();

    const paddock: Paddock = _.find(paddocks, (f) => f.Id === id);

    return paddock;
  }

  /**
   * delete the paddock from store
   */
  delete(id: number): void {
    let paddocks = this.getAll();

    const paddockToDelete = this.getById(id);

    if (paddockToDelete) {
      paddocks = _.filter(
        paddocks,
        (f: Paddock) => f.Id !== paddockToDelete.Id
      );
      this.set(paddocks);
    }
  }

  /**
   * Gets the paddocks for given Ids
   * @param ids
   */
  getByIds(ids: number[]): Paddock[] {
    const paddocks = this.getAll();
    const filterdPaddocks = _.filter(paddocks, (p) => _.includes(ids, p.Id));
    return filterdPaddocks;
  }

  /**
   * Get paddocks by owner farm id
   * @param ownerFarmId
   */
  getByOwnerId(ownerFarmId: number): Paddock[] {
    const paddocks = this.getAll();
    const filterdPaddocks = _.filter(
      paddocks,
      (p) => p.OwnerFarmId === ownerFarmId
    );
    return filterdPaddocks;
  }
}
