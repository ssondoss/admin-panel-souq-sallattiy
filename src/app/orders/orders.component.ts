import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss', '../app.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: any;
  realOrders: any;

  constructor(
    public formBuilder: FormBuilder,
    private http: HttpClient,
    router: Router
  ) {
    if (localStorage.getItem('adminIsLoggedIn') == null) {
      router.navigate(['/login']);
    }
    this.getAllOrders();
  }
  ngOnInit(): void {}
  changeStatus(order: any, event: any) {
    console.log(event);
    order.status = event;
    this.http.put(environment.api + 'order', order).subscribe(() => {
      this.getAllOrders();
    });
  }
  getAllOrders() {
    this.http.get(environment.api + 'order').subscribe((res) => {
      this.orders = res;
      this.realOrders = res;
    });
  }

  search(s: any, e: any) {
    this.orders = this.realOrders;
    this.orders = this.orders.filter(
      (item: any) => item.dateTime >= s && item.dateTime <= e
    );
  }
}
