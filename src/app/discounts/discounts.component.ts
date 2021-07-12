import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import * as uuid from 'uuid';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss', '../app.component.scss'],
})
export class DiscountsComponent implements OnInit {
  addDiscountForm!: FormGroup;
  discounts: any;
  constructor(public formBuilder: FormBuilder, private http: HttpClient) {
    this.http.get(environment.api + 'discount-code').subscribe((res) => {
      console.log(res);

      this.discounts = res;
    });
  }
  ngOnInit(): void {
    this.addDiscountForm = this.formBuilder.group({
      code: ['', Validators.compose([Validators.required])],
      percentage: [
        '',
        Validators.compose([
          Validators.required,
          Validators.max(100),
          Validators.min(0),
        ]),
      ],
    });
  }
  addDiscount() {
    if (this.addDiscountForm.valid)
      this.http
        .post(environment.api + 'discount-code', {
          id: uuid.v4(),
          code: this.addDiscountForm.controls['code'].value,
          percentage: this.addDiscountForm.controls['percentage'].value,
        })
        .subscribe((res) => {
          window.location.reload();
        });
    else this.addDiscountForm.markAllAsTouched();
  }
  deleteDiscountCode(id: any) {
    this.http
      .delete(environment.api + 'discount-code/' + id)
      .subscribe((res) => {
        window.location.reload();
      });
  }
}
