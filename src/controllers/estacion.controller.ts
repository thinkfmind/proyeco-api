import { Request, Response, NextFunction } from 'express';
import { validateRequest } from '../middlewares/validateRequest';
import * as service from '../services/estacion.services';
import Joi from 'joi';

export function create(req: Request, res: Response, next: NextFunction) {
  service
    .create(req.body)
    .then((estacion) => res.json(estacion))
    .catch(next);
}

export function getEstaciones(req: Request, res: Response, next: NextFunction) {
  service
    .getEstaciones()
    .then((estaciones) => res.json(estaciones))
    .catch(next);
}

export function getEquiposByEmpresa(req: Request, res: Response, next: NextFunction) {
  const empresa = req.params.empresa;
  service
    .getEstacionesByEmpresa(empresa)
    .then((estaciones) => res.json(estaciones))
    .catch(next);
}
