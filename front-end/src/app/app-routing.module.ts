import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarketComponent } from './market/market.component';
import { NewProductComponent } from './new-product/new-product.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { ConfigComponent } from './config/config.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard'

const routes: Routes = [
  {path: '/', component: AuthComponent},
  {path: '/home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      {path:'market', component : MarketComponent},
      {path:'new-product', component : NewProductComponent},
      {path:'my-products', component : MyProductsComponent},
      {path:'config', component : ConfigComponent}
    ]
  },
  { path: 'auth', component: AuthComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
