import { EditFarmComponent } from './edit-farm/edit-farm.component';
import { FarmDetailsComponent } from './farm-details/farm-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FarmsListComponent } from './farms-list/farms-list.component';

const routes: Routes = [
  { path: 'home', component: FarmsListComponent },
  { path: 'details/:id', component: FarmDetailsComponent },
  { path: 'edit/:id', component: EditFarmComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
