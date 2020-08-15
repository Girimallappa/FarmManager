export class Paddock {
  Id: number;
  Name: string;
  Code: string;
  Area: number;
  OwnerFarmId: number;

  Index: number; // only on client side.
  isOpen: boolean;
}
