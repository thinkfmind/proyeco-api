import { Router } from 'express';
import { authorize } from '../middlewares/authorize';
import { Role } from '../helpers/role';
import { create, getLineas, getLineasByEmpresa } from '../controllers/linea.controller';

const router = Router();

router.post('/', create);
router.get('/', authorize(), getLineas);
router.get('/:id', authorize(), getLineasByEmpresa);

export default router;
