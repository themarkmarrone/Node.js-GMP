import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    min: 1,
  },
  city: {
    type: String,
    required: true,
  },
  admin: String,
  country: {
    type: String,
    required: [true, 'Belarus'],
    enum: ['Belarus'],
  },
  iso2: String,
  capital: String,
  lat: String,
  lng: String,
  population: String,
  population_proper: String,
  lastModifiedDate: Number,
});

citySchema.methods.update = function() {
  this.lastModifiedDate = new Date();
};

export const City = mongoose.model('cities', citySchema);
