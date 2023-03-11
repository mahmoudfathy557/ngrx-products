import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Product } from '../models/product';

 
// Get All Products
export const loadProducts = createAction(
  '[Product  List Component] Get Products'
);

export const loadProductsSuccess = createAction(
  '[Product List  Effect] Get Products Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Product List  Effect] Get Product Failure',
  props<{ error: any }>()
);

// Add Product
export const addProduct = createAction(
  '[Product Add Component] Add Product',
  props<{ product: Product }>()
);

export const addProductSuccess = createAction(
  '[Product Add Effect] Add Product Success',
  props<{ product: Product }>()
);

export const addProductFailure = createAction(
  '[Product  Add Effect] Add Products',
  props<{ error: any }>()
);

// Get One Product
export const loadProduct = createAction(
  '[Product Component] load Product',
  props<{ id: string }>()
);

export const loadProductSuccess = createAction(
  '[Product Effect] Get Product Success',
  props<{ selectedProduct: Product }>()
);

export const loadProductFailure = createAction(
  '[Product Effect] Get Product Failure',
  props<{ error: any }>()
);

// Update One Product
export const updateProduct = createAction(
  '[Product Edit Component] load Product',
  props<{ product: Update<Product> }>()
);

  
// Delete One Product
export const deleteProduct = createAction(
  '[Product Component / Product List] Delete Product',
  props<{ id: string }>()
);

export const deleteProductSuccess = createAction(
  '[Product Delete Effect] Delete Product Success',
  props<{ id: string }>()
);

export const deleteProductFailure = createAction(
  '[Product Delete Effect] Delete Product Failure',
  props<{ error: any }>()
);

export const deleteProducts = createAction(
  '[Product/API] Delete Products',
  props<{ ids: string[] }>()
);

 