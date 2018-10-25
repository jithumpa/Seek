import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdsComponent } from './ads/ads.component';
import { CustomerComponent } from './customer/customer.component';
import { CheckoutComponent } from './checkout/checkout.component';

import { from } from 'rxjs';

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'ads', component: AdsComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule {
}
