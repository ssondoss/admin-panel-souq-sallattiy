import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
})
export class ViewOrderComponent implements OnInit {
  order: any;
  constructor(
    private activatedRouter: ActivatedRoute,
    private http: HttpClient
  ) {
    activatedRouter.queryParams.subscribe((params) => {
      this.http
        .get(environment.api + 'order/' + params['id'])
        .subscribe((res) => {
          this.order = res;
        });
    });
  }

  getTotalAmount() {
    let total = 0;
    for (const item of this.order.products) {
      total += item.product.price * item.qty;
    }
    return total;
  }

  ngOnInit(): void {}
}
