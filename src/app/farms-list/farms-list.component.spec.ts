import { searchFarmsModel } from './../models/searchFarmsModel';
import { FarmsListComponent } from './farms-list.component';
import { FarmService } from '../services/farm.service';
import { Farm } from '../models/farm';
import { FarmTypeEnum } from '../models/FarmTypeEnum';

/**
 * Test suite for Farm details component
 */
describe('FarmsListComponent', () => {
  let farmListComponent: FarmsListComponent;
  let farmService: FarmService;
  let farms: Farm[];

  /**
   * Set up
   */
  beforeEach(() => {
    farmService = new FarmService(null);
    farmListComponent = new FarmsListComponent(null, farmService, null);

    farms = [
      {
        Id: 1,
        Code: 'Farm1',
        FarmType: FarmTypeEnum.Cane,
        HarvestedDateTime: new Date(),
        MillerId: 1,
        Name: 'Farm1',
        PaddockIds: [1, 2, 3, 4],
        Paddocks: null,
        FarmTypeName: 'Cane',
      },
      {
        Id: 2,
        Code: 'Farm10',
        FarmType: FarmTypeEnum.Rice,
        HarvestedDateTime: new Date(),
        MillerId: 1,
        Name: 'Farm10',
        PaddockIds: [1, 2, 3, 4],
        Paddocks: null,
        FarmTypeName: 'Rice',
      },
      {
        Id: 3,
        Code: 'Farm20',
        FarmType: FarmTypeEnum.Other,
        HarvestedDateTime: new Date(),
        MillerId: 1,
        Name: 'Farm20',
        PaddockIds: [1, 2, 3, 4],
        Paddocks: null,
        FarmTypeName: 'Cane',
      },
    ];
  });

  /**
   * test spec for search farms returning results
   */
  it('Search returns results', () => {
    spyOn(farmService, 'getAll').and.callFake(() => {
      return farms;
    });
    const searchModel = new searchFarmsModel();
    searchModel.farmname = 'farm1';

    farmListComponent.searchFarms(searchModel);

    expect(farmListComponent.visibleFarms.length).toBe(2);
    expect(farmListComponent.showSearchResults).toBeTrue();
    expect(farmListComponent.config).toBeDefined();
  });

  /**
   * test spec for search farms not returning results
   */
  it('Search does not returns results', () => {
    spyOn(farmService, 'getAll').and.callFake(() => {
      return farms;
    });
    const searchModel = new searchFarmsModel();
    searchModel.farmname = 'farm3';

    farmListComponent.searchFarms(searchModel);

    expect(farmListComponent.visibleFarms.length).toBe(0);
    expect(farmListComponent.showSearchResults).toBeFalse();
    expect(farmListComponent.config).toBeUndefined();
  });
});
