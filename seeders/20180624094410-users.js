'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstname : 'John',
      lastname : 'Doe',
      username : 'johnDoe',
      createdAt : new Date(),
      updatedAt : new Date(),
      email : 'johnDoe@test.com'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Users', [{
      first_name :'John'
    }])
  }
};
