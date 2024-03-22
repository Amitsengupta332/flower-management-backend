import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { productRoute } from '../modules/products/product.route';
import { salesRoute } from '../modules/sales/sales.route';
import { couponRouter } from '../modules/coupon/coupon.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/',
    route: productRoute,
  },
  {
    path: '/sales',
    route: salesRoute,
  },
  {
    path: '/coupon',
    route: couponRouter,
  },
];

// router.use('/', CourseRoutes)  => Aboid this code repeatation and use loop
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
