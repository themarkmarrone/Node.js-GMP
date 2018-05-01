import parse from 'csv-parse/lib/sync';
import fs from 'fs';
import { promisify } from 'util';

export default class Importer {
  constructor() {}

  import(path) {
    const readFileAsync = promisify(fs.readFile);
    return readFileAsync(path, 'utf8')
      .then(fileContent => {
        return parse(fileContent, { columns: true });
      })
      .catch(error => {
        throw error;
      });
  }

  importSync(path) {
    const content = fs.readFileSync(path, 'utf8');
    const result = parse(content, { columns: true });
    return result;
  }
}
