import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrPage } from './registr.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrPageRoutingModule {}
