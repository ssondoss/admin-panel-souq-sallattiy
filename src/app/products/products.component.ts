import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import * as uuid from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss', '../app.component.scss'],
})
export class ProductsComponent implements OnInit {
  images: Array<string> = new Array<string>();
  addProductForm!: FormGroup;
  products: any;
  category: number = 0;
  edit: boolean = false;
  id: any;
  constructor(
    public formBuilder: FormBuilder,
    private http: HttpClient,
    router: Router
  ) {
    if (localStorage.getItem('adminIsLoggedIn') == null) {
      router.navigate(['/login']);
    }
    this.getProducts();
  }

  getProducts() {
    this.http.get(environment.api + 'product').subscribe((res) => {
      console.log(res);

      this.products = res;
    });
  }

  ngOnInit(): void {
    this.clearInputs();
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
    console.log('add');
    if (this.addProductForm.valid)
      this.http
        .post(environment.api + 'product', {
          category: this.addProductForm.controls['category'].value,
          titleArabic: this.addProductForm.controls['productNameArabic'].value,
          titleEnglish: this.addProductForm.controls['productNameEnglish']
            .value,
          descArabic: this.addProductForm.controls['productDescArabic'].value,
          id: uuid.v4(),
          descEnglish: this.addProductForm.controls['productDescEnglish'].value,
          price: this.addProductForm.controls['price'].value,
          count: this.addProductForm.controls['count'].value,
          images: this.images,
          wardrobe: this.addProductForm.controls['wardrobe'].value,
        })
        .subscribe(() => {
          this.getProducts();
          this.clearInputs();
        });
    else {
      this.addProductForm.markAllAsTouched();
      console.log('invalids');
    }
  }
  getImage(image: any) {
    return environment.images + image;
  }

  deleteImage(image: string) {
    this.images = this.images.filter((i) => i != image);
  }

  editProduct(product: any) {
    this.addProductForm = this.formBuilder.group({
      category: [product.category, Validators.compose([Validators.required])],
      productNameArabic: [
        product.titleArabic,
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      productNameEnglish: [
        product.titleEnglish,
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      productDescArabic: [
        product.descArabic,
        Validators.compose([Validators.required, Validators.maxLength(250)]),
      ],
      count: [product.count, Validators.compose([Validators.required])],
      productDescEnglish: [
        product.descEnglish,
        Validators.compose([Validators.required, Validators.maxLength(250)]),
      ],
      price: [product.price, Validators.compose([Validators.required])],
      image: [product.images[0], Validators.compose([Validators.required])],
      wardrobe: [product.wardrobe, Validators.compose([Validators.required])],
    });
    this.images = product.images;
    this.category = product.category;
    console.log(this.category);
    this.edit = true;
    this.id = product.id;
  }

  updateProduct() {
    if (this.addProductForm.valid)
      this.http
        .post(environment.api + 'product', {
          category: this.addProductForm.controls['category'].value,
          titleArabic: this.addProductForm.controls['productNameArabic'].value,
          titleEnglish: this.addProductForm.controls['productNameEnglish']
            .value,
          descArabic: this.addProductForm.controls['productDescArabic'].value,
          id: this.id,
          descEnglish: this.addProductForm.controls['productDescEnglish'].value,
          price: this.addProductForm.controls['price'].value,
          count: this.addProductForm.controls['count'].value,
          images: this.images,
          wardrobe: this.addProductForm.controls['wardrobe'].value,
        })
        .subscribe(() => {
          this.getProducts();
          this.clearInputs();
        });
    else {
      this.addProductForm.markAllAsTouched();
      console.log('invalids');
    }
  }

  clearInputs() {
    this.images = new Array();
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
      wardrobe: ['', Validators.compose([Validators.required])],
      image: ['', Validators.compose([Validators.required])],
    });
    this.edit = false;
  }

  deleteProduct(id: string) {
    this.http.delete(environment.api + 'product/' + id).subscribe(() => {
      this.getProducts();
    });
  }
}
