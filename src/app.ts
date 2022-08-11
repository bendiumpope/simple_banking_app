import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import limiter from './middlewares/rateLimiter';
import accountRoutes from './routes/accountRoutes';
import transactionsRoutes from './routes/transactionRoutes';
import httpError from './utils/errorHandler/http-error';
import { HttpError } from 'http-errors';
import { RequestInterface } from './utils/interfaces/appInterface';

const app: Express = express();

app.use(express.urlencoded({ extended: false }));
app.use(helmet());

app.use('/api/v1', limiter);

app.use(express.json({ limit: '10kb' }));

app.use((req: any, res: Response, next: NextFunction) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(cors());

app.use('/api/v1/accounts', accountRoutes);
app.use('/api/v1/transactions', transactionsRoutes);

app.all('*', (req: Request) => {
  const error = new httpError(
    `Cant find ${req.originalUrl} on this server!`,
    404
  );

  throw error;
});

app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.code || 500).json({
    message: error.message || 'An unknown error occured',
  });
});

export default app;
