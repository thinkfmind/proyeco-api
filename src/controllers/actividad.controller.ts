import { Request, Response, NextFunction } from 'express';
import { validateRequest } from '../middlewares/validateRequest';
import * as service from '../services/actividad.services';
import Joi from 'joi';

export function create(req: Request, res: Response, next: NextFunction) {
  service
    .create(req.body)
    .then((actividad) => res.json(actividad))
    .catch(next);
}

export function editActividad(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  service
    .editActividad(id, req.body)
    .then((actividad) => res.json(actividad))
    .catch(next);
}

export function getActividad(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  service
    .getActividad(id)
    .then((actividad) => res.json(actividad))
    .catch(next);
}

export function getActividades(req: Request, res: Response, next: NextFunction) {
  service
    .getActividades()
    .then((actividades) => res.json(actividades))
    .catch(next);
}

export function getActividadesOnTrash(req: Request, res: Response, next: NextFunction) {
  service
    .getActividadesOnTrash()
    .then((actividades) => res.json(actividades))
    .catch(next);
}

export function getActividadbyEquipo(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  service
    .getActividadbyEquipo(id)
    .then((actividades) => res.json(actividades))
    .catch(next);
}

export function getActividadbyEmpresa(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  service
    .getActividadbyEmpresa(id)
    .then((actividades) => res.json(actividades))
    .catch(next);
}

export function trashActividad(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  service
    .trashActividad(id, req.body)
    .then(() => res.json({success: true}))
    .catch(next);
}

export function deleteActividad(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  service
    .deleteActividad(id)
    .then(() => res.json({success: true}))
    .catch(next);
}