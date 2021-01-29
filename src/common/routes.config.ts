import express from 'express';

export interface IRoutesConfig {
  app: express.Application;
  name: string;

  getName(): string;

  configureRoutes(): express.Application;
}
