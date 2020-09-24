import {Component, OnInit, ViewChild, Renderer2, AfterViewInit} from '@angular/core';
import {CrudService} from '../../services/crud.service';
import {Router} from '@angular/router';
import {Products} from '../../.model/products';
declare var $;

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, AfterViewInit {
  public products: Products [];
  @ViewChild('productsTable', {static: false}) Table;
  public dataTable: any;
  public dtOptions;
  public tableElement: any;
  constructor(
    private crudService: CrudService,
    private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.crudService.getProducts().subscribe(data => {
      this.products = data;
    }, err => {}, () => {
      setTimeout(() => {
        this.dataTable = $(this.Table.nativeElement);
        this.tableElement = this.dataTable.DataTable(this.dtOptions);
      }, 1000);
    });
  }

  ngAfterViewInit(): void {
  }

  getNavigation(link, id) {
    if (id === '') {
      this.router.navigate([link]);
    } else {
      this.router.navigate([link + '/' + id]);
    }
  }

  deleteProduct(pID) {
    this.crudService.deleteProduct(pID).subscribe(data => {
      this.loadProducts();
    });
  }
}
