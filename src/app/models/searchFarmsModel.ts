export class searchFarmsModel {
  millId?: number;

  farmname?: string;

  constructor() {
    this.farmname = null;
    this.millId = null;
  }

  isSearchModelNotEmpty() {
    return (
      (this.millId && this.millId > 0) ||
      (this.farmname && this.farmname.length > 0)
    );
  }
}
