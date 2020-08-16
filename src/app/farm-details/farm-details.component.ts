import { MillService } from './../services/mill.service';
import { PaddockService } from './../services/paddock.service';
import { Farm } from './../models/farm';
import { FarmService } from './../services/farm.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';

/**
 * Farm details component
 */
@Component({
  selector: 'app-farm-details',
  templateUrl: './farm-details.component.html',
  styleUrls: ['./farm-details.component.css'],
})
export class FarmDetailsComponent implements OnInit {
  farm: Farm;
  paddockNames: string[];
  millerName: string;
  totalArea: number;

  constructor(
    private _route: ActivatedRoute,
    private _farmsService: FarmService,
    private _paddocksService: PaddockService,
    private _millerService: MillService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    const farmId = this._route.snapshot.params['id'];
    this.farm = this._farmsService.getById(farmId);
    const paddocks = this._paddocksService.getByIds(this.farm.PaddockIds);
    this.paddockNames = _.map(paddocks, 'Name');
    const mill = this._millerService.getById(this.farm.MillerId);
    this.millerName = mill.Name;
    this.totalArea = _.sumBy(paddocks, (p) => +p.Area);
  }

  editFarm() {
    this._router.navigate(['/edit', this.farm.Id]);
  }
}
