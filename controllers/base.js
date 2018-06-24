import models from '../models';

export function findAll(tableName) {
  return models[tableName].findAll({});
}

export function findById(tableName, id) {
  return models[tableName].findById(id);
}

export function findOne(tableName, column, value) {
  console.log(models[tableName]);
  return models[tableName].findOne({ where: { [column]: value } });
}

export function insertOne(tableName, entity) {
  return models[tableName].create(entity);
}
