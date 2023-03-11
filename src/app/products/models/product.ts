export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  quantity: number;
}


export class IProduct {
  id!: number;
  name!: string;
  description!: string;
  price!: string;
  imageUrl!: string;
  quantity!: number;
}
