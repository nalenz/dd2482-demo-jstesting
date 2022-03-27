import { JSONSchema7 } from 'json-schema';

export const shoppingCartItemSchema: JSONSchema7 = {
  type: 'object',
  required: ['name', 'price'],
  additionalProperties: false,
  properties: {
    name: {
      type: 'string',
    },
    price: {
      type: 'number',
    },
  },
};
