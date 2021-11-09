import { Router } from 'express';
import { authorize } from '../middlewares/authorize';
import { Role } from '../helpers/role';
import { create, getEstaciones, getEquiposByEmpresa } from '../controllers/estacion.controller';

const router = Router();

router.post('/', create);
router.get('/', getEstaciones);
router.get('/:id', getEquiposByEmpresa);

export default router;
