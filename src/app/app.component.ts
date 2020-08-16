import { SeedDataService } from './services/seed-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'FarmManager';

  constructor(private _seedDataService: SeedDataService) {}

  ngOnInit(): void {
    // This is for seeding the application data, not needed when integrated with REST Api.
    this._seedDataService.seedDataIfRequired();
  }
}
