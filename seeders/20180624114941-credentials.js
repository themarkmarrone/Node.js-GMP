'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Credentials',
      [
        {
          password: 'simple_pass',
          login: 'andrei_markovich',
          username: 'Andrei Markovich',
          createdAt: new Date(),
          updatedAt: new Date(),
          email: 'Andrei_markovich@epam.com',
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Credentials', [
      {
        login: 'andrei_markovich',
      },
    ]);
  },
};
