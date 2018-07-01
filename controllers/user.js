import * as baseControllers from './base';
import { User } from '../models/user';

export async function getAllUsers(request, response) {
  let result;
  try {
    result = await baseControllers.findAll(User);
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

export async function getUser(request, response) {
  const id = request.params.id;
  let result;
  try {
    result = await baseControllers.findById(User, id);
  } catch (error) {
    console.error(error);
  }
  if (result == null) {
    response.status(404);
    response.send(`No user with id = ${id}`);
  } else {
    response.json(result);
  }
}

export async function insertUser(request, response) {
  const user = request.body;
  let userDocument;
  try {
    userDocument = await User.findOne().sort('-id');
  } catch (error) {
    console.error(error);
  }
  let userId = user.id || userDocument ? userDocument.id : 0;
  const newUser = new User({
    ...user,
    id: ++userId,
  });
  newUser.update();
  let result;
  try {
    result = await newUser.save();
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

export async function updateUser(request, response) {
  const id = request.params.id;
  const user = request.body;
  const newUser = new User({
    ...user,
  });
  newUser.update();
  const updateData = newUser.toObject();
  delete updateData._id;
  let result;

  try {
    result = await baseControllers.updateOne(User, id, updateData);
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

export async function deleteUser(request, response) {
  const id = request.params.id;
  let result;
  try {
    result = await baseControllers.deleteById(User, id);
  } catch (error) {
    console.error(error);
  }
  if (result == null) {
    response.status(404);
    response.send(`Something went wrong`);
  } else {
    response.send(`User with id ${id} was deleted`);
  }
}
