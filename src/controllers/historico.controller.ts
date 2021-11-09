import { Request, Response, NextFunction } from 'express';
import { validateRequest } from '../middlewares/validateRequest';
import * as service from '../services/historico.services';
import Joi from 'joi';

interface MulterRequest extends Request {
  file: any;
}

export function createSchema(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    empresa: Joi.string().required(),
    equipo: Joi.string().required(),
    estacion: Joi.string().required(),
    linea: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

export function create(req: Request, res: Response, next: NextFunction) {
  const documentFile = (req as MulterRequest).file;
  service
    .create(req.body, documentFile)
    .then((historico) => res.json(historico))
    .catch(next);
}

export function updateHistorico(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  const documentFile = (req as MulterRequest).file;
  service
    .updateHistorico(id, req.body, documentFile)
    .then((historico) => res.json(historico))
    .catch(next);
}

export function getHistorico(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  service
    .getHistorico(id)
    .then((historicos) => res.json(historicos))
    .catch(next);
}

export function getHistoricos(req: Request, res: Response, next: NextFunction) {
  service
    .getHistoricos()
    .then((historicos) => res.json(historicos))
    .catch(next);
}

export function getZipHistorico(req: Request, res: Response, next: NextFunction) {
  service
    .getZipHistorico(req.body, res)
    .then(() => {})
    .catch(next);
}
