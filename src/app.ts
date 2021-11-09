import express, { Application, Response, Request } from 'express';
import { errorHandler } from './middlewares/errorHandler';
import swaggerUI from 'swagger-ui-express';
import { options } from '../swagger';
import swJsDoc from 'swagger-jsdoc';
import cookieParser from 'cookie-parser';
import cors from 'cors';

/* Routes */
import user from './routes/user.routes';
import linea from './routes/linea.routes';
import estacion from './routes/estacion.routes';
import equipo from './routes/equipo.routes';
import historico from './routes/historico.routes';
import alerta from './routes/alerta.routes';
import actividad from './routes/actividad.routes';

export class App {
  private app: Application; // ?PUBLIC FOR TEST

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middleware();
    this.routes();
    // this.errorMiddleware();
  }

  settings() {
    this.app.set(
      'port',
      process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : this.port
    );
  }

  middleware() {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: (origin, callback) => callback(null, true),
        credentials: true,
      })
    );
    this.app.use(cookieParser());
  }

  private routes() {
    this.app.get('/', (req: Request, res: Response) => {
      res.send('Hi!');
    });
    this.app.use('/user', user);
    this.app.use('/linea', linea);
    this.app.use('/estacion', estacion);
    this.app.use('/equipo', equipo);
    this.app.use('/historico', historico);
    this.app.use('/alerta', alerta);
    this.app.use('/actividad', actividad);
    this.app.use('/docs', swaggerUI.serve, swaggerUI.setup(swJsDoc(options)));
  }

  private errorMiddleware() {
    this.app.use(errorHandler);
  }

  async listen(): Promise<void> {
    await this.app.listen(this.app.get('port'));
    console.log(`Server on port: ${this.app.get('port')}`);
  }
}
