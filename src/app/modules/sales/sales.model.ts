import { Schema, model } from 'mongoose';
import { TSales } from './sales.interface';

const salesSchema = new Schema<TSales>(
  {
    // productId: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    buyerName: { type: String, required: true },
    salesDate: { type: String, required: true },
  },
  { timestamps: true },
);

export const Sales = model<TSales>('Sales', salesSchema);
