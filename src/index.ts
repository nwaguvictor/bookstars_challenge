import express, { Request, Response, Application, NextFunction } from 'express';
import http from 'http';
import { routes } from './router';
import { PORT, db, MONGO_URI } from './config';
import { errorMiddleware } from './middlewares';
import { CustomError } from './utils';

const app: Application = express();

app.get('/ping', (req: Request, res: Response) => {
  res.json({
    message: 'Testing Bookstars heartbeat',
  });
});

app.use('/api', routes);

/** Error Middlewares */
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  return next(new CustomError(`Not Found: can not make a ${req.method} to ${req.originalUrl}`, 404));
});
app.use(errorMiddleware);

/** Create server */
const server = http.createServer(app);

server.listen(PORT, async () => {
  console.log(`😋 Application running on port: ${PORT}`);
  await db.connect(MONGO_URI);
});
