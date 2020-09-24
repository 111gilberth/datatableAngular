import { Component, OnInit } from '@angular/core';
import {Products} from '../../.model/products';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService} from '../../services/crud.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  productForm: FormGroup;
  productID: any;
  productData: Products;
  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private router: Router,
    private actRoute: ActivatedRoute) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      desc: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1000)])],
      price: ['', Validators.compose([Validators.required])],
    });
// code
  }

  ngOnInit() {
    this.productID = this.actRoute.snapshot.params.id;
    this.loadProductDetails(this.productID);
  }

  loadProductDetails(productID) {
    this.crudService.getProductDetails(productID).subscribe(product => {
      this.productData = product;
      this.productForm.controls.name.setValue(this.productData.p_name);
      this.productForm.controls.desc.setValue(this.productData.p_description);
      this.productForm.controls.price.setValue(this.productData.p_price);
    });
  }

  updateProductData(values) {
    const productData = new FormData();
    productData.append('id', this.productID);
    productData.append('name', values.name);
    productData.append('description', values.desc);
    productData.append('price', values.price);
    this.crudService.updateProduct(productData).subscribe(result => {
      this.router.navigate(['']);
    });
  }}
