import { loadProductsSuccess, loadProductsFailure } from './product.actions';
import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from '@ngrx/store';
import { Product } from '../models/product';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

export const productStateFeatureKey = 'productState';

export interface ProductState extends EntityState<Product> {
  error: any;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState = adapter.getInitialState({
  error: undefined,
});
export const reducers = createReducer(
  initialState,
  on(loadProductsSuccess, (state, action) => {
    return adapter.addMany(action.products, state);
  }),

  on(loadProductsFailure, (state, action) => {
    return   action.error 
  })
);

export const selectProductsFeature = createFeatureSelector<ProductState>(
  productStateFeatureKey
);

export const selectProducts = createSelector(
  selectProductsFeature,
  adapter.getSelectors().selectAll
);

export const selectError = createSelector(
  selectProductsFeature,
  (state: ProductState) => state.error
)

export const metaReducers: MetaReducer<ProductState>[] = isDevMode() ? [] : [];
