import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';
import {
  productCategoryType,
  productFragrance,
  productSize,
} from './product.constant';

const productSchema = new Schema<TProduct>(
  {
    productName: { type: String, required: true },
    productQuantity: { type: String, required: true },
    price: { type: String, required: true },
    bloomDate: { type: String },
    color: { type: String, required: true },
    selectCategory: {
      type: String,
      enum: productCategoryType,
    },
    size: { type: String, enum: productSize },
    fragrance: {
      type: String,
      enum: productFragrance,
    },
  },
  { timestamps: true },
);

// ProductSchema.statics.isFlowerExists = async function (
//   productId: string | Schema.Types.ObjectId,
// ) {
//   return await Product.findById(productId);
// };

export const Product = model<TProduct>('Product', productSchema);

// export const productModel = model<TProduct>('product', ProductSchema);
