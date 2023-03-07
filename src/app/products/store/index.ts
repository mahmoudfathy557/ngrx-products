import { loadProductsSuccess, loadProductsFailure } from './product.actions';
import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { Product } from '../models/product';

export const productStateFeatureKey = 'productState';

export interface ProductState {
products: Product[]
error:any
}

export const initialState: ProductState = {
  products: [],
  error: undefined,
};

export const reducers =  createReducer(
  initialState,
  on(loadProductsSuccess,(state,action)=>{
    return {
      products:action.products,
      error:undefined
    }
  }),
    on(loadProductsFailure,(state,action)=>{
    return {
      products:state.products,
      error:action.error
    }
  })
)

 
export const selectProductsFeature = createFeatureSelector<ProductState>(
  productStateFeatureKey
);

export const selectProducts = createSelector(
  selectProductsFeature,
  (state: ProductState) => state.products
);


export const metaReducers: MetaReducer<ProductState>[] = isDevMode() ? [] : [];
