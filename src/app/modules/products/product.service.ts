import QueryBuilder from '../../builder/QueryBuilder';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getAllProductFromDB = async (query: Record<string, unknown>) => {
  // const result = await Product.find();
  // return result;

  const productQuery = new QueryBuilder(Product.find(), query)
    // .search(phoneSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await productQuery.modelQuery;
  return result;
};

// const getAllProductFromDB = async (query: Record<string, unknown>) => {
//   const result = await Smartphone.find();
//   return result;

//   // const phoneQuery = new QueryBuilder(Smartphone.find(), query)
//   //   .search(phoneSearchableFields)
//   //   .filter()
//   //   .sort()
//   //   .paginate()
//   //   .fields();
//   // const result = await phoneQuery.modelQuery;
//   // return result;
// };

// const updateProductIntoDB = async (updatedUserData: Partial<TProduct>) => {
//   const result = await Product.findOneAndUpdate(
//     { $set: updatedUserData },
//     {
//       new: true,
//     },
//   );

//   return result;
// };

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  return result;
};

const updateProductInDB = async (id: string, updatedFlower: TProduct) => {
  const result = await Product.findByIdAndUpdate(id, updatedFlower, {
    new: true,
  });
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const productService = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductInDB,
  deleteProductFromDB,
  // updateProductIntoDB,
};
