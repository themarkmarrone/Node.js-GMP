import * as Config from './config/config.json';
import { Product, User } from './models';

console.log(Config.name);

const user = new User();
const product = new Product();
