import { Router } from 'express';
import { authorize } from '../middlewares/authorize';
import { Role } from '../helpers/role';
import { uploadMultiple } from '../middlewares/multer';
import {
  create,
  createSchema,
  getEquipo,
  updateEquipo,
  getEquipos,
  getEquiposByEmpresa,
  trashEquipo,
  deleteEquipo,
  getEquiposOnTrash,
} from '../controllers/equipo.controller';

const router = Router();

router.post('/', authorize(Role.Admin), uploadMultiple, createSchema, create);
router.put('/:id', authorize(Role.Admin), uploadMultiple, createSchema, updateEquipo);
router.get('/', authorize(), getEquipos);
router.get('/trash/get', authorize(), getEquiposOnTrash);
router.get('/empresa/:id', authorize(), getEquiposByEmpresa);
router.get('/:id', authorize(), getEquipo);
router.put('/trash/:id', authorize(Role.Admin), trashEquipo);
router.delete('/:id', authorize(Role.Admin), deleteEquipo);

export default router;
