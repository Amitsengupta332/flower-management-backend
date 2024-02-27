import { productService } from './product.service';
import ProductSchema from './product.validation';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createProduct = catchAsync(async (req, res) => {
  const productData = req.body;
  const zodValidatedUserData = ProductSchema.parse(productData);
  const result = await productService.createProductIntoDB(zodValidatedUserData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product fetched successfully!',
    data: result,
  });
});

const getAllProduct = catchAsync(async (req, res) => {
  const result = await productService.getAllProductFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product fetched successfully!',
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await productService.getSingleProductFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Flower retrieved successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await productService.updateProductInDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Flower updated successfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await productService.deleteProductFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Flower deleted successfully',
    data: result,
  });
});

// const updateSingleProduct = async (req: Request, res: Response) => {
//   try {
//     const updatedProductData = req.body;
//     // const zodValidatedUserData = ProductSchema.parse(updatedProductData);
//     const result = await productService.updateProductIntoDB(updatedProductData);

//     res.status(200).json({
//       success: true,
//       message: 'User updated successfully!',
//       data: result,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// const updateSingleProduct = catchAsync(async (req, res) => {
//   const updatedProductData = req.body;
//   const result = await productService.updateProductIntoDB(updatedProductData);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Product updated successfully',
//     data: result,
//   });
// });

export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  // updateSingleProduct,
};
