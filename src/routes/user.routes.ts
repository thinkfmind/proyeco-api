import { Router } from 'express';
import { authorize } from '../middlewares/authorize';
import { Role } from '../helpers/role';
import { uploadSingle } from '../middlewares/multer';
import {
  registerSchema,
  register,
  authenticateSchema,
  authenticate,
  revokeTokenSchema,
  revokeToken,
  // refreshToken,
  getAllUsers,
  getRefreshTokens,
  updateUser,
  trashUser,
  deleteUser,
} from '../controllers/user.controller';

const router = Router();

router.post('/register', authorize(Role.Admin), uploadSingle, registerSchema, register);
router.post('/auth', authenticateSchema, authenticate);
router.put('/:id', authorize(Role.Admin), uploadSingle, updateUser);
// router.post('/refresh-token', refreshToken);
router.post('/revoke-token', authorize(), revokeTokenSchema, revokeToken);
// router.get("/", authorize(Role.Administrator), getAllUsers);
router.get('/', authorize(), getAllUsers);
router.get('/:id/refresh-tokens', authorize(), getRefreshTokens);
// router.put("/:id", authorize(), update);
router.put('/trash/:id', authorize(Role.Admin), trashUser);
router.delete('/:id', authorize(Role.Admin), deleteUser);

export default router;

/**
 * @swagger
 *  tags:
 *    name: User
 *    description: User endpoints
 */

/**
 * @swagger
 * /user/register:
 *  post:
 *    summary: Register new user
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              username:
 *                type: string
 *              password:
 *                type: string
 *    tags: [User]
 *    responses:
 *      200:
 *        description: User created
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                token:
 *                  type: string
 */
