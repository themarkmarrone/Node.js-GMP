'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Products',
      [
        {
          name: 'Product 1',
          createdAt: new Date(),
          updatedAt: new Date(),
          reviews: ['review1_1', 'review1_2'],
        },
        {
          name: 'Product 2',
          createdAt: new Date(),
          updatedAt: new Date(),
          reviews: ['review2_1', 'review2_2'],
        },
        {
          name: 'Product 3',
          createdAt: new Date(),
          updatedAt: new Date(),
          reviews: ['review3_1', 'review3_2'],
        },
        {
          name: 'Product 4',
          createdAt: new Date(),
          updatedAt: new Date(),
          reviews: ['review4_1', 'review4_2'],
        },
        {
          name: 'Product 5',
          createdAt: new Date(),
          updatedAt: new Date(),
          reviews: ['review5_1', 'review5_2'],
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Products',
      [
        {
          name: 'Product 1',
          createdAt: new Date(),
          updatedAt: new Date(),
          reviews: ['review1_1', 'review1_2'],
        },
      ],
      {},
    );
  },
};
