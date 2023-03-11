import { selectedProduct } from './../../store/product.selectors';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { Store, select } from '@ngrx/store';
import { ProductState } from '../../store/product.reducer';
import { deleteProduct, loadProduct } from '../../store/product.actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product$!: Observable<Product | undefined>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductService,
    private store: Store<ProductState>
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(loadProduct({ id: productId }));
    this.product$! = this.store.pipe(select(selectedProduct));
  }

  deleteProduct(id: number) {
    this.store.dispatch(deleteProduct({id:String(id)}))
  }
}
