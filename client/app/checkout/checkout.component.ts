import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Customer } from '../shared/models/customer.model';
import { CustomerService } from '../services/customer.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  isLoading = true;
  customers: Customer[] = [];
  constructor(private customerService: CustomerService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent) { }

  checkOutForm: FormGroup;

  selectedCustId: string;
  selectedCust: Customer;
  total: Number = 0;

  ngOnInit() {
    this.getCustomers();
  }
  getCustomers() {
    this.customerService.getCustomers().subscribe(
      data => this.customers = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  getCustomer(id) {
    this.customerService.getCustomer(id).subscribe(
      data => this.selectedCust = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  changeCust(cust): void {
    this.total = 0;
    this.selectedCustId = cust;
    this.getCustomer(cust);
    this.checkOutForm = this.formBuilder.group({
      id: cust,
      Premium: 0,
      Standout: 0,
      Classic: 0
    });
  }

  getRuleAsString(rule) {
    if (rule.type === 'PRICE_DROP') {
      return rule.min && rule.min > 0 ?
        `Get discount on ${rule.adType} ads when ${rule.min || 0} or more purchased . Price drops to ${rule.price || 0}` :
        `Get discount on ${rule.adType} ads. Price drops to ${rule.price}`;
    } else {
      return `Gets a ${rule.min} for ${rule.for} deal on ${rule.adType} ads`;
    }
  }

  checkOut() {

    this.customerService.checkout(this.checkOutForm.value).subscribe(
      res => {
        this.total = res.total;
        // this.addCustomerForm.reset();
        this.checkOutForm = this.formBuilder.group({
          id: this.selectedCustId,
          Premium: 0,
          Standout: 0,
          Classic: 0
        });
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }
}
