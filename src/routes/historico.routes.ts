import { Router } from 'express';
import { authorize } from '../middlewares/authorize';
import { Role } from '../helpers/role';
import { create, createSchema, getHistorico, getHistoricos, getZipHistorico, updateHistorico } from '../controllers/historico.controller';
import { uploadHistorico } from '../middlewares/multer';

const router = Router();

router.post('/', authorize(Role.Admin), uploadHistorico, createSchema, create);
router.put('/:id', authorize(Role.Admin), authorize(Role.Admin), uploadHistorico, createSchema, updateHistorico);
router.get('/:id', authorize(), getHistorico);
router.get('/', authorize(), getHistoricos);
router.post('/zip', authorize(Role.Admin), getZipHistorico);

export default router;
