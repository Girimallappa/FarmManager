import { Mill } from './../models/mill';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class MillService {
  private storeKey = 'Mills';

  constructor() {}

  /**
   * Get all items from store
   */
  getAll(): Mill[] {
    const localStrgItem = JSON.parse(localStorage.getItem(this.storeKey));
    return localStrgItem == null ? [] : localStrgItem.Mills;
  }

  /**
   * Add a mill to the store
   */
  addOrUpdate(mill: Mill): void {
    let mills = this.getAll();

    const millToUpdate = this.getById(mill.Id);

    if (millToUpdate) {
      mills = _.filter(mills, (f: Mill) => f.Id !== millToUpdate.Id);
    } else {
      const max = _.maxBy(mills, (f: Mill) => f.Id);
      mill.Id = max ? max.Id + 1 : 1;
    }

    mills.push(mill);

    this.set(mills);
  }

  /**
   * Set mills in store
   */
  set(mills: Mill[]): void {
    localStorage.removeItem(this.storeKey);
    localStorage.setItem(this.storeKey, JSON.stringify({ Mills: mills }));
  }

  /**
   * Get by id
   */
  getById(id: number): Mill {
    const mills = this.getAll();

    const mill: Mill = _.find(mills, (f) => f.Id === +id);

    return mill;
  }

  /**
   * delete the mill from store
   */
  delete(id: number): void {
    let mills = this.getAll();

    const millToDelete = this.getById(id);

    if (millToDelete) {
      mills = _.filter(mills, (f: Mill) => f.Id !== millToDelete.Id);
      this.set(mills);
    }
  }
}
