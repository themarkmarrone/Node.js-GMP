import * as baseControllers from './base';
import { Product } from '../models/product';

export async function getAllProducts(request, response) {
  let result;
  try {
    result = await baseControllers.findAll(Product);
  } catch (error) {
    console.error(error);
  }
  if (result == null) {
    response.status(404);
    response.send(`Something went wrong`);
  } else {
    response.json(result);
  }
}

export async function getProduct(request, response) {
  const id = request.params.id;
  let result;
  try {
    result = await baseControllers.findById(Product, id);
  } catch (error) {
    console.error(error);
  }
  if (result == null) {
    response.status(404);
    response.send(`No product with id = ${id}`);
  } else {
    response.json(result);
  }
}

export async function insertProduct(request, response) {
  const product = request.body;
  let productDocument;
  try {
    productDocument = await Product.findOne().sort('-id');
  } catch (error) {
    console.error(error);
  }
  let productId = product.id || productDocument ? productDocument.id : 0;
  const newProduct = new Product({
    ...product,
    id: ++productId,
  });
  newProduct.update();
  let result;
  try {
    result = await newProduct.save();
  } catch (error) {
    console.error(error);
  }
  if (result == null) {
    response.status(404);
    response.send(`Something went wrong`);
  } else {
    response.json(result);
  }
}

export async function updateProduct(request, response) {
  const id = request.params.id;
  const product = request.body;
  const newProduct = new Product({
    ...product,
  });
  newProduct.update();
  const updateData = newProduct.toObject();
  delete updateData._id;
  let result;

  try {
    result = await baseControllers.updateOne(Product, id, updateData);
  } catch (error) {
    console.error(error);
  }

  if (result == null) {
    response.status(404);
    response.send(`Something went wrong`);
  } else {
    response.json(result);
  }
}

export async function deleteProduct(request, response) {
  const id = request.params.id;
  let result;
  try {
    result = await baseControllers.deleteById(Product, id);
  } catch (error) {
    console.error(error);
  }
  if (result == null) {
    response.status(404);
    response.send(`Something went wrong`);
  } else {
    response.send(`Product with id ${id} was deleted`);
  }
}

export async function getProductReviews(request, response) {
  const id = request.params.id;
  let result;
  try {
    result = await baseControllers.findById(Product, id);
  } catch (error) {
    console.error(error);
  }
  if (result == null) {
    response.status(404);
    response.send(`No product with id = ${id}`);
  } else {
    const reviews = result.reviews;
    response.json(reviews);
  }
}
