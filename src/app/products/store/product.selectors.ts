import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState, adapter, productsFeatureKey, selectAll,  } from './product.reducer';


 

// All Products
export const selectProductsFeature =
  createFeatureSelector<ProductState>(productsFeatureKey);

export const selectProducts = createSelector(
  selectProductsFeature,
  selectAll
);


export const selectedProduct = createSelector(selectProductsFeature, (state:ProductState)=>state.selectedProduct);


export const selectError = createSelector(
  selectProductsFeature,
  (state: ProductState) => state.error 
);

 