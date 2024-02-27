import { Product } from '../products/product.model';
import { TSales } from './sales.interface';
import { Sales } from './sales.model';

const createSalesIntoDB = async (salesData: TSales) => {
  const flower = await Product.findById(salesData.productId);
  if (!flower) throw new Error('Product not found');
  if (Number(flower.productQuantity) < salesData.quantity) {
    throw new Error('Not enough product in stock');
  }
  const result = await Sales.create(salesData);

  const newQuantity = Number(flower.productQuantity) - salesData.quantity;
  await Product.findByIdAndUpdate(salesData.productId, {
    productQuantity: String(newQuantity),
  });

  // console.log(flower);
  // console.log(salesData.quantity);
  // if (result && flower) {
  //   const currentQuantity =
  //     parseInt(flower.productQuantity) - salesData.quantity;
  //   // console.log('current', currentQuantity);
  //   await Product.findByIdAndUpdate(
  //     { _id: salesData.productId },
  //     { productQuantity: currentQuantity },
  //     {
  //       new: true,
  //     },
  //   );
  // }

  return result;
};

const getAllSalesFromDB = async () => {
  console.log('getting all sales');
  const result = await Sales.find().populate('productId');
  return result;
};

// const getSingleSalesFromDB = async (salesId: string) => {
//   const result = await Sales.findById(salesId);
//   return result;
// };

const updateSalesInDB = async (salesId: string, updatedSalesData: TSales) => {
  const result = await Sales.findByIdAndUpdate(salesId, updatedSalesData, {
    new: true,
  });
  return result;
};

const deleteSalesFromDB = async (salesId: string) => {
  const result = await Sales.findByIdAndDelete(salesId);
  return result;
};

export const SalesService = {
  createSalesIntoDB,
  getAllSalesFromDB,
  // getSingleSalesFromDB,
  updateSalesInDB,
  deleteSalesFromDB,
};
