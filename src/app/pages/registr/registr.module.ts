import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrPageRoutingModule } from './registr-routing.module';

import { RegistrPage } from './registr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrPageRoutingModule
  ],
  declarations: [RegistrPage]
})
export class RegistrPageModule {}
