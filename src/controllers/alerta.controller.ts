import { Request, Response, NextFunction } from 'express';
import { validateRequest } from '../middlewares/validateRequest';
import * as service from '../services/alerta.services';
import Joi from 'joi';

export function create(req: Request, res: Response, next: NextFunction) {
  service
    .create(req.body)
    .then((alerta) => res.json(alerta))
    .catch(next);
}

export function editAlerta(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  service
    .editAlerta(id, req.body)
    .then((alerta) => res.json(alerta))
    .catch(next);
}

export function getAlerta(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  service
    .getAlerta(id)
    .then((alerta) => res.json(alerta))
    .catch(next);
}

export function getAlertas(req: Request, res: Response, next: NextFunction) {
  service
    .getAlertas()
    .then((alertas) => res.json(alertas))
    .catch(next);
}
