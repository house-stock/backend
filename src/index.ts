import './LoadEnv'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
import { Mongo } from './db/mongo/mongo';

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
    return Mongo.connect().then(() => console.log('Mongo instance is ok'))
});
