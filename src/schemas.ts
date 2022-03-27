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

export interface ShoppingCartItem {
  name: string;
  price: number;
}

export interface ShoppingCart {
  [cartId: string]: ShoppingCartItem[];
}
