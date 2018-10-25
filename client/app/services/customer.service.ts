import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Customer } from '../shared/models/customer.model';

@Injectable()
export class CustomerService {

  constructor(private http: HttpClient) {
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>('/api/customers');
  }

  getCustomer(id): Observable<Customer> {
    return this.http.get<Customer>(`/api/customers/${id}`);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>('/api/customers', customer);
  }

  deleteCustomer(customer: Customer): Observable<any> {
    return this.http.delete(`/api/customers/${customer._id}`, { responseType: 'text' });
  }

  checkout(data: any): Observable<any> {
    return this.http.post(`/api/customers/checkout`, data);
  }

}
