import config from 'config';
import fs from 'fs';
import express from 'express';
import spdy from 'spdy';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';

import logger, { requestLogger } from './service/winston';
import endpoints from './endpoint';
import { connectMongoDB } from './persistance/dal';
import startProvisioning from './service/provisioning';

logger.info('Create express instance...');
const app = express();
logger.info('Express instance created.');

const main = async () => {
  logger.info('Connect to MongoDB...');
  const db = await connectMongoDB();
  if (!db) {
    logger.error('Connect to MongoDB failed.');
    process.exit(0);
  }
  app.locals.db = db;
  logger.info('MongoDB connected.');

  logger.debug('Add body parser...');
  app.use(bodyParser.json({
    limit: '5mb',
    type: 'application/json',
    extended: true,
  }));
  app.use(compression({ level: 6 }));
  logger.debug('Body parser added.');

  app.use(cors());

  logger.debug('Add request logger...');
  requestLogger(app);
  logger.debug('Request logger added.');

  if (config.get('SERVICE.PROVISIONING.ENABLE')) {
    await startProvisioning(db);
  }

  logger.info('Load all endpoints...');
  endpoints(app);
  logger.info('All endpoints loaded.');

  if (config.get('HTTP.SSL')) {
    logger.info('Start Server HTTP/2...');
    spdy.createServer({
      key: fs.readFileSync(config.get('HTTP.PRIVKEY')),
      cert: fs.readFileSync(config.get('HTTP.CERT')),
    }, app)
      .listen(config.get('HTTP.PORT'), (err) => {
        if (err) {
          logger.error(err.stack);
          throw new Error(err);
        } else logger.info(`Server HTTP/2 with port ${config.get('HTTP.PORT')} started.`);
      });
  } else {
    logger.warn('Start Server HTTP NOT SSL!!!...');
    app.listen(config.get('HTTP.PORT'), (err) => {
      if (err) {
        logger.error(err.stack);
        throw new Error(err);
      } else logger.warn(`Server HTTP NOT SSL!!! with port ${config.get('HTTP.PORT')} started.`);
    });
  }
};

try {
  main();
} catch (e) {
  logger.error(e.stack);
}
