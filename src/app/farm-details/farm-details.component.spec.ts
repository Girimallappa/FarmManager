import { Mill } from './../models/mill';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { FarmDetailsComponent } from './farm-details.component';
import { FarmService } from '../services/farm.service';
import { PaddockService } from '../services/paddock.service';
import { MillService } from '../services/mill.service';
import { Farm } from '../models/farm';
import { FarmTypeEnum } from '../models/FarmTypeEnum';
import { Paddock } from '../models/paddock';

/**
 * test suite for farm details component
 */
describe('FarmDetailsComponent', () => {
  let farmComponent: FarmDetailsComponent;
  let farmService: FarmService;
  let paddocksService: PaddockService;
  let millerService: MillService;
  let route: ActivatedRoute;

  /**
   * Set up
   */
  beforeEach(() => {
    paddocksService = new PaddockService();
    farmService = new FarmService(paddocksService);
    millerService = new MillService();
    route = new ActivatedRoute();

    farmComponent = new FarmDetailsComponent(
      route,
      farmService,
      paddocksService,
      millerService,
      null
    );
  });

  /**
   * test for initialization and area calculation
   */
  it('Initialization and total area works correctly', () => {
    const farm = new Farm();
    farm.Id = 1;
    farm.Code = 'Farm1';
    farm.FarmType = FarmTypeEnum.Cane;
    farm.HarvestedDateTime = new Date();
    farm.MillerId = 1;
    farm.Name = 'Farm1';
    farm.PaddockIds = [1, 2, 3, 4];

    const mill = new Mill();
    mill.Id = 1;
    mill.Name = 'Miller1';
    mill.FarmIds = [1];
    mill.Address = 'Gold Coast Australia';

    const paddocks: Paddock[] = [
      {
        Id: 1,
        Name: 'p1',
        Code: 'p1',
        Area: 10,
        OwnerFarmId: 1,
        Index: 0,
        isOpen: false,
      },
      {
        Id: 2,
        Name: 'p2',
        Code: 'p2',
        Area: 10,
        OwnerFarmId: 1,
        Index: 1,
        isOpen: false,
      },
      {
        Id: 3,
        Name: 'p3',
        Code: 'p3',
        Area: 10,
        OwnerFarmId: 1,
        Index: 2,
        isOpen: false,
      },
      {
        Id: 4,
        Name: 'p4',
        Code: 'p4',
        Area: 10,
        OwnerFarmId: 1,
        Index: 3,
        isOpen: false,
      },
    ];

    spyOn(farmService, 'getById').and.callFake((id: number) => {
      return farm;
    });

    spyOn(millerService, 'getById').and.callFake((id: number) => {
      return mill;
    });

    spyOn(paddocksService, 'getByIds').and.callFake((ids: number[]) => {
      return paddocks;
    });

    route.snapshot = new ActivatedRouteSnapshot();
    route.snapshot.params = { id: '1' };
    farmComponent.ngOnInit();

    expect(farmComponent.farm).toEqual(farm);
    expect(farmComponent.paddockNames).toEqual(['p1', 'p2', 'p3', 'p4']);
    expect(farmComponent.millerName).toBe(mill.Name);
    expect(farmComponent.totalArea).toBe(40);
  });
});
