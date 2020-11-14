import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarketComponent } from './market/market.component';
import { NewProductComponent } from './new-product/new-product.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { ConfigComponent } from './config/config.component';

const routes: Routes = [
  {path:'market', component : MarketComponent},
  {path:'new-product', component : NewProductComponent},
  {path:'my-products', component : MyProductsComponent},
  {path:'config', component : ConfigComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
