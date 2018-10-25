import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Cat } from '../shared/models/cat.model';
import { Customer } from '../shared/models/customer.model';
import { ToastComponent } from '../shared/toast/toast.component';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  val = false;
  selectedType = 'PRICE_DROP';
  userList = [];

  addCustomerForm: FormGroup;
  name = new FormControl('', Validators.required);

  rules: FormArray;


  constructor(private customerService: CustomerService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent) {
  }

  isLoading = true;
  customers: Customer[] = [];

  ngOnInit() {
    this.getCustomers();
    this.addCustomerForm = this.formBuilder.group({
      name: '',
      rules: this.formBuilder.array([])
    });
  }
  createRule(): FormGroup {
    return this.formBuilder.group({
      type: 'PRICE_DROP',
      adType: 'Classic',
      price: 0,
      min: 0,
      for: 0
    });
  }
  addRules(): void {
    this.rules = this.addCustomerForm.get('rules') as FormArray;
    this.rules.push(this.createRule());
  }
  selectChangeHandler(event: any) {
    console.log('selectionChanged');
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(
      data => this.customers = data,
      error => console.log(error),
      () => this.isLoading = false
    );
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

  onClickSubmit() {

    this.customerService.addCustomer(this.addCustomerForm.value).subscribe(
      res => {
        this.customers.push(res);
        // this.addCustomerForm.reset();
        this.addCustomerForm = this.formBuilder.group({
          name: '',
          rules: this.formBuilder.array([])
        });
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }
  deleteCustomer(cust) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.customerService.deleteCustomer(cust).subscribe(
        () => {
          const pos = this.customers.map(elem => elem._id).indexOf(cust._id);
          this.customers.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }
}
