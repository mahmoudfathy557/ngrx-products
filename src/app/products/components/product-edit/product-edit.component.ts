import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { IProduct, Product } from "../../models/product";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductState } from "../../store/product.reducer";
import { Store, select } from "@ngrx/store";
import { loadProduct, updateProduct } from "../../store/product.actions";
import { Observable } from "rxjs";
import { selectedProduct } from "../../store/product.selectors";
import { Update } from "@ngrx/entity";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductService,
    private store: Store<ProductState>
  ) {}
  model: any = {};
 
  ngOnInit() {
 
    this.store.dispatch(
      loadProduct({ id: this.route.snapshot.paramMap.get('id')! })
    );
      this.store.pipe(select(selectedProduct)).subscribe(product=>{
        this.model = Object.assign(new IProduct(), product);
      });
  }

  onSubmit() {
    const updatedProduct: Update<Product> = {
      id:  this.model.id,
      changes:this.model
    }
    this.store.dispatch(updateProduct({ product: updatedProduct }));
  }
}
