import { FarmService } from './../services/farm.service';
import { MillService } from './../services/mill.service';
import { searchFarmsModel } from './../models/searchFarmsModel';
import { Component, OnInit } from '@angular/core';
import { Mill } from '../models/mill';
import * as _ from 'lodash';
import { Farm } from '../models/farm';
import { Router } from '@angular/router';

@Component({
  selector: 'app-farms-list',
  templateUrl: './farms-list.component.html',
  styleUrls: ['./farms-list.component.css'],
})
export class FarmsListComponent implements OnInit {
  searchFarmsModel: searchFarmsModel;
  mills: Mill[];
  /*show search results flag*/
  showSearchResults: boolean;
  visibleFarms: Farm[];

  config: any;

  constructor(
    private _millsService: MillService,
    private _farmService: FarmService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.searchFarmsModel = new searchFarmsModel();
    this.mills = this._millsService.getAll();
    this.visibleFarms = this._farmService.getAll();
    this.showSearchResults = true;
    this.configurePaging();
  }

  searchFarms(searchFarmsModel: searchFarmsModel) {
    // hide the search results
    this.showSearchResults = false;
    const farms = this._farmService.getAll();
    this.visibleFarms = _.filter(
      farms,
      (f: Farm) =>
        (!searchFarmsModel.farmname ||
          f.Name.toLowerCase().indexOf(
            searchFarmsModel.farmname.toLowerCase()
          ) >= 0) &&
        (searchFarmsModel.millId === null ||
          f.MillerId === searchFarmsModel.millId)
    );

    if (this.visibleFarms.length > 0) {
      this.showSearchResults = true;
      this.configurePaging();
    }
  }

  private configurePaging() {
    this.config = {
      itemsPerPage: 20,
      currentPage: 1,
      totalItems: this.visibleFarms.length,
    };
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  createFarm() {
    this._router.navigate(['/edit', -1]);
  }
}
