import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import countriesRouter from './routers/countriesRouter';
import organizationsRouter from './routers/organizationsRouter';
import plantersRouter from './routers/plantersRouter';
import speciesRouter from './routers/speciesRouter';
import treesRouter from './routers/treesRouter';
import { errorHandler, handlerWrapper } from './routers/utils';
import HttpError from './utils/HttpError';
import { version } from '../package.json';

const app = express();

// Sentry.init({ dsn: config.sentry_dsn });

// app allow cors
app.use(cors());

/*
 * Check request
 */
app.use(
  handlerWrapper((req, _res, next) => {
    if (
      req.method === 'POST' ||
      req.method === 'PATCH' ||
      req.method === 'PUT'
    ) {
      if (req.headers['content-type'] !== 'application/json') {
        throw new HttpError(
          415,
          'Invalid content type. API only supports application/json',
        );
      }
    }
    next();
  }),
);

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// routers
app.use('/countries', countriesRouter);
app.use('/trees', treesRouter);
app.use('/planters', plantersRouter);
app.use('/organizations', organizationsRouter);
app.use('/species', speciesRouter);
// Global error handler
app.use(errorHandler);

app.get('*', (req, res) => {
  res.status(404).send(version);
});

export default app;
