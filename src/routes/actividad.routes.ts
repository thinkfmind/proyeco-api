import { Router } from 'express';
import { authorize } from '../middlewares/authorize';
import { Role } from '../helpers/role';
import {
  create,
  editActividad,
  getActividad,
  getActividades,
  getActividadbyEquipo,
  getActividadesOnTrash,
  trashActividad,
  deleteActividad,
  getActividadbyEmpresa
} from '../controllers/actividad.controller';

const router = Router();

router.post('/', authorize(), create);
router.put('/:id', authorize([Role.Admin, Role.Empresa]), editActividad);
router.get('/', authorize(), getActividades);
router.get('/:id', authorize(), getActividad);
router.get('/equipo/:id', authorize(), getActividadbyEquipo);
router.get('/empresa/:id', authorize(), getActividadbyEmpresa);
router.get('/trash/get', authorize(), getActividadesOnTrash);
router.put('/trash/:id', authorize([Role.Admin, Role.Empresa]), trashActividad);
router.delete('/:id', authorize([Role.Admin, Role.Empresa]), deleteActividad);

export default router;
