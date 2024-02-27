import { z } from 'zod';
// import {
//   productCategoryType,
//   productFragrance,
//   productSize,
// } from './product.constant';

// const ProductValidation = z.object({
//   productName: z.string(),
//   productQuantity: z.string(),
//   price: z.string(),
//   bloomDate: z.string(),
//   color: z.string(),
//   selectCategory: z.enum([...productCategoryType] as [string, ...string[]]),
//   size: z.enum([...productSize] as [string, ...string[]]),
//   fragrance: z.enum([...productFragrance] as [string, ...string[]]),
// });
const ProductValidation = z.object({
  productName: z.string(),
  productQuantity: z.string(),
  price: z.string(),
  bloomDate: z.string(), // You might want to specify a date format here
  color: z.string(),
  selectCategory: z.enum([
    'Roses',
    'Lilies',
    'Sunflowers',
    'Tulips',
    'Orchids',
  ]),
  size: z.enum(['s', 'm', 'l']),
  fragrance: z.enum(['Rose', 'Lily', 'Jasmine', 'Lavender', 'Citrus']),
});

export default ProductValidation;
