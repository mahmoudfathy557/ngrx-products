import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ProductActions from './product.actions';
import { Product } from '../models/product';

export const productsFeatureKey = 'products';
export const productFeatureKey = 'product';

export interface ProductState extends EntityState<Product> {
  // additional entities state properties
  error: any;
  selectedProduct?: Product;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState: ProductState = adapter.getInitialState({
  // additional entity state properties
  error: undefined,
  selectedProduct: undefined,
});

export const reducer = createReducer(
  initialState,

  // Add Product
  on(ProductActions.addProductSuccess, (state, action) =>
    adapter.addOne(action.product, state)
  ),
  on(ProductActions.addProductFailure, (state, action) => {
    return { ...state, error: action.error };
  }),

  // Get All Products
  on(ProductActions.loadProductsSuccess, (state, action) =>
    adapter.addMany(action.products, state)
  ),
  on(ProductActions.loadProductsFailure, (state, action) => {
    return { ...state, error: action.error };
  }),

  // Get One Product
  on(ProductActions.loadProductSuccess, (state, action) => {
    return { ...state, selectedProduct: action.selectedProduct };
  }),
  on(ProductActions.loadProductFailure, (state, action) => {
    return { ...state, error: action.error };
  }),

  // Update One Product
  on(ProductActions.updateProduct, (state, action) =>
    adapter.updateOne(action.product, state)
  ),

  // Delete One Product
  on(ProductActions.deleteProductSuccess, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(ProductActions.deleteProductFailure, (state, action) => {
    return { ...state, error: action.error };
  })
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
