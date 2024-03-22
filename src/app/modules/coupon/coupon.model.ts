import { Schema, model } from 'mongoose';
import { TCoupon } from './coupon.interface';

const CouponSchema = new Schema<TCoupon>(
  {
    code: {
      type: String,
      required: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const Coupon = model<TCoupon>('Coupon', CouponSchema);
