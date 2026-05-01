import { Router } from 'express';
import { UsersController } from './users.controller';
import { validate } from '../../middlewares/validate.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { createUserSchema } from './users.schema';

const router = Router();
const usersController = new UsersController();

/**
 * @openapi
 * tags:
 *   name: Users
 *   description: Gestión de usuarios
 */


/**
 * @openapi
 * /v1/users/register:
 *   post:
 *     tags: [Users]
 *     summary: Registrar un usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Maria
 *               email:
 *                 type: string
 *                 example: mari@email.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Usuario creado
 *       400:
 *         description: Datos inválidos
 */
router.post('/register', validate(createUserSchema), usersController.register);

/**
 * @openapi
 * /v1/users:
 *   get:
 *     tags: [Users]
 *     summary: Obtener todos los usuarios
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       401:
 *         description: No autorizado
 */
router.get('/', authMiddleware, usersController.findAllUsers);

export default router;