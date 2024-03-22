/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { Coupon } from '../coupon/coupon.model';
import { Product } from '../products/product.model';
import { TSales } from './sales.interface';
import { Sales } from './sales.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

// const createSalesIntoDB = async (salesData: TSales, couponCode: string) => {
//   try {
//     // Find the product
//     const flower = await Product.findById(salesData.productId);

//     // Check if the product exists
//     if (!flower) {
//       throw new Error('Product not found');
//     }

//     // Apply coupon code logic
//     let discountPrice = 0;
//     if (couponCode) {
//       const coupon = await Coupon.findOne({ code: couponCode });
//       if (coupon) {
//         // Cast flower.price to a number
//         const price = Number(flower.price);
//         discountPrice =
//           salesData.quantity * price * (coupon.discountPercentage / 100);
//       }

//       return coupon;
//     }

//     // const coupon = await Coupon.findOne({ code: couponCode });
//     // console.log(coupon);

//     // if (!coupon) {
//     //   throw new AppError(httpStatus.NOT_FOUND, 'Coupon is invalid');
//     // }

//     // if (coupon) {
//     //   const price = Number(flower.price);
//     //   discountPrice =
//     //     salesData.quantity * price * (coupon.discountPercentage / 100);
//     // }

//     // Calculate total price after discount
//     const totalPrice =
//       salesData.quantity * Number(flower.price) - discountPrice;

//     salesData.price = Number(totalPrice);
//     console.log(salesData);
//     // Create the sales record
//     const result = await Sales.create({
//       ...salesData,
//     });

//     // Update product quantity if sale is successful
//     if (result) {
//       const currentQuantity =
//         parseInt(flower.productQuantity) - salesData.quantity;
//       if (currentQuantity === 0) {
//         await Product.findByIdAndDelete(salesData.productId);
//       } else {
//         await Product.findByIdAndUpdate(
//           { _id: salesData.productId },
//           { productQuantity: currentQuantity },
//           { new: true },
//         );
//       }
//     }

//     return result;
//   } catch (error) {
//     throw new Error('Error creating sales ');
//   }
// };

const createSalesIntoDB = async (salesData: any) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Find the product
    const flower = await Product.findById(salesData.productId).session(session);

    // Check if the product exists
    if (!flower) {
      throw new Error('Product not found');
    }
    const productPrice = flower.price;
    const flowerQuantity = flower.productQuantity;

    const totalPrice = Number(productPrice) * Number(flowerQuantity);
    console.log(totalPrice);

    let discountPrice = 0;
    if (salesData.coupon) {
      const coupon = await Coupon.findOne({ code: salesData.coupon }).session(
        session,
      );

      console.log({ coupon });

      if (!coupon) {
        throw new AppError(httpStatus.NOT_FOUND, 'coupon does not exits');
      }
      const discountPercent = coupon?.discountPercentage as number;
      discountPrice = (totalPrice * discountPercent) / 100;
    }

    salesData.price = Number(totalPrice);

    salesData.disCountPrice = discountPrice;

    salesData.finalPrice = Number(totalPrice) - Number(discountPrice) || 0;

    // Create the sales record
    const result = await Sales.create([salesData], { session });

    // Update product quantity if sale is successful
    if (result) {
      const currentQuantity =
        parseInt(flower.productQuantity) - salesData.quantity;
      if (currentQuantity === 0) {
        await Product.findByIdAndDelete(salesData.productId).session(session);
      } else {
        await Product.findByIdAndUpdate(
          { _id: salesData.productId },
          { productQuantity: currentQuantity },
          { new: true, session },
        );
      }
    }

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return result;
  } catch (error) {
    // Rollback the transaction
    await session.abortTransaction();
    session.endSession();
    throw new Error('Error creating sales');
  }
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
