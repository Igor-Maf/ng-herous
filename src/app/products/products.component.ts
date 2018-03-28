import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

export interface Product {
  name: string,
  country: string
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  private productsCollection: AngularFirestoreCollection<Product>;

  products: Observable<Product[]>;
  productForm: FormGroup = null;

  constructor(
    private ngFirestore: AngularFirestore,
    private formBuilder: FormBuilder
  ) {
    this.productsCollection = ngFirestore.collection<Product>('products');
    this.products = this.productsCollection.valueChanges();

    this.productForm = formBuilder.group({
      name: ['', [
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.required
      ]],
      country: ['', [
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.required
      ]]
    });
  }

  ngOnInit() {}

  submitForm(e: Event): void {
    console.log(e);
    console.log(this.productForm);

    if (this.productForm.invalid)
      return;

    this.productsCollection.add(this.productForm.value)
      .catch(e => console.log(e));
  }
}
