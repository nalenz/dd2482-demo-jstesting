import express, { Request, Response, NextFunction } from 'express';
import { Validator, ValidationError } from 'express-json-validator-middleware';
import { shoppingCartItemSchema, ShoppingCart } from './schemas';

const app = express();
const port = 3000;
const validator = new Validator({});
const shoppingCart: ShoppingCart = {};

app.use(express.json());

app.post('/shopping-cart/:id', validator.validate({ body: shoppingCartItemSchema }), (req, res) => {
  if (!shoppingCart[req.params.id]) shoppingCart[req.params.id] = [];
  shoppingCart[req.params.id].push(req.body);
  res.status(204).end();
});

app.get('/shopping-cart/:id', (req, res) => {
  res.status(200).json(shoppingCart[req.params.id] ?? []);
});

// middleware to handle validation errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    res.status(422).json(err.validationErrors);
    next();
  } else {
    // pass error on if it is not a validation error
    next(err);
  }
});

if (require.main === module) {
  // only actually run the server when this file is executed via the command line,
  // but not when testing the server via Jest
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

export default app;
