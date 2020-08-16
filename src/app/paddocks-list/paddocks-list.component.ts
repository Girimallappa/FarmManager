import { Farm } from './../models/farm';
import { Paddock } from './../models/paddock';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChange,
} from '@angular/core';
import * as _ from 'lodash';

/**
 * list component for Paddocks management
 */
@Component({
  selector: 'app-paddocks-list',
  templateUrl: './paddocks-list.component.html',
  styleUrls: ['./paddocks-list.component.css'],
})
export class PaddocksListComponent implements OnInit {
  @Input() farm: Farm;

  // True if farm form is submitted, else false
  @Input() isFarmSubmitted: boolean;

  // paddocks changed
  @Output('paddocksChanged')
  paddocksChanged: EventEmitter<Paddock[]>;

  constructor() {
    this.paddocksChanged = new EventEmitter<Paddock[]>();
  }

  ngOnInit(): void {}

  ngOnChanges(change: SimpleChange) {
    if (change['isFarmSubmitted'] !== undefined) {
      if (!change['isFarmSubmitted'].firstChange) {
        // flag changed
        this.isFarmSubmitted = change['isFarmSubmitted'].currentValue;
      }
    }
  }

  /*
   * Event handler when user choses to add a new paddock
   */
  addPaddock() {
    this.appendPaddock(this.farm.Paddocks);

    this.paddocksChanged.emit(this.farm.Paddocks);
  }

  /**
   * Append a paddock into the given array.
   * @param paddocks
   */
  private appendPaddock(paddocks: Paddock[]): void {
    let maxIndex = 0;
    if (paddocks.length > 0) {
      // Get the last index
      const maxIndexPaddock = _.maxBy(paddocks, (p) => p.Index);
      maxIndex = maxIndexPaddock.Index;
    }

    // Generate new index
    const newIndex = maxIndex + 1;

    // Create paddock and push to list
    const paddock = this.createPaddock(newIndex);
    paddocks.push(paddock);
  }

  /**
   * Create a paddock object with given index
   * @param index
   */
  private createPaddock(index: number): Paddock {
    const paddock = new Paddock();
    paddock.Index = index;
    return paddock;
  }

  /**
   * This is event handler when user presses delete for paddock. This comes from child paddock component.
   * @param paddock
   */
  paddockDeleted(paddock: Paddock): void {
    this.farm.Paddocks = this.removePaddock(paddock, this.farm.Paddocks);

    this.paddocksChanged.emit(this.farm.Paddocks);
  }

  /**
   * Remove the paddock object from the given paddock list
   * @param paddockToRemove
   * @param paddocksList
   */
  private removePaddock(
    paddockToRemove: Paddock,
    paddocksList: Paddock[]
  ): Paddock[] {
    // remove the paddock with index
    const newPaddocksList = _.filter(
      paddocksList,
      (p) => p !== paddockToRemove
    );

    // Sort the paddocks list
    _.sortBy(newPaddocksList, (p) => p.Index);

    // reset the indices
    for (let index = 1; index <= newPaddocksList.length; index++) {
      const paddock = newPaddocksList[index - 1];
      paddock.Index = index;
    }

    return newPaddocksList;
  }

  /**
   * This is event handler when paddock accordion is opened or closed
   * @param paddock
   */
  openChange(paddock: Paddock): void {
    // toggle the flag in paddock object. default will be false and in UI default state for accordion group is closed.
    paddock.isOpen = !paddock.isOpen;
  }

  isPaddockValid(p: Paddock): boolean {
    return (
      p.Name && p.Name.length > 0 && p.Code && p.Code.length > 0 && p.Area > 0
    );
  }
}
