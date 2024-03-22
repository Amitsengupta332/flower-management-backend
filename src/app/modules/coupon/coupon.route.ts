import express from 'express';

// import validateRequest from '../../middlewares/validateRequest';
// import { couponValidation } from './coupon.validation';
import { couponController } from './coupon.controller';
const router = express.Router();

router.post('/createCoupon', couponController.createCouponIntoDB);

export const couponRouter = router;
