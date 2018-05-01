import path from 'path';

import DirtWatcher from './dirtwatcher';
import Importer from './importer';

const dirtWatcher = new DirtWatcher('./data');
const importer = new Importer();

dirtWatcher.watch(1000);

dirtWatcher.on('changed', path => {
  importer.import(path).then(data => console.log(data));
  // console.log(importer.importSync(path))
});
