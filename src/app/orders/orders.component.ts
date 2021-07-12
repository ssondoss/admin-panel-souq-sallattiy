import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss', '../app.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: any;
  constructor(public formBuilder: FormBuilder, private http: HttpClient) {
    this.http.get(environment.api + 'order').subscribe((res) => {
      console.log(res);

      this.orders = res;
    });
  }
  ngOnInit(): void {}
}
