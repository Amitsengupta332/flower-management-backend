import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { couponService } from './coupon.service';

const createCouponIntoDB = catchAsync(async (req, res) => {
  const couponData = req.body;
  const result = await couponService.createCoupon(couponData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Coupon successfully created',
    data: result,
  });
});

export const couponController = {
  createCouponIntoDB,
};
