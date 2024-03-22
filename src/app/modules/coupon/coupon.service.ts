import { TCoupon } from './coupon.interface';

import { Coupon } from './coupon.model';

const createCoupon = async (payload: TCoupon) => {
  const result = await Coupon.create(payload);
  return result;
};
export const couponService = {
  createCoupon,
};
