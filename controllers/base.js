export function findAll(model) {
  return model.find({});
}

export function findById(model, id) {
  return model.findOne({ id });
}

export function deleteById(model, id) {
  return model.findOneAndDelete({ id });
}

export function findOne(model, column, value) {
  return model.findOne({ [column]: value });
}

export function updateOne(model, id, entity) {
  return model.updateOne({ id }, entity);
}
