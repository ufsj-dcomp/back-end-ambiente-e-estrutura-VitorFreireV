import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule} from '@angular/material/table';
import { MarketComponent, MngProductDialog } from './market/market.component';
import { ConfigComponent } from './config/config.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { NewProductComponent } from './new-product/new-product.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { Globals } from './globals/globals';

@NgModule({
  declarations: [
    AppComponent,
    MarketComponent,
    ConfigComponent,
    MyProductsComponent,
    NewProductComponent,
    MngProductDialog,
    AuthComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NoopAnimationsModule,
    BrowserAnimationsModule
  ],
  entryComponents:[
    MngProductDialog
  ],
  providers: [AuthGuard, Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }