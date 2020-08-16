import { Paddock } from './../models/paddock';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChange,
} from '@angular/core';

/**
 * Paddock component to manage the paddock
 */
@Component({
  selector: 'app-paddock',
  templateUrl: './paddock.component.html',
  styleUrls: ['./paddock.component.css'],
})
export class PaddockComponent implements OnInit {
  // input paddock from parent
  @Input() paddock: Paddock;

  // input isFarmSubmitted from parent
  @Input() isFarmSubmitted: boolean;

  // Event when paddock is deleted
  @Output() paddockDeleted: EventEmitter<Paddock> = new EventEmitter<Paddock>();

  constructor() {}

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
   * Event handler when user choses to remove the paddock.
   */
  removePaddock() {
    // send paddock and index to parent
    this.paddockDeleted.emit(this.paddock);
  }
}
