import { EditFarmComponent } from './edit-farm.component';
import { Farm } from '../models/farm';
import { FarmTypeEnum } from '../models/FarmTypeEnum';
import { Mill } from '../models/mill';
import { Paddock } from '../models/paddock';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { FarmService } from '../services/farm.service';
import { PaddockService } from '../services/paddock.service';
import { MillService } from '../services/mill.service';

/**
 * Test suite for edit farm component
 */
describe('EditFarmComponent', () => {
  let editFarmComponent: EditFarmComponent;
  let farmService: FarmService;
  let paddocksService: PaddockService;
  let millerService: MillService;
  let route: ActivatedRoute;
  let farm: Farm;
  let mill: Mill;
  let paddocks: Paddock[];

  /**
   * Set up
   */
  beforeEach(() => {
    paddocksService = new PaddockService();
    farmService = new FarmService(paddocksService);
    millerService = new MillService();
    route = new ActivatedRoute();

    editFarmComponent = new EditFarmComponent(
      route,
      null,
      farmService,
      paddocksService,
      millerService,
      null
    );

    farm = new Farm();
    farm.Id = 1;
    farm.Code = 'Farm1';
    farm.FarmType = FarmTypeEnum.Cane;
    farm.HarvestedDateTime = new Date();
    farm.MillerId = 1;
    farm.Name = 'Farm1';
    farm.PaddockIds = [1, 2, 3, 4];

    mill = new Mill();
    mill.Id = 1;
    mill.Name = 'Miller1';
    mill.FarmIds = [1];
    mill.Address = 'Gold Coast Australia';

    paddocks = [
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
  });

  /**
   * test spec for create farm init
   */
  it('Initialize for create farm', () => {
    spyOn(millerService, 'getAll').and.callFake(() => {
      return [mill];
    });

    route.snapshot = new ActivatedRouteSnapshot();
    route.snapshot.params = { id: '-1' };

    editFarmComponent.ngOnInit();

    expect(editFarmComponent.title).toEqual('Create Farm');
    expect(editFarmComponent.farm).toBeDefined();
    expect(editFarmComponent.mills).toEqual([mill]);
    expect(editFarmComponent.isFarmSubmitted).toBeFalse();
    expect(editFarmComponent.farmTypes).toBeDefined();
  });

  /**
   * test spec for edit farm init
   */
  it('Initialize for edit farm', () => {
    spyOn(farmService, 'getById').and.callFake((id: number) => {
      return farm;
    });

    spyOn(millerService, 'getAll').and.callFake(() => {
      return [mill];
    });

    spyOn(paddocksService, 'getByIds').and.callFake((ids: number[]) => {
      return paddocks;
    });

    route.snapshot = new ActivatedRouteSnapshot();
    route.snapshot.params = { id: '1' };

    editFarmComponent.ngOnInit();

    expect(editFarmComponent.title).toEqual('Edit Farm');
    expect(editFarmComponent.farm).toBeDefined();
    expect(editFarmComponent.mills).toEqual([mill]);
    expect(editFarmComponent.isFarmSubmitted).toBeFalse();
    expect(editFarmComponent.farmTypes).toBeDefined();
  });
});
