import mongoose from 'mongoose';
import faker from 'faker';

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    requred: true,
  },
  reviews: [String],
  lastModifiedDate: Number,
});

productSchema.methods.update = function() {
  this.lastModifiedDate = new Date();
};

productSchema.statics.generate = function() {
  const name = faker.name.firstName();
  const reviews = faker.lorem.sentence().split(' ');
  return {
    name,
    reviews,
  };
};

export const Product = mongoose.model('products', productSchema);
