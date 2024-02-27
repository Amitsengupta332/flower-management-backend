import { Types } from 'mongoose';

export interface TSales {
  productId: Types.ObjectId;
  // productId: string;
  quantity: number;
  buyerName: string;
  salesDate: string;
}
