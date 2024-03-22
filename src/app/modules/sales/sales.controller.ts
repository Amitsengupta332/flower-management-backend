import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SalesService } from './sales.service';

const createSales = catchAsync(async (req, res) => {
  const salesData = req.body;
  console.log({ salesData });
  // const zodValidatedSalesData = SalesSchema.parse(salesData);
  const result = await SalesService.createSalesIntoDB(salesData);
  // const result = await productService.createProductIntoDB(zodValidatedUserData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales Created successfully!',
    data: result,
  });
});

const getAllSales = catchAsync(async (req, res) => {
  const result = await SalesService.getAllSalesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales fetched successfully!',
    data: result,
  });
});

export const SalesController = {
  createSales,
  getAllSales,
};
