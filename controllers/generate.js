import { User } from '../models/user';
import { Product } from '../models/product';

const getRandomInt = max => Math.floor(Math.random() * (max - 1 + 1) + 1);

export async function generateData(request, response) {
  let userDocument;
  let productDocument;
  try {
    userDocument = await User.findOne().sort('-id');
    productDocument = await Product.findOne().sort('-id');
  } catch (error) {
    console.error(error);
  }
  let userId = userDocument ? userDocument.id : 0;
  let productId = productDocument ? productDocument.id : 0;
  const users = Array(getRandomInt(7))
    .fill(1)
    .map(() => ({
      id: ++userId,
      ...User.generate(),
    }));
  const products = Array(getRandomInt(7))
    .fill(1)
    .map(() => ({
      id: ++productId,
      ...Product.generate(),
    }));

  Promise.all([User.collection.insert(users), Product.collection.insert(products)])
    .then(() => {
      response.send(`${products.length} products and ${users.length} users are inserted`);
    })
    .catch(error => {
      console.error(error);
      response.status(404).send('Something went wrong');
    });
}
