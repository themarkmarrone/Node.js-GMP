import { findAll, findById, insertOne } from './base';

const productsPath = 'Product';

export async function getAllProducts(request, response) {
  findAll(productsPath)
    .then(products => {
      response.json(products);
    })
    .catch(error => {
      console.error(error);
      response.status(404).send('Something went wrong');
    });
}

export async function getProduct(request, response) {
  const id = request.params.id;
  findById(productsPath, id)
    .then(product => {
      if (product) {
        response.json(product);
      } else {
        response.status(404).send(`No product with id: ${id}`);
      }
    })
    .catch(error => {
      console.error(error);
      response.status(404).send(`Something went wrong`);
    });
}

export async function getProductReviews(request, response) {
  const id = request.params.id;
  findById(productsPath, id)
    .then(product => {
      if (product) {
        const reviews = product.reviews;
        response.json(reviews);
      } else {
        response.status(404);
        response.send(`No product with id = ${id}`);
      }
    })
    .catch(error => {
      console.error(error);
      response.status(404).send(`No product with id: ${id}`);
    });
}

export async function insertProduct(request, response) {
  const { name, reviews } = request.body;
  if (!name) {
    response.status(404).send('Wrong product name');
  } else {
    const newProduct = {
      name,
      reviews: reviews || [],
    };
    insertOne(productsPath, newProduct)
      .then(product => {
        response.json(product);
      })
      .catch(error => {
        console.log(error);
        response.status(404).send('Something went wrong');
      });
  }
}
