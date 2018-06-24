import { findAll, findById } from './base';

const usersPath = 'User';

export async function getAllUsers(request, response) {
  findAll(usersPath)
    .then(users => {
      response.json(users);
    })
    .catch(error => {
      console.error(error);
      response.status(404).send('Something went wrong');
    });
}

export async function getUser(request, response) {
  const id = request.params.id;
  findById(usersPath, id)
    .then(user => {
      if (user) {
        response.json(user);
      } else {
        response.status(404).send(`No user with id: ${id}`);
      }
    })
    .catch(error => {
      console.error(error);
      response.status(404).send(`Something went wrong`);
    });
}
