import mongoose from 'mongoose';

const credentialSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function(pas) {
        return pas.length >= 6;
      },
      message: 'Password is less than 6 symbols',
    },
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: 'Email is needed',
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Enter a valid email'],
  },
});

export const Credential = mongoose.model('credentials', credentialSchema);
