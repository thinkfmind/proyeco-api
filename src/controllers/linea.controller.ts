import { Request, Response, NextFunction } from 'express';
import { validateRequest } from '../middlewares/validateRequest';
import * as service from '../services/linea.services';
import Joi from 'joi';

export function create(req: Request, res: Response, next: NextFunction) {
  service
    .create(req.body)
    .then((linea) => res.json(linea))
    .catch(next);
}

export function getLineas(req: Request, res: Response, next: NextFunction) {
  service
    .getLineas()
    .then((lineas) => res.json(lineas))
    .catch(next);
}

export function getLineasByEmpresa(req: Request, res: Response, next: NextFunction) {
  const empresa = req.params.empresa;
  service
    .getLineasByEmpresa(empresa)
    .then((lineas) => res.json(lineas))
    .catch(next);
}
