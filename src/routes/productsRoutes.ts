import {IRoutesConfig} from '../common/routes.config';
import express from 'express';

export class ProductsRoutes implements IRoutesConfig {
  app: express.Application
  name: string;
  constructor(app: express.Application, name: string) {
    this.app = app;
    this.name = name;
  }

  configureRoutes() {
    this.app.route(`/products`)
        .get((req: express.Request, res: express.Response) => {
            res.status(200).send(`List of products`);
        })
        .post((req: express.Request, res: express.Response) => {
            res.status(200).send(`Post to products`);
        });

    this.app.route(`/products/:productId`)
        .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
            // this middleware function runs before any request to /users/:userId
            // but it doesn't accomplish anything just yet---
            // it simply passes control to the next applicable function below using next()
            next();
        })
        .get((req: express.Request, res: express.Response) => {
            res.status(200).send(`GET requested for productId ${req.params.productId}`);
        })
        .put((req: express.Request, res: express.Response) => {
            res.status(200).send(`PUT requested for productId ${req.params.productId}`);
        })
        .patch((req: express.Request, res: express.Response) => {
            res.status(200).send(`PATCH requested for productId ${req.params.productId}`);
        })
        .delete((req: express.Request, res: express.Response) => {
            res.status(200).send(`DELETE requested for productId ${req.params.productId}`);
        });

    return this.app;  
  }

  getName(): string {
    return this.name;
  };

}
