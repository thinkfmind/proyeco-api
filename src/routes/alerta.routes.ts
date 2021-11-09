import { Router } from 'express';
import { authorize } from '../middlewares/authorize';
import { Role } from '../helpers/role';
import { create, editAlerta, getAlerta, getAlertas } from '../controllers/alerta.controller';

const router = Router();

router.post('/', authorize(), create);
router.put('/:id', authorize(Role.Admin), editAlerta);
router.get('/', authorize(), getAlertas);
router.get('/:id', authorize(), getAlerta);

export default router;
