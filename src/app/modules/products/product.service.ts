// import QueryBuilder from '../../builder/QueryBuilder';
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
  // const meta = await productQuery.countTotal();

  // return {
  //   meta,
  //   result,
  // };
  return result;
};

// const getAllProductFromDB = async (query: Record<string, unknown>) => {
//   const {
//     searchTerm = '',
//     page = 1,
//     limit = 20,
//     sortBy,
//     sortOrder = 'asc',
//   } = query;
//   const filter: Record<string, unknown> = {};
//   if (query.fragrance) {
//     filter.fragrance = query.fragrance;
//   }
//   if (query.type) {
//     filter.type = query.type;
//   }
//   if (query.size) {
//     filter.size = query.size;
//   }
//   if (query.minPrice || query.maxPrice) {
//     filter.price = {
//       $gte: parseInt(query.minPrice as string),
//       $lte: parseInt(query.maxPrice as string),
//     };
//   }
//   const skip = (Number(page) - 1) * Number(limit);
//   const flowerSearchableFields = [
//     'productName',
//     'color',
//     'style',
//     'arrangement',
//     'type',
//     'size',
//     'fragrance',
//   ];
//   const searchQuery = Product.find({
//     $or: flowerSearchableFields.map((field) => ({
//       [field]: { $regex: searchTerm, $options: 'i' },
//     })),
//   });
//   const result = await searchQuery
//     .find(filter)
//     .sort({ [sortBy as string]: sortOrder === 'asc' ? 1 : -1 })
//     .skip(skip)
//     .limit(parseInt(limit as string));
//   return result;
// };

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
