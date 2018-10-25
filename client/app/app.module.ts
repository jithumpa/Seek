import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { CustomerService } from './services/customer.service';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdsComponent } from './ads/ads.component';
import { CustomerComponent } from './customer/customer.component';
import { CheckoutComponent } from './checkout/checkout.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NotFoundComponent,
    AdsComponent,
    CustomerComponent,
    CheckoutComponent
  ],
  imports: [
    RoutingModule,
    SharedModule,
    FormsModule,
  ],
  providers: [
    CustomerService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule {
}
