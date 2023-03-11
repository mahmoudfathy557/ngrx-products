import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ProductState } from '../../store/product.reducer';
import { deleteProduct, loadProducts } from '../../store/product.actions';
import { selectProducts } from '../../store/product.selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  products$!: Observable<Product[]>;
  constructor(
    private productService: ProductService,
    public router: Router,
    private store: Store<ProductState>
  ) {}

  ngOnInit() {
    this.store.dispatch(loadProducts());
    this.loadProducts();
  }

  loadProducts() {
    this.products$ = this.store.pipe(select(selectProducts));
  }

  deleteProduct(id: number) {
    this.store.dispatch(deleteProduct({id:String(id)}))
 
  }
}
