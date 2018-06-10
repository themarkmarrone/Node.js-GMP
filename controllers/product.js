import { findAll, insertOne } from './base';

const productsPath = './models/products.json';

export async function getAllProducts(request, response) {
  const content = await findAll(productsPath);
  const result = Object.values(JSON.parse(content.toString()));
  response.json(result);
}

export async function getProduct(request, response) {
  const id = request.params.id;
  const content = await findAll(productsPath);
  const result = JSON.parse(content.toString())[id];
  if (result) {
    response.json(result);
  } else {
    response.send(`No product with id = ${id}`);
  }
}

export async function getProductReviews(request, response) {
  const id = request.params.id;
  const content = await findAll(productsPath);
  const result = JSON.parse(content.toString())[id];
  if (result) {
    const reviews = result.reviews;
    if (reviews) {
      response.json(result.reviews);
    } else {
      response.status(404);
      response.send(`No product with id = ${id}`);
    }
  } else {
    response.status(404);
    response.send(`No product with id = ${id}`);
  }
}

export async function insertProduct(request, response) {
  console.log(request.body);
  const newProduct = request.body;
  const content = await insertOne(productsPath, newProduct);
  if (content) {
    response.json(content);
  } else {
    response.send(`Something went wrong`);
  }
}
