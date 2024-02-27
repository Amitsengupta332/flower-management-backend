import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();
//create product
router.post('/create-flower', ProductController.createProduct);
router.get('/all-flowers', ProductController.getAllProduct);
router.get('/single-flower/:id', ProductController.getSingleProduct);

router.delete('/delete-flower/:id', ProductController.deleteProduct);

router.patch('/update-flower/:id', ProductController.updateProduct);

export const productRoute = router;
