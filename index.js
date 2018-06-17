import app from './app';
import { CONFIG } from './configs/app.config';

const port = CONFIG.DEFAULT_PORT;
app.listen(port, () => console.log(`App listening on port ${port}!`));
