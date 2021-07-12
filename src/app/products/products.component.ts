import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import * as uuid from 'uuid';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss', '../app.component.scss'],
})
export class ProductsComponent implements OnInit {
  images: Array<string> = new Array<string>();
  addProductForm!: FormGroup;
  products: any;
  constructor(public formBuilder: FormBuilder, private http: HttpClient) {
    this.http.get(environment.api + 'product').subscribe((res) => {
      console.log(res);

      this.products = res;
    });
  }

  ngOnInit(): void {
    this.addProductForm = this.formBuilder.group({
      category: ['', Validators.compose([Validators.required])],
      productNameArabic: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      productNameEnglish: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      productDescArabic: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(250)]),
      ],
      count: ['', Validators.compose([Validators.required])],
      productDescEnglish: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(250)]),
      ],
      price: ['', Validators.compose([Validators.required])],
      image: ['', Validators.compose([Validators.required])],
    });
  }

  uploadImage(event: any) {
    let exe = event.target.files[0].name.split('.').pop();
    let fileList = event.target.files;
    let formData = new FormData();
    formData.append('file', fileList[0], fileList[0].name);
    if (fileList.length > 0) {
      this.http
        .post(environment.api + '/images/upload?exe=' + exe, formData)
        .subscribe(
          (res: any) => {
            console.log(res);

            this.images.push(res);
            console.log(this.images);
          },
          (err) => {
            this.images.push(err.error.text);
            console.log(err);
          }
        );
    }
  }
  // addImage() {
  //   this.images.push('');
  //   console.log(this.images);
  // }
  addProduct() {
    if (this.addProductForm.valid)
      this.http.post(environment.api + 'product', {
        category: this.addProductForm.controls['category'].value,
        titleArabic: this.addProductForm.controls['productNameArabic'].value,
        titleEnglish: this.addProductForm.controls['productNameEnglish'].value,
        descArabic: this.addProductForm.controls['productDescArabic'].value,
        id: uuid.v4(),
        descEnglish: this.addProductForm.controls['productDescEnglish'].value,
        price: this.addProductForm.controls['price'].value,
        count: this.addProductForm.controls['count'].value,
        images: this.images,
      });
    else this.addProductForm.markAllAsTouched();
  }
  getImage(image: any) {
    return environment.images + image;
  }

  deleteImage(image: string) {
    this.images = this.images.filter((i) => i != image);
  }
}
