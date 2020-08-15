import { Paddock } from './paddock';
import { FarmTypeEnum } from './FarmTypeEnum';

export class Farm {
  constructor() {
    this.PaddockIds = [];
  }

  Id: number;
  Code: string;
  Name: string;
  HarvestedDateTime: Date;
  FarmType: FarmTypeEnum;
  PaddockIds: number[];
  MillerId: number;

  Paddocks: Paddock[];
  FarmTypeName: string;
}
