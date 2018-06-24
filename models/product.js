'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define(
    'Product',
    {
      name: DataTypes.STRING,
      reviews: DataTypes.ARRAY(DataTypes.STRING),
    },
    {},
  );
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};
