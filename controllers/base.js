import fs from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

export function findAll(path) {
  return readFileAsync(path).catch(error => {
    console.log(error);
  });
}

export function insertOne(path, entity) {
  return readFileAsync(path).then(data => {
    const jsonObject = JSON.parse(data);
    const id =
      entity.id != null && !isNaN(+entity.id)
        ? entity.id
        : Math.max(...Object.keys(jsonObject)) + 1;
    entity.id = id;
    const newJson = {
      ...jsonObject,
      [id]: entity
    };
    const newFile = JSON.stringify(newJson);
    return writeFileAsync(path, newFile, 'utf-8').then(() => entity);
  });
}
