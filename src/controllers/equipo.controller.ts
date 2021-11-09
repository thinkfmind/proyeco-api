import { Request, Response, NextFunction } from 'express';
import { validateRequest } from '../middlewares/validateRequest';
import * as service from '../services/equipo.services';
import Joi from 'joi';

interface MulterRequest extends Request {
  file: any;
}

export function createSchema(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    name: Joi.string().required(),
    linea: Joi.string().required(),
    estacion: Joi.string().required(),
    empresa: Joi.string().required(),
    identificacion: Joi.string().required(),
    modelo: Joi.string().required(),
    tipo: Joi.string().required(),
    detalles: Joi.string(),
    estado: Joi.string().required(),
    funciona: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

export function create(req: Request, res: Response, next: NextFunction) {
  const documentFiles = (req as MulterRequest).files;
  service
    .create(req.body, documentFiles)
    .then((equipo) => res.json(equipo))
    .catch(next);
}

export function updateEquipo(req: Request, res: Response, next: NextFunction) {
  const documentFiles = (req as MulterRequest).files;
  const id = req.params.id;
  service
    .updateEquipo(req.body, documentFiles, id)
    .then((equipo) => res.json(equipo))
    .catch(next);
}

export function getEquipos(req: Request, res: Response, next: NextFunction) {
  service
    .getEquipos()
    .then((equipos) => res.json(equipos))
    .catch(next);
}

export function getEquipo(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  service
    .getEquipo(id)
    .then((equipo) => res.json(equipo))
    .catch(next);
}

export function getEquiposByEmpresa(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  service
    .getEquiposByEmpresa(id)
    .then((equipos) => res.json(equipos))
    .catch(next);
}

export function getEquiposOnTrash(req: Request, res: Response, next: NextFunction) {
  service
    .getEquiposOnTrash()
    .then((equipos) => res.json(equipos))
    .catch(next);
}

export function trashEquipo(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  service
    .trashEquipo(id, req.body)
    .then(() => res.json({success: true}))
    .catch(next);
}

export function deleteEquipo(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  service
    .deleteEquipo(id)
    .then(() => res.json({success: true}))
    .catch(next);
}