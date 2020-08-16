import { Paddock } from './paddock';
import { FarmTypeEnum } from './FarmTypeEnum';

/**
 * Farm model
 */
export class Farm {
  constructor() {
    this.PaddockIds = [];
    this.FarmType = -1;
    this.MillerId = -1;
  }

  Id: number;
  Code: string;
  Name: string;
  HarvestedDateTime: Date;
  FarmType: FarmTypeEnum;
  PaddockIds: number[];
  MillerId: number;

  // used only on client side
  Paddocks: Paddock[];
  FarmTypeName: string;
}
