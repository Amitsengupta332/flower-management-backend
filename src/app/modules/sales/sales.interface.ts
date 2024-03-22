import { Types } from 'mongoose';

export interface TSales {
  productId: Types.ObjectId;
  totalPrice: number;
  price: number;
  quantity: number;
  disCountPrice: number;
  buyerName: string;
  salesDate: string;
  finalPrice: number;
}
