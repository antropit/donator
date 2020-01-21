require('dotenv').config();

// koa
import Koa from 'koa';
import views from 'koa-views';
import mount from 'koa-mount';
import serve from 'koa-static';
import logger from 'koa-logger';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';
import mongo from 'koa-mongo';

// unit
import middleware from './middleware';
import routes from './routes';
import cors from '@koa/cors';

const app = new Koa();

app.use(logger());
app.use(cors());
app.use(bodyParser({
  extendTypes: {
    json: ['application/x-javascript', 'application/json', 'application/x-www-form-urlencoded'] // will parse application/* type body as a JSON string
  }
}));

app.use(mount('/', convert(serve(`${__dirname}/public/`))));

app.use(views(`${__dirname}/view/`, {
  extension: 'html',
}));

app.use(mongo({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  db: process.env.DB_NAME,
  authSource: process.env.DB_AUTH_SOURCE,
  max: process.env.DB_MAX,
  min: process.env.DB_MIN,
}));

app.use(middleware());
app.use(routes());

app.listen(
  process.env.SRV_PORT,
  () => {
    console.log(`✅  The server is running at http://localhost:${process.env.SRV_PORT}/`);
    // open(`http://localhost:${env.port}/`);
  }
);

export default app;
