import express from 'express';
import { SalesController } from './sales.controller';

const router = express.Router();
//create product
router.post('/create-sales', SalesController.createSales);
router.get('/sales-history', SalesController.getAllSales);
// router.patch('/:id', ProductController.updateSingleProduct);

export const salesRoute = router;
