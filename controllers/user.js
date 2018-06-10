import { findAll } from './base';

const usersPath = './models/users.json';

export async function getAllUsers(request, response) {
  const content = await findAll(usersPath);
  const result = Object.values(JSON.parse(content.toString()));
  response.json(result);
}

export async function getUser(request, response) {
  const id = request.params.id;
  const content = await findAll(usersPath);
  const result = JSON.parse(content.toString())[id];
  if (result) {
    response.json(result);
  } else {
    response.send(`No user with id = ${id}`);
  }
}
