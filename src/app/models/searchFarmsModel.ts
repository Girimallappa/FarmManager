/**
 * Search farms model
 */
export class searchFarmsModel {
  millId?: number;

  farmname?: string;

  constructor() {
    this.farmname = null;
    this.millId = null;
  }

  /**
   * returns true if search is empty
   */
  isSearchModelNotEmpty(): boolean {
    return (
      (this.millId && this.millId > 0) ||
      (this.farmname && this.farmname.length > 0)
    );
  }
}
