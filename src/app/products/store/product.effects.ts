import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  EMPTY,
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  of,
  tap,
} from 'rxjs';
import { ProductService } from '../services/product.service';
import {
  addProduct,
  addProductFailure,
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
  addProductSuccess,
  loadProduct,
  loadProductSuccess,
  loadProductFailure,
  updateProduct,
  deleteProduct,
  deleteProductSuccess,
  deleteProductFailure,
} from './product.actions';
import { Router } from '@angular/router';

@Injectable()
export class ProductEffects {
  // Add new product
  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProduct),
      exhaustMap((action) =>
        this.productService.createProduct(action.product).pipe(
          map((product) => addProductSuccess({ product })),
          catchError((error) => of(addProductFailure({ error })))
        )
      ),
      tap(() => {
        this.router.navigate(['/product/list']), console.log('success');
      })
    )
  );

  // Get all products
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      exhaustMap((action) =>
        this.productService.loadProducts().pipe(
          map((products) => loadProductsSuccess({ products })),
          catchError((error) => of(loadProductsFailure({ error })))
        )
      )
    )
  );

  // Get One products
  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProduct),
      exhaustMap((action) =>
        this.productService.getProduct(action.id).pipe(
          map((product) => loadProductSuccess({ selectedProduct: product })),
          catchError((error) => of(loadProductFailure({ error })))
        )
      )
    )
  );

  // Update one Product
  updateProduct$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateProduct),
        concatMap((action) =>
          this.productService.editProduct(
            action.product.id,
            action.product.changes
          )
        ),
        tap(() => this.router.navigate(['/product/list']))
      ),
    { dispatch: false }
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      mergeMap((action) =>
        this.productService.deleteProduct(action.id).pipe(
          map(() => deleteProductSuccess({ id: action.id })),
          catchError((error) => of(deleteProductFailure({ error })))
        )
      ),
      tap(() => this.router.navigate(['/product/list'])) // Not in Video 12
    )
  );
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private router: Router
  ) {}
}
