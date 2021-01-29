import {IRoutesConfig} from '../common/routes.config';
import express from 'express';

export class UsersRoutes implements IRoutesConfig {
  app: express.Application
  name: string;
  constructor(app: express.Application, name: string) {
    this.app = app;
    this.name = name;
  }

  configureRoutes() {
    this.app.route(`/users`)
        .get((req: express.Request, res: express.Response) => {
            res.status(200).send(`List of users`);
        })
        .post((req: express.Request, res: express.Response) => {
            res.status(200).send(`Post to users`);
        });

    this.app.route(`/users/:userId`)
        .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
            // this middleware function runs before any request to /users/:userId
            // but it doesn't accomplish anything just yet---
            // it simply passes control to the next applicable function below using next()
            next();
        })
        .get((req: express.Request, res: express.Response) => {
            res.status(200).send(`GET requested for userId ${req.params.userId}`);
        })
        .put((req: express.Request, res: express.Response) => {
            res.status(200).send(`PUT requested for userId ${req.params.userId}`);
        })
        .patch((req: express.Request, res: express.Response) => {
            res.status(200).send(`PATCH requested for userId ${req.params.userId}`);
        })
        .delete((req: express.Request, res: express.Response) => {
            res.status(200).send(`DELETE requested for userId ${req.params.userId}`);
        });

    return this.app;  
  }

  getName(): string {
    return this.name;
  };

}
