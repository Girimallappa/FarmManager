/**
 * Paddock model
 */
export class Paddock {
  Id: number;
  Name: string;
  Code: string;
  Area: number;
  OwnerFarmId: number;

  // used only on client side.
  Index: number;
  isOpen: boolean;
}
