import express from 'express';
import * as http from 'http';
import * as bodyparser from 'body-parser';

import cors from 'cors';
import {IRoutesConfig} from './common/routes.config';
import {UsersRoutes} from './routes/usersRoutes';
import {ProductsRoutes} from './routes/productsRoutes';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port: Number = 3000;
const routes: Array<IRoutesConfig> = [];

app.use(bodyparser.json());

// here we are adding middleware to allow cross-origin requests
app.use(cors());

// here we are adding the UserRoutes to our array,
// after sending the Express.js application object to have the routes added to our app!

const usersRoutes = new UsersRoutes(app, 'UsersRoutes');
usersRoutes.configureRoutes()
routes.push(usersRoutes);

const productsRoutes = new ProductsRoutes(app, 'ProductsRoutes');
productsRoutes.configureRoutes()
routes.push(productsRoutes);

// this is a simple route to make sure everything is working properly
app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(`Server up and running!`)
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  routes.forEach((route: IRoutesConfig) => {
      console.log(`Routes configured for ${route.getName()}`);
  });
});
