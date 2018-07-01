import mongoose from 'mongoose';
import faker from 'faker';

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  firstname: String,
  lastname: String,
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: 'Email is needed',
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Enter a valid email'],
  },
  lastModifiedDate: Number,
});

userSchema.methods.update = function() {
  this.lastModifiedDate = new Date();
};

userSchema.statics.generate = function() {
  const firstname = faker.name.firstName();
  const lastname = faker.name.lastName();
  const username = faker.internet.userName();
  const email = faker.internet.email();
  return {
    firstname,
    lastname,
    username,
    email,
  };
};

export const User = mongoose.model('users', userSchema);
