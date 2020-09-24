import { Component, OnInit } from '@angular/core';
import {CrudService} from '../../services/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Products} from '../../.model/products';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {
  productID: any; // Getting Product id from URL
  productData: Products; // Getting Product details
  constructor(private crudService: CrudService,
              private router: Router,
              private actRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this. productID = this.actRoute.snapshot.params.id;
    this.loadProductDetails(this.productID);
  }

  loadProductDetails(productID){
    this.crudService.getProductDetails(productID).subscribe(product => {
      this.productData = product;
    });
  }

  navigation(link){
    this.router.navigate([link]);
  }
}
