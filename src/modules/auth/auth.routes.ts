import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validate } from '../../middlewares/validate.middleware';
import { registerSchema, loginSchema } from './auth.schema';

const router = Router();
const authController = new AuthController();

/**
 * @openapi
 * tags:
 *   name: Auth
 *   description: Endpoints para autenticación de usuarios. Permite registrarse e iniciar sesión para obtener un token JWT.
 */

/**
 * @openapi
 * /v1/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Registrar un nuevo usuario
 *     description: Crea una nueva cuenta de usuario. La contraseña se encripta automáticamente con bcrypt antes de guardarse en la base de datos.
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
 *                 minLength: 4
 *                 example: Maria Garcia
 *               email:
 *                 type: string
 *                 format: email
 *                 example: maria@email.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente. Retorna el token JWT y los datos del usuario.
 *       400:
 *         description: Datos inválidos o el email ya está registrado.
 */
router.post('/register', validate(registerSchema), authController.register);
/**
 * @openapi
 * /v1/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Iniciar sesión
 *     description: Autentica al usuario con email y contraseña. Retorna un token JWT válido por 10 horas que debe usarse en los demás endpoints.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: maria@email.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login exitoso. Retorna el token JWT y los datos del usuario.
 *       401:
 *         description: Credenciales inválidas.
 */
router.post('/login', validate(loginSchema), authController.login);

export default router;