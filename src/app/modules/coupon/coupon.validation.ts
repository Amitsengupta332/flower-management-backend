import { z } from 'zod';

const couponSchemaValidation = z.object({
  code: z.string(),
  discountPercentage: z.number(),
});
export const couponValidation = {
  couponSchemaValidation,
};
