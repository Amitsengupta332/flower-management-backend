/* eslint-disable no-unused-vars */
// import { Model, Types } from 'mongoose';

export type TSelectCategory =
  | 'Roses'
  | 'Lilies'
  | 'Sunflowers'
  | 'Tulips'
  | 'Orchids';

export type TProduct = {
  productName: string;
  productQuantity: string;
  price: string;
  bloomDate: string;
  color: string;
  selectCategory: TSelectCategory;
  size: 's' | 'm' | 'l';
  fragrance: 'Rose' | 'Lily' | 'Jasmine' | 'Lavender' | 'Citrus';
};

// export interface productModel extends Model<TProduct> {
//   isFlowerExists(productId: string | Types.ObjectId): Promise<TProduct>;
// }
