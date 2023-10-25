import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/modules/login/login.component';
import { AdminComponent } from './core/modules/admin/admin.component';
import { ConsumerComponent } from './core/modules/consumer/consumer.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsListComponent } from './core/modules/products-list/products-list.component';
import { ProductDetailsComponent } from './core/modules/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    ConsumerComponent,
    ProductsListComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
