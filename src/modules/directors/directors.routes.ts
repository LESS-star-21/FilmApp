import { Router } from 'express';
import { DirectorsController } from './directors.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { createDirectorSchema, updateDirectorSchema } from './directors.schema';

const router = Router();
const directorsController = new DirectorsController();

/**
 * @openapi
 * tags:
 *   name: Directors
 *   description: Gestión de directores. Permite crear, consultar, actualizar y eliminar directores del catálogo.
 */

/**
 * @openapi
 * /v1/directors:
 *   post:
 *     tags: [Directors]
 *     summary: Crear un nuevo director
 *     description: Registra un nuevo director en el catálogo con su información personal y biográfica.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Christopher Nolan
 *               nationality:
 *                 type: string
 *                 example: Británico
 *               birthDate:
 *                 type: string
 *                 format: date-time
 *                 example: "1970-07-30T00:00:00.000Z"
 *               biography:
 *                 type: string
 *                 example: Director de Inception, The Dark Knight y Oppenheimer.
 *     responses:
 *       201:
 *         description: Director creado exitosamente.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: Token no proporcionado o inválido.
 *   get:
 *     tags: [Directors]
 *     summary: Obtener todos los directores
 *     description: Retorna la lista completa de directores activos en el catálogo.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de directores obtenida exitosamente.
 *       401:
 *         description: Token no proporcionado o inválido.
 */
router.post('/',      authMiddleware, validate(createDirectorSchema), directorsController.create);

/**
 * @openapi
 * /v1/directors/{id}:
 *   get:
 *     tags: [Directors]
 *     summary: Obtener un director por ID
 *     description: Retorna la información detallada de un director específico.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del director en MongoDB
 *         schema:
 *           type: string
 *         example: 69d7f9b0f26a3534059c57d5
 *     responses:
 *       200:
 *         description: Director encontrado exitosamente.
 *       404:
 *         description: El director no existe.
 *       401:
 *         description: Token no proporcionado o inválido.
 *   put:
 *     tags: [Directors]
 *     summary: Actualizar un director
 *     description: Actualiza la información de un director existente. Solo se actualizan los campos enviados.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del director en MongoDB
 *         schema:
 *           type: string
 *         example: 69d7f9b0f26a3534059c57d5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Christopher Nolan
 *               nationality:
 *                 type: string
 *                 example: Británico
 *               biography:
 *                 type: string
 *                 example: Biografía actualizada
 *     responses:
 *       200:
 *         description: Director actualizado exitosamente.
 *       404:
 *         description: El director no existe.
 *       401:
 *         description: Token no proporcionado o inválido.
 *   delete:
 *     tags: [Directors]
 *     summary: Eliminar un director
 *     description: Desactiva un director del catálogo (soft delete). El registro se mantiene en la base de datos con isActive en false.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del director en MongoDB
 *         schema:
 *           type: string
 *         example: 69d7f9b0f26a3534059c57d5
 *     responses:
 *       200:
 *         description: Director eliminado exitosamente.
 *       404:
 *         description: El director no existe.
 *       401:
 *         description: Token no proporcionado o inválido.
 */
router.get('/',       authMiddleware, directorsController.findAll);
router.get('/:id',    authMiddleware, directorsController.findById);
router.put('/:id',    authMiddleware, validate(updateDirectorSchema), directorsController.update);
router.delete('/:id', authMiddleware, directorsController.delete);

export default router;