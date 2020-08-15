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
    this._seedDataService.seedDataIfRequired();
  }
}
